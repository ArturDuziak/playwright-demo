import { test, expect } from "@playwright/test";

test("Check text inside the frames", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/nested_frames");

  const leftFrameText = page.frame("frame-left").locator("body");
  await expect(leftFrameText).toContainText("LEFT");

  const middleFrameText = page.frame("frame-middle").locator("body");
  await expect(middleFrameText).toContainText("MIDDLE");

  const rightFrameText = page.frame("frame-right").locator("body");
  await expect(rightFrameText).toContainText("RIGHT");

  const bottomFrameText = page.frame("frame-bottom").locator("body");
  await expect(bottomFrameText).toContainText("BOTTOM");
});
