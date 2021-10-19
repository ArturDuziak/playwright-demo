import { test, expect } from "@playwright/test";

test("Checks buttons visiblity", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/visibility");

  // Playwright isVisble doesn't consider elements with: opacity: 0; / offscreen / overlapped as invisible

  const buttons = [
    "#removedButton",
    "#zeroWidthButton",
    // "#overlappedButton",
    // "#transparentButton",
    "#invisibleButton",
    "#notdisplayedButton",
    // "#offscreenButton",
  ];

  for (let i = 0; i < buttons.length; i++) {
    const button = page.locator(buttons[i]);
    await expect(button).toBeVisible();
  }

  await page.click("#hideButton");

  for (let i = 0; i < buttons.length; i++) {
    const button = page.locator(buttons[i]);
    await expect(button).not.toBeVisible();
  }
});
