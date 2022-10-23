import percySnapshot from "@percy/playwright";
import { test, expect } from "@playwright/test";
import { createUser } from "../../helpers/createUserAPI";
import { LoginPage } from "../../pages/LoginPage";
import faker from "faker";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);

  await page.goto("/");

  await loginPage.openLoginMenu();
  await page.click("text=Sign up here");
});

test("Sign Up modal displays correctly @visual", async ({ page }) => {
  await expect(loginPage.signupButton).toBeVisible();

  await percySnapshot(page, "Sign Up Modal");
});

test("User can successfully sign up", async () => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  await loginPage.signUp(email, password);

  await expect(loginPage.loginModal).not.toBeVisible();
  await expect(loginPage.loggedInBanner).toBeVisible();
  await expect(loginPage.userMenu).toContainText(email);
});

test("Existing user cannot sign up", async ({ page }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  createUser(page, { email, password });

  const [response] = await Promise.all([
    page.waitForResponse("**/signup"),
    loginPage.signUp(email, password),
  ]);

  await expect(response.status()).toBe(400);
  await expect(loginPage.loginModal).toBeVisible();
});
