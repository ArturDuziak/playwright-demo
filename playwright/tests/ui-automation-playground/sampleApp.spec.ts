import { test, expect } from "@playwright/test";

test.describe("Sample app tests", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://www.uitestingplayground.com/sampleapp");
  });

  test("By default user is logged out", async ({ page }) => {
    await expect(page.locator("#loginstatus")).toHaveText("User logged out.");
  });

  test("Returns error when no data is provided", async ({ page }) => {
    await page.click('text="Log In"');
    await expect(page.locator("#loginstatus")).toHaveText("Invalid username/password");
  });

  test("User can successfully log in", async ({ page }) => {
    await page.type('[name="UserName"]', "Username");
    await page.type('[name="Password"]', "pwd");

    await page.click('text="Log In"');

    await expect(page.locator("#loginstatus")).toHaveText("Welcome, Username!");
  });

  test("User can successfully log out", async ({ page }) => {
    await page.type('[name="UserName"]', "Username");
    await page.type('[name="Password"]', "pwd");

    await page.click('text="Log In"');
    await page.click('text="Log Out"');

    await expect(page.locator("#loginstatus")).toHaveText("User logged out.");
  });
});
