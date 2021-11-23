

import { test, expect } from "@playwright/test";

const statusCodes = [200, 301, 404, 500]

for(const code of statusCodes) {
  test(`Asserts that ${code} is properly returned`, async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/status_codes");
  
    const [response] = await Promise.all([
      page.waitForResponse(`http://the-internet.herokuapp.com/status_codes/${code}`),
      page.click(`text=${code}`)
    ]);
  
    expect(response.status()).toBe(code)
  });
}
