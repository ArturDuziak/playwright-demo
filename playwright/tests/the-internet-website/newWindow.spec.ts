import { test, expect } from "@playwright/test";

test("Clicks on a link that opens up a new window", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/windows");

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("text=Click Here")
  ]);

  await newPage.waitForURL("**/windows/new");
  await newPage.click("text=New Window");

  await expect(newPage.locator("text=New Window")).toBeVisible();
  await expect(page.locator("text=Opening a new window")).toBeVisible();
});
