import { test, expect } from "@playwright/test";

test("Handles confirmation alert", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", (dialog) => dialog.dismiss());
  await page.click("text=Click for JS Confirm");

  await expect(page.locator("#result")).toContainText("You clicked: Cancel");
});

test("Handles prompt", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", (dialog) => dialog.accept('something'));
  await page.click("text=Click for JS Prompt");

  await expect(page.locator("#result")).toContainText("You entered: something");
});
