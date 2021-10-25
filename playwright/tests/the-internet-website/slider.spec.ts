import { test, expect } from "@playwright/test";

test("Focuses on slider and uses arrow keys to move it", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/horizontal_slider");

  await page.focus('input[type="range"]');
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");

  await expect(page.locator("#range")).toHaveText("2");
});

test("Moves the slider by drag and dropping", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/horizontal_slider");

  await page.dragAndDrop('input[type="range"]', 'input[type="range"]', {
    targetPosition: { x: 90, y: 10 },
  });

  await expect(page.locator("#range")).toHaveText("3.5");
});
