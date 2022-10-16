import { PlaywrightTestConfig, devices } from "@playwright/test";
import path from "path";
import { playwrightCustomMatchers } from "./playwright-custom-matchers";
import dotenv from "dotenv";

dotenv.config({ path: "./playwright/.env" });

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, "playwright"),
  retries: process.env.CI ? 2 : 0,
  forbidOnly: !!process.env.CI,
  outputDir: "playwright/test-results/",
  reporter: process.env.CI ? [["html", { outputFolder: "playwright/test-report/" }], ["junit", { outputFile: "results.xml" }]] : "list",
  workers: process.env.CI ? 2 : undefined,

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: "npm run start",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    headless: true,
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    httpCredentials: {
      username: "admin",
      password: "admin",
    },
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: {
          width: 1920,
          height: 1080
        }
      },
    },
    // {
    //   name: "Desktop Firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //   },
    // },
    {
      name: "Desktop Safari",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    // {
    //   name: "Mobile Chrome",
    //   use: {
    //     ...devices["Pixel 5"],
    //   },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: devices["iPhone 12"],
    // },
  ],
};

playwrightCustomMatchers();

export default config;
