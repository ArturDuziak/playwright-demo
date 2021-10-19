import { test, expect } from "@playwright/test";

test("Gets CPU usage of Chrome from dynamic table", async ({ page }) => {
  let cpuColumnID: number;

  await page.goto("http://www.uitestingplayground.com/dynamictable");

  const columnHedears = await page.$$('[role="columnheader"]');

  for (let i = 0; i < 5; i++) {
    if ((await columnHedears[i].textContent()) == "CPU") cpuColumnID = i;
  }

  const chromeCPUUsage = await page.innerText(
    `[role="row"]:has-text("Chrome") [role="cell"] >> nth=${cpuColumnID}`
  );

  const progressBarUsage = await page.innerText(".bg-warning");
  expect(progressBarUsage).toContain(chromeCPUUsage);
});
