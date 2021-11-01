import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginMenu: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;
  readonly loggedInBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginMenu = page.locator('[data-cy="login-menu"]');
    this.emailInput = page.locator('[data-cy="login-email"]');
    this.passwordInput = page.locator('[data-cy="login-password"]');
    this.logInButton = page.locator('[data-cy="login"]');
    this.loggedInBanner = page.locator('[data-cy="logged-user"]');
  }

  async openLoginMenu() {
    await this.loginMenu.click();
  }

  async logIn(email: string, password: string) {
    await this.emailInput.type(email);
    await this.passwordInput.type(password);
    await this.logInButton.click();
  }
}
