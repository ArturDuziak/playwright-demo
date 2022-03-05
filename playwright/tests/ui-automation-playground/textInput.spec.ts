import { test, expect } from "@playwright/test";

test("Waits for the contenet to load in", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/textinput");

  const updatingButton = page.locator("#updatingButton");

  await expect(updatingButton).toHaveText(
    "Button That Should Change it's Name Based on Input Value"
  );

  await page.type("#newButtonName", "Button new name");
  await updatingButton.click();

  await expect(updatingButton).toHaveText("Button new name");
});
