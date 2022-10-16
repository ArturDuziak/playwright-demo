import clipboardy from "clipboardy";

module.exports = (on, config) => {
  on("task", {
    getClipboard: () => {
      const clipboard: string = clipboardy.readSync();
      return clipboard;
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("@cypress/code-coverage/task")(on, config);

  // add other tasks to be registered here

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
};
