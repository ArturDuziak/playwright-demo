import { test, expect } from "@playwright/test";

test("Verifies text", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/verifytext");

  await expect(page.locator(".bg-primary")).toHaveText("Welcome UserName!");
});
