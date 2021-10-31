import { test, expect } from "@playwright/test";

test("Stops progress bar when value reaches 35%", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/progressbar");

  await page.click("#startButton");
  await page.waitForSelector('#progressBar:has-text("35%")');
  await page.click("#stopButton");

  const progressBarPercentage = await page.textContent("#progressBar");
  expect(progressBarPercentage).toBeOneOf(["34%", "35%", "36%"]);
});
