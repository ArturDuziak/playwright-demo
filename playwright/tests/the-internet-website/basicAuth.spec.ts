import { test, expect } from "@playwright/test";

test("Checks basic auth configuration on page", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/basic_auth");

  await expect(
    page.locator("text=Congratulations! You must have the proper credentials.")
  ).toBeVisible();
});
