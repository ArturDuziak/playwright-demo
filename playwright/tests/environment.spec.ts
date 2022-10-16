import { expect, test } from "@playwright/test";

// You can access all environemnt variables using process.env.NAME_OF_VARIABLE
// These values can be setup when running the script like this:
// EXAMPLE_VARIABLE=something npx playwright test
// These can also be set in CI variables or in .env file (dotenv package is needed for this)

test("Playwright has access to process environment variables", async () => {
  console.log(process.env);

  expect(process.env.EXAMPLE_VARIABLE).toBe("value");
});

