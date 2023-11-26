import { useState } from "react";
import { describe, expect, it } from "vitest";

import { userEvent } from "@testing-library/user-event";

import { render } from "~/tests";

import { Pagination } from "./pagination";

describe("Pagination 컴포넌트 테스트", () => {
  it("pageCount가 56이고, currentCount가 23이고, boundaryCount가 10이라면 21 ~ 30까지의 숫자가 보인다.", () => {
    const { getByText } = render(
      <Pagination
        currentCount={23}
        pageCount={56}
        boundaryCount={10}
        onCurrentCountChange={() => {}}
      />
    );

    expect(getByText("21")).toBeInTheDocument();
    expect(getByText("22")).toBeInTheDocument();
    expect(getByText("23")).toBeInTheDocument();
    expect(getByText("24")).toBeInTheDocument();
    expect(getByText("25")).toBeInTheDocument();
    expect(getByText("26")).toBeInTheDocument();
    expect(getByText("27")).toBeInTheDocument();
    expect(getByText("28")).toBeInTheDocument();
    expect(getByText("29")).toBeInTheDocument();
    expect(getByText("30")).toBeInTheDocument();
  });

  it("pageCount가 10이고, currentCount가 1인 상황에서 숫자 3 버튼을 누르면 3페이지로 이동한다.", async () => {
    const user = userEvent.setup();
    const ExampleComponent = () => {
      const [currentCount, setCurrentCount] = useState(1);
      return (
        <Pagination
          currentCount={currentCount}
          pageCount={10}
          onCurrentCountChange={setCurrentCount}
        />
      );
    };
    const { getByTestId, getByText } = render(<ExampleComponent />);

    await user.click(getByText("3"));

    expect(getByTestId("pagination-current-number-button")).toHaveTextContent(
      "3"
    );
  });

  it("pageCount가 10이고, currentCount가 7인 상황에서 이전 버튼을 누르면 이전 바운더리로 이동한다.", async () => {
    const user = userEvent.setup();
    const ExampleComponent = () => {
      const [currentCount, setCurrentCount] = useState(7);
      return (
        <Pagination
          currentCount={currentCount}
          pageCount={10}
          onCurrentCountChange={setCurrentCount}
        />
      );
    };

    const { getByTestId, getByText } = render(<ExampleComponent />);
    expect(getByTestId("pagination-previous-button")).toHaveAttribute(
      "aria-disabled",
      "false"
    );
    await user.click(getByTestId("pagination-previous-button"));

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  it("pageCount가 10이고, currentCount가 2인 상황에서 이전 버튼을 누르면 아무 변화가 없다.", async () => {
    const user = userEvent.setup();
    const ExampleComponent = () => {
      const [currentCount, setCurrentCount] = useState(2);
      return (
        <Pagination
          currentCount={currentCount}
          pageCount={10}
          onCurrentCountChange={setCurrentCount}
        />
      );
    };

    const { getByTestId, getByText } = render(<ExampleComponent />);
    const previousButton = getByTestId("pagination-previous-button");
    await user.click(previousButton);

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  it("pageCount가 10이고, currentCount가 7인 상황에서 다음 버튼을 누르면 아무 변화가 없다.", async () => {
    const user = userEvent.setup();
    const ExampleComponent = () => {
      const [currentCount, setCurrentCount] = useState(7);
      return (
        <Pagination
          currentCount={currentCount}
          onCurrentCountChange={setCurrentCount}
          pageCount={10}
        />
      );
    };

    const { getByTestId, getByText } = render(<ExampleComponent />);
    const nextButton = getByTestId("pagination-next-button");

    expect(nextButton).toHaveAttribute("aria-disabled", "true");
    await user.click(nextButton);

    expect(getByText("6")).toBeInTheDocument();
    expect(getByText("7")).toBeInTheDocument();
    expect(getByText("8")).toBeInTheDocument();
    expect(getByText("9")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
  });

  it("pageCount가 5이고, currentCount가 1인 상황에서 다음/이전 버튼을 누르면 아무 변화가 없다.", async () => {
    const user = userEvent.setup();
    const ExampleComponent = () => {
      const [currentCount, setCurrentCount] = useState(1);
      return (
        <Pagination
          currentCount={currentCount}
          onCurrentCountChange={setCurrentCount}
          pageCount={5}
        />
      );
    };

    const { getByTestId, getByText } = render(<ExampleComponent />);
    const nextButton = getByTestId("pagination-next-button");
    const previousButton = getByTestId("pagination-previous-button");

    expect(nextButton).toHaveAttribute("aria-disabled", "true");
    expect(previousButton).toHaveAttribute("aria-disabled", "true");

    await user.click(nextButton);
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();

    await user.click(previousButton);
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  it("pageCount가 3이고, currentCount가 2라면 화면에 1, 2, 3이 보인다.", async () => {
    const ExampleComponent = () => {
      const [currentCount, setCurrentCount] = useState(2);
      return (
        <Pagination
          currentCount={currentCount}
          onCurrentCountChange={setCurrentCount}
          pageCount={3}
        />
      );
    };

    const { getByText } = render(<ExampleComponent />);
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
  });
});
