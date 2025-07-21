import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userMenu: Locator;
  readonly loginMenu: Locator;
  readonly loginModal: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly logInButton: Locator;
  readonly loggedInBanner: Locator;

  // Sign up section
  readonly signupEmailInput: Locator;
  readonly signupPasswordInput: Locator;
  readonly signupButton: Locator;
  readonly welcomeEmailCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMenu = page.locator('[data-cy="logged-user"]');
    this.loginMenu = page.locator('[data-cy="login-menu"]');
    this.loginModal = page.locator('[data-cy="login-module"]');
    this.loginEmailInput = page.locator('[data-cy="login-email"]');
    this.loginPasswordInput = page.locator('[data-cy="login-password"]');
    this.logInButton = page.locator('[data-cy="login"]');
    this.loggedInBanner = page.locator('[data-cy="logged-user"]');

    // Sign up section
    this.signupEmailInput = page.locator('[data-cy="signup-email"]');
    this.signupPasswordInput = page.locator('[data-cy="signup-password"]');
    this.signupButton = page.locator('[data-cy="signup"]');
    this.welcomeEmailCheckbox = page.locator('[data-cy="welcome-email-checkbox"]');
  }

  async openLoginMenu() {
    await this.loginMenu.click();
  }

  async logIn(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.logInButton.click();
  }

  async signUp(email: string, password: string, sendWelcomeEmail = false) {
    await this.signupEmailInput.fill(email);
    await this.signupPasswordInput.fill(password);
    if (sendWelcomeEmail) await this.welcomeEmailCheckbox.check();
    await this.signupButton.click();
  }
}
