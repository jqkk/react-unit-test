import { describe, expect, it } from "vitest";

import { composeStories } from "@storybook/react";
import { userEvent } from "@testing-library/user-event";

import { render } from "~/tests";

import * as stories from "./table-filter.stories";

const { Default } = composeStories(stories);

describe("TableFilter 컴포넌트 테스트", () => {
  it("체크박스가 모두 체크되지 않은 상태에서, 전체 선택 체크박스를 클릭하면 모두 체크된다.", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "전체 선택" }));

    expect(getByRole("checkbox", { name: "A" })).toBeChecked();
    expect(getByRole("checkbox", { name: "B" })).toBeChecked();
    expect(getByRole("checkbox", { name: "C" })).toBeChecked();
    expect(getByRole("checkbox", { name: "D" })).toBeChecked();
    expect(getByRole("checkbox", { name: "E" })).toBeChecked();
  });

  it("체크박스가 모두 체크된 상태에서, 전체 선택 체크박스를 클릭하면 모두 체크가 해제된다.", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "전체 선택" }));
    await user.click(getByRole("checkbox", { name: "전체 선택" }));

    expect(getByRole("checkbox", { name: "A" })).not.toBeChecked();
    expect(getByRole("checkbox", { name: "B" })).not.toBeChecked();
    expect(getByRole("checkbox", { name: "C" })).not.toBeChecked();
    expect(getByRole("checkbox", { name: "D" })).not.toBeChecked();
    expect(getByRole("checkbox", { name: "E" })).not.toBeChecked();
  });

  it("체크박스가 모두 체크되지 않은 상태에서, A를 클릭하면 A만 체크된다.", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "A" }));

    expect(getByRole("checkbox", { name: "A" })).toBeChecked();
    expect(getByRole("checkbox", { name: "B" })).not.toBeChecked();
    expect(getByRole("checkbox", { name: "C" })).not.toBeChecked();
    expect(getByRole("checkbox", { name: "D" })).not.toBeChecked();
    expect(getByRole("checkbox", { name: "E" })).not.toBeChecked();
  });

  it("체크박스가 모두 체크된 상태에서, A를 클릭하면 A만 체크가 해제된다.", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "전체 선택" }));
    await user.click(getByRole("checkbox", { name: "A" }));

    expect(getByRole("checkbox", { name: "A" })).not.toBeChecked();
    expect(getByRole("checkbox", { name: "B" })).toBeChecked();
    expect(getByRole("checkbox", { name: "C" })).toBeChecked();
    expect(getByRole("checkbox", { name: "D" })).toBeChecked();
    expect(getByRole("checkbox", { name: "E" })).toBeChecked();
  });

  it("요소가 부분적으로 체크되었을 경우, 전체 선택 체크 박스는 부분 체크 아이콘으로 채워진다", async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "A" }));
    await user.click(getByRole("checkbox", { name: "B" }));

    expect(getByTestId("partial-checkbox-icon")).toBeInTheDocument();
  });

  it("부분적으로 체크된 상태에서, 전체 선택 버튼을 누르면 모든 요소가 체크된다", async () => {
    const user = userEvent.setup();
    const { getByRole, queryByTestId } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "C" }));
    await user.click(getByRole("checkbox", { name: "E" }));
    await user.click(getByRole("checkbox", { name: "전체 선택" }));

    expect(getByRole("checkbox", { name: "A" })).toBeChecked();
    expect(getByRole("checkbox", { name: "B" })).toBeChecked();
    expect(getByRole("checkbox", { name: "C" })).toBeChecked();
    expect(getByRole("checkbox", { name: "D" })).toBeChecked();
    expect(getByRole("checkbox", { name: "E" })).toBeChecked();
    expect(queryByTestId("partial-checkbox-icon")).not.toBeInTheDocument();
  });

  it("전체 선택된 상태에서 모든 요소를 하나씩 체크를 해제하면, 체크가 모두 해제되는 순간 전체 선택 체크박스의 체크가 해제된다", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Default />);

    await user.click(getByRole("checkbox", { name: "전체 선택" }));
    await user.click(getByRole("checkbox", { name: "A" }));
    await user.click(getByRole("checkbox", { name: "B" }));
    await user.click(getByRole("checkbox", { name: "C" }));
    await user.click(getByRole("checkbox", { name: "D" }));
    await user.click(getByRole("checkbox", { name: "E" }));

    expect(getByRole("checkbox", { name: "전체 선택" })).not.toBeChecked();
  });
});
