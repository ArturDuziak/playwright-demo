import { test, expect } from "@playwright/test";

// This option can also be setup globally in playwright.config.ts file
test.use({
  httpCredentials: {
    username: "admin",
    password: "admin",
  }
});
test("Checks basic auth configuration on page", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/basic_auth");

  await expect(
    page.locator("text=Congratulations! You must have the proper credentials.")
  ).toBeVisible();
});
