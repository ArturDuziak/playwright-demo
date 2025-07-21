import { expect, test } from "@playwright/test";

// Needed for auth after recent changes in the API
test.use({
  extraHTTPHeaders: {
    "x-api-key": "reqres-free-v1",
  }
})

test.describe("Basic API tests using Playwright", () => {
  test("Checks types of user body", async ({ request }) => {
    const userResponse = await request.get("https://reqres.in/api/users/2");

    expect(userResponse.status()).toBe(200);

    const userBody = await userResponse.json();

    expect(typeof userBody.data.email).toBe("string");
    expect(typeof userBody.data.first_name).toBe("string");
    expect(typeof userBody.data.last_name).toBe("string");
    expect(typeof userBody.data.avatar).toBe("string");
    expect(typeof userBody.data.id).toBe("number");
  });

  test("Checks status when user is not found", async ({ request }) => {
    const userResponse = await request.get("https://reqres.in/api/users/999");

    expect(userResponse.status()).toBe(404);
  });

  test("Deletes a user and checks a status code", async ({ request }) => {
    const userResponse = await request.delete("https://reqres.in/api/users/1");

    expect(userResponse.status()).toBe(204);
  });

  test("Creates a user and checks the response", async ({ request }) => {
    const userResponse = await request.post("https://reqres.in/api/users", {
      data: {
        name: "Playwright",
        job: "E2E Testing Framework"
      }
    });

    expect(userResponse.status()).toBe(201);

    const userBody = await userResponse.json();

    expect(userBody.name).toBe("Playwright");
    expect(userBody.job).toBe("E2E Testing Framework");
    expect(typeof userBody.id).toBe("string");
    expect(typeof userBody.createdAt).toBe("string");
  });

  test("Tries to login without valid credentials", async ({ request }) => {
    const loginResponse = await request.post("https://reqres.in/api/login", {
      data: {
        email: "playwright@example.com",
      }
    });

    expect(loginResponse.status()).toBe(400);
    expect(await loginResponse.json()).toEqual(({
      error: "Missing password"
    }));
  });
});

