import { test, expect } from "@playwright/test";

test("Stops progress bar when value reaches 35%", async ({ page, browserName }) => {
  test.fixme(true, "Test became flaky on both browsers.");

  await page.goto("http://www.uitestingplayground.com/progressbar");

  await expect(page.locator("#startButton")).toHaveAttribute("onClick", "Start()");
  await page.click("#startButton");
  await expect(page.locator("#progressBar")).toHaveText(/^34%|35%|36%$/);
  await page.click("#stopButton");

  const progressBarPercentage = await page.textContent("#progressBar");
  expect(progressBarPercentage).toBeOneOf(["34%", "35%", "36%"]);
});
