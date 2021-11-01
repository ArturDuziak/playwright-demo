import { test, expect } from "@playwright/test";
import { createUser } from "../../helpers/createUserAPI";
import { LoginPage } from "../../pages/LoginPage";
import faker from "faker";

let loginPage: LoginPage;

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page);
});

test("Existing user can log in", async ({ page }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  createUser(page, { email, password });

  await page.goto("/");

  await loginPage.openLoginMenu();
  await loginPage.logIn(email, password);

  await expect(loginPage.loggedInBanner).toBeVisible();
});

test("Non existing user cannot log in", async ({ page }) => {
  await page.goto("/");

  await loginPage.openLoginMenu();

  const [response] = await Promise.all([
    page.waitForResponse("**/login"),
    loginPage.logIn("non-existing-user@example.com", "654321"),
  ]);

  await expect(response.status()).toBe(400);
});

test("Should handle not existing user", async ({ page, baseURL }) => {
  await page.context().addCookies([{ name: "trello_token", value: "aaaa", url: baseURL }]);

  await page.goto("/");

  await expect(loginPage.loggedInBanner).toBeHidden();
});
