import { Page } from "playwright-core";

const createUser = async (page: Page, { email, password }: { email: string; password: string }) => {
  await page.request.post("/api/signup", { data: { email, password } });
};

export { createUser };
