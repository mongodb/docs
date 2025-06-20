import Path from "path";
import { withConfig } from "./withConfig";

describe("withConfig", () => {
  it("loads a config file", async () => {
    await withConfig(
      async (config) => {
        expect(config.dataSources).toBeDefined();
      },
      {
        config: Path.resolve(
          __dirname,
          "..",
          "..",
          "testData",
          "config",
          "configTest.cjs"
        ),
      }
    );
  });
});
