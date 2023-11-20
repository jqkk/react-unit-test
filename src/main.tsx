import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";

import "~/styles/global.scss";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, unicorn/prefer-module
  const { worker } = require("./mocks/browser");
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
