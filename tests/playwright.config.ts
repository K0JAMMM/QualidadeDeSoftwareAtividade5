import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_URL = process.env.API_URL || "http://localhost:8080";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "api",
      testDir: "./tests/api",
      use: {
        // Testes de API não precisam de navegador; usam o fixture `request`.
        baseURL: API_URL,
      },
    },
    {
      name: "e2e",
      testDir: "./tests/e2e",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: BASE_URL,
      },
    },
  ],
});
