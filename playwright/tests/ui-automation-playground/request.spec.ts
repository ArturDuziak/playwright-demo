import { test, expect } from "@playwright/test";

test("Waits for the contenet to load in", async ({ page, browser }) => {
  // const response = await page.evaluate(async () => {
  //   return await fetch("https://swapi.dev/api/people/1")
  //     .then(r => r.ok ? r.json() : Promise.reject(r))
  // })

  // console.log(response)
  const response = await page._request.get("https://swapi.dev/api/people/1");

  const context = await browser.newContext();
  await context.addCookies([
    { name: "status", value: response.status().toString(), url: "https://example.com" },
  ]);

  page = await context.newPage();
  await page.goto('https://example.com');
  page.pause()
});
