/* eslint-disable react-refresh/only-export-components */
import { render,RenderOptions } from "@testing-library/react";

const TestingProvider = ({ children }: React.PropsWithChildren) => {
  return children;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestingProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
