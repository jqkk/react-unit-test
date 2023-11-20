import { rest } from "msw";
import { describe, expect, it, vi } from "vitest";

import { composeStories } from "@storybook/react";
import { waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { BASE_URL, PATH } from "~/constants/url";
import { server } from "~/mocks/server";
import { render } from "~/tests";

import * as stories from "./user-profile.stories";
import { UserProfile } from ".";

const { Error, Retry } = composeStories(stories);

describe("UserProfile 컴포넌트 테스트", () => {
  it("패칭에 성공하면 유저 프로필 사진과 유저 소개가 보인다.", async () => {
    const { getByRole, getByText } = render(<UserProfile userId="12345" />);

    await waitFor(() => {
      expect(getByRole("img", { name: "profile image" })).toBeInTheDocument();
      expect(getByText("안녕하세요 김경지입니다.")).toBeInTheDocument();
    });
  });

  it("패칭에 실패했을 경우, errorFallback UI를 보여준다.", async () => {
    server.use(
      rest.get(`${BASE_URL}${PATH.USER}/:userId`, (_req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    const { getByText, getByRole } = render(<Error />);

    await waitFor(() => {
      expect(getByText("Error")).toBeInTheDocument();
      expect(getByRole("button", { name: "다시시도" })).toBeInTheDocument();
    });
  });

  it("errorFallback UI에서 다시 시도 버튼을 누르면 요청을 다시 시도한다.", async () => {
    const user = userEvent.setup();
    const callback = vi.fn();
    let args = false;
    server.use(rest.get(`${BASE_URL}${PATH.USER}/:userId`, callback));
    callback.mockImplementation((_req, res, ctx) => {
      args = !args;
      if (args) return res(ctx.status(500));
      return res(
        ctx.json({
          profileImage: {
            src: "https://placehold.co/48x48",
            alt: "profile image",
          },
          introduction: "안녕하세요 김경지입니다.",
        })
      );
    });
    const { findByRole, getByText, getByRole } = render(<Retry />);

    const retryButton = await findByRole("button", { name: "다시시도" });
    await user.click(retryButton);

    await waitFor(() => {
      expect(callback).toBeCalledTimes(2);
      expect(getByRole("img", { name: "profile image" })).toBeInTheDocument();
      expect(getByText("안녕하세요 김경지입니다.")).toBeInTheDocument();
    });
  });
});
