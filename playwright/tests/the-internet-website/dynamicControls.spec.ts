import { test, expect, Page } from "@playwright/test";

let dynamicControlsPage;
test.beforeEach(async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/dynamic_controls");
  dynamicControlsPage = new DynamicControlsPage(page);
});

test("Waits for input to be enabled after clicking the button", async ({ page }) => {
  await expect(dynamicControlsPage.getTextInput()).toBeDisabled();

  dynamicControlsPage.clickDisableEnableTextButton();

  await expect(dynamicControlsPage.getTextInput()).not.toBeDisabled();

  dynamicControlsPage.clickDisableEnableTextButton();

  await expect(dynamicControlsPage.getTextInput()).toBeDisabled();
});

test("Waits for checkbox to disappear after clicking the button", async ({ page }) => {
  await expect(dynamicControlsPage.getCheckbox()).toBeVisible();

  dynamicControlsPage.clickRemoveAddCheckboxButton();

  await expect(dynamicControlsPage.getCheckbox()).not.toBeVisible();

  dynamicControlsPage.clickRemoveAddCheckboxButton();

  await expect(dynamicControlsPage.getCheckbox()).toBeVisible();
});

class DynamicControlsPage {
  private page: Page;

  constructor(page) {
    this.page = page;
  }

  getTextInput() {
    return this.page.locator("#input-example input");
  }

  getCheckbox() {
    return this.page.locator("#checkbox");
  }

  async clickDisableEnableTextButton() {
    await this.page.click("#input-example button");
  }

  async clickRemoveAddCheckboxButton() {
    await this.page.click("#checkbox-example button");
  }
}
