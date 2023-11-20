import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/styles/global.scss";

initialize({ onUnhandledRequest: "bypass" });

export const decorators = [
  (Story) => {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        })
    );

    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
