/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";

const TestingProvider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestingProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
