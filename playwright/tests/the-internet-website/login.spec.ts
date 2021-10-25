import { test, expect, Page } from "@playwright/test";

let loginPage: LoginPage;
test.beforeEach(async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/login");
  loginPage = new LoginPage(page);
});

test("User cannot log in without invalid credentials", async ({ page }) => {
  loginPage.logIn("invalid", "invalid");

  await page.waitForNavigation();
  await expect(loginPage.getErrorPrompt()).toContainText("Your username is invalid!");
});

test("User can correctly log in", async ({ page }) => {
  loginPage.logIn("tomsmith", "SuperSecretPassword!");

  await expect(page).toHaveURL(/.*\/secure/);
  await expect(loginPage.getErrorPrompt()).toContainText("You logged into a secure area!");
});

test("User can correctly log out", async ({ page }) => {
  loginPage.logIn("tomsmith", "SuperSecretPassword!");

  await expect(page).toHaveURL(/.*\/secure/);
  loginPage.clickLogOutButton();
  await expect(page).toHaveURL(/.*\/login/);

  await expect(loginPage.getErrorPrompt()).toContainText("You logged out of the secure area!");
});

class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getUsernameInput() {
    return this.page.locator("#username");
  }

  getPasswordInput() {
    return this.page.locator("#password");
  }

  getErrorPrompt() {
    return this.page.locator("#flash");
  }

  async clickSubmitButton() {
    await this.page.click('[type="submit"]');
  }

  async clickLogOutButton() {
    await this.page.click(".button");
  }

  async logIn(username: string, password: string) {
    await this.getUsernameInput().type(username);
    await this.getPasswordInput().type(password);

    this.clickSubmitButton();
  }
}
