import { expect } from "@playwright/test";

export const playwrightCustomMatchers = () => {
  expect.extend({
    toBeOneOf(recieved: string | number, values: Array<string | number>) {
      const pass = values.includes(recieved);

      if (pass) {
        return {
          message: () => `${recieved} is in group of values`,
          pass: true,
        };
      } else {
        return {
          message: () => `Expected ${recieved} to be one of ${values}`,
          pass: false,
        };
      }
    },
  });
};
