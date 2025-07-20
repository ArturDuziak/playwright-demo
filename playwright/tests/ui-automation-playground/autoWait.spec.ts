import { test, expect } from "@playwright/test";

test.describe("Auto wait", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://www.uitestingplayground.com/autowait");
  });

  test("button", async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' });

    await expect(button).toBeVisible();

    await expect(page.locator("#visible")).toBeChecked();
    await page.getByText('Visible').click();
    await expect(page.locator("#visible")).not.toBeChecked();

    await page.getByRole('button', { name: 'Apply 3s' }).click();

    await expect(button).not.toBeVisible();
    await expect(page.getByText('Target element settings applied for 3 seconds.')).toBeVisible();

    await expect(button).toBeVisible({ timeout: 4000 });
    await expect(page.getByText('Target element state restored.')).toBeVisible();
  });

  test("textarea", async ({ page }) => {
    const textarea = page.locator('#target');

    await page.getByLabel('Choose an element type:').selectOption('input');
    await expect(textarea).toBeEditable();

    await page.getByText('Enabled').click();
    await page.getByRole('button', { name: 'Apply 3s' }).click();

    await expect(page.getByText('Target element settings applied for 3 seconds.')).toBeVisible();
    await expect(textarea).not.toBeEditable();

    await expect(textarea).toBeEditable({ timeout: 4000 });
    await expect(page.getByText('Target element state restored.')).toBeVisible();
  });
});
