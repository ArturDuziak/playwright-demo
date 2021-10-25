import { test, expect } from "@playwright/test";

test("Uploads a file by using input", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/upload");

  await page.setInputFiles('input[name="file"]', "playwright/tests/the-internet-website/bar.txt");

  await page.click('input:has-text("Upload")');

  await page.waitForURL("**/upload");

  await expect(page.locator("text=File Uploaded!")).toBeVisible();
  await expect(page.locator("text=bar.txt")).toBeVisible();
});

test("Uploads a file by spying on filechooser", async ({ page }) => {
  page.on("filechooser", (fileChooser) => {
    fileChooser.setFiles("playwright/tests/the-internet-website/bar.txt");
  });

  await page.goto("http://the-internet.herokuapp.com/upload");

  await page.click('input[name="file"]');

  await page.click('input:has-text("Upload")');

  await page.waitForURL("**/upload");

  await expect(page.locator("text=File Uploaded!")).toBeVisible();
  await expect(page.locator("text=bar.txt")).toBeVisible();
});
