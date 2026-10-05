const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$setUnion window function tests", () => {
  test("Should return the genres accumulated across a director's filmography over time", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/setUnion/setUnion-window-example.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/setUnion/setUnion-window-example-output.sh");
  });
}, dbName);
