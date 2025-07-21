import { test, expect } from "@playwright/test";

test("Waits for the content to load in", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/hiddenlayers");

  const greenButton = page.locator("#greenButton");
  const blueButton = page.locator("#blueButton");

  await expect(greenButton).toBeVisible();
  await expect(blueButton).not.toBeVisible();

  await greenButton.click();

  await expect(greenButton).toBeVisible();
  await expect(blueButton).toBeVisible();
});
