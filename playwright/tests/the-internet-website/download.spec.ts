import { test, expect } from "@playwright/test";
import fs from "fs";

// The test is skipped because the files available for download constantly change. 
// You can enter the page, update the files names in test and run it

test.use({ acceptDownloads: true });
test.describe("Test file download", () => {
  test.fixme();

  test("Checks .txt file", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/download");

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click("text=document.txt"),
    ]);

    const path = await download.path();
    const fileBody = fs.readFileSync(path, { encoding: "utf-8" });
    expect(fileBody).toBe("text document for cypress tests");
  });

  test("Checks JSON file @fast", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/download");

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click("text=testUpload.json"),
    ]);

    const rawdata = fs.readFileSync(await download.path());
    const student = await JSON.parse(rawdata.toString());

    expect(student.posts[0].id).toBe(1);
    expect(student.posts[0].title).toBe("json-server");
    expect(student.posts[0].author).toBe("davert");
  });
});
