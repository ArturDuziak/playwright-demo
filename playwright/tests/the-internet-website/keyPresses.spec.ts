import { test, expect } from "@playwright/test";

test("Checks key presses registration", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/key_presses?");

  await page.press("#target", "Backspace");

  await expect(page.locator("#result")).toHaveText("You entered: BACK_SPACE");

  await page.press("#target", "F12");

  await expect(page.locator("#result")).toHaveText("You entered: F12");
});
