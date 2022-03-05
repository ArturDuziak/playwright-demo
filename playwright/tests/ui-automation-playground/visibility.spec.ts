import { test, expect } from "@playwright/test";

test("Checks buttons visiblity", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/visibility");

  // Playwright toBeVisible doesn't consider elements with: opacity: 0; / offscreen / overlapped as invisible

  const buttons = [
    "#removedButton",
    "#zeroWidthButton",
    // "#overlappedButton",
    // "#transparentButton",
    "#invisibleButton",
    "#notdisplayedButton",
    // "#offscreenButton",
  ];

  for (const button of buttons) {
    await expect(page.locator(button)).toBeVisible();
  }

  await page.click("#hideButton");

  for (const button of buttons) {
    await expect(page.locator(button)).not.toBeVisible();
  }
});
