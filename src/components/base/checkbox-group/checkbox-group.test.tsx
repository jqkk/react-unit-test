import { describe, expect, it } from "vitest";

import { composeStories } from "@storybook/react";
import { userEvent } from "@testing-library/user-event";

import { render } from "~/tests";

import * as stories from "./checkbox-group.stories";

const { Default } = composeStories(stories);

describe("CheckboxGroup 컴포넌트 테스트", () => {
  it("체크박스 텍스트 라벨들(봄, 여름, 가을, 겨울)이 모두 정상적으로 보인다.", () => {
    const { getByText } = render(<Default />);

    expect(getByText("봄")).toBeInTheDocument();
    expect(getByText("여름")).toBeInTheDocument();
    expect(getByText("가을")).toBeInTheDocument();
    expect(getByText("겨울")).toBeInTheDocument();
  });

  it("봄을 선택하면 체크박스가 체크된다.", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "봄" }));

    expect(getByRole("checkbox", { name: "봄" })).toBeChecked();
  });

  it("여름을 선택하고 다시 여름을 선택하면 체크박스가 해제된다.", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "여름" }));

    expect(getByRole("checkbox", { name: "여름" })).toBeChecked();

    await user.click(getByRole("checkbox", { name: "여름" }));

    expect(getByRole("checkbox", { name: "여름" })).not.toBeChecked();
  });

  it("가을과 겨울을 선택하면 가을과 겨울은 체크되고 가을과 겨울은 체크되지 않는다.", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "봄" }));
    await user.click(getByRole("checkbox", { name: "여름" }));

    expect(getByRole("checkbox", { name: "봄" })).toBeChecked();
    expect(getByRole("checkbox", { name: "여름" })).toBeChecked();
    expect(getByRole("checkbox", { name: "가을" })).not.toBeChecked();
    expect(getByRole("checkbox", { name: "겨울" })).not.toBeChecked();
  });
});
