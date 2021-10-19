import { test, expect } from "@playwright/test";

test("Verifies text", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/verifytext");

  const text = await page.isVisible("text=Welcome");
  expect(text).toBeTruthy();
});
