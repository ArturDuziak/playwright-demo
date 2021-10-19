import { test, expect } from "@playwright/test";

test("Waits for the contenet to load in", async ({ page, browser }) => {
  await page.goto("http://www.uitestingplayground.com/textinput");

  const updatingButton = page.locator("#updatingButton");

  expect(await updatingButton.textContent()).toBe(
    "Button That Should Change it's Name Based on Input Value"
  );
  
  await page.type("#newButtonName", "Button new name");
  await updatingButton.click();

  expect(await updatingButton.textContent()).toBe("Button new name");
});
