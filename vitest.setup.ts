import fetch from "cross-fetch";
import { afterAll, afterEach, beforeAll } from "vitest";

import { cleanup } from "@testing-library/react";

import { server } from "~/mocks/server";

import "@testing-library/jest-dom/vitest";

global.fetch = fetch;

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());
