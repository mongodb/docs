const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$project aggregation stage example tests", () => {

  test("Should include specific fields in output documents", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/include-fields.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/include-fields-output.sh");
  });

  test("Should suppress the _id field in output documents", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/suppress-id.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/suppress-id-output.sh");
  });

  test("Should exclude the rated field from output documents", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/exclude-fields.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/exclude-fields-output.sh");
  });

  test("Should exclude fields from embedded documents using dot notation", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/exclude-embedded-fields.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/exclude-embedded-fields-output.sh");
  });

  test("Should exclude fields from embedded documents using nested syntax", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/exclude-embedded-fields-nested.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/exclude-embedded-fields-output.sh");
  });

  test("Should conditionally exclude the imdb.votes field when null or empty string", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/conditional-exclude-fields.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/conditional-exclude-fields-output.sh");
  });

  test("Should include only imdb.rating from embedded documents using dot notation", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/include-embedded-fields.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/include-embedded-fields-output.sh");
  });

  test("Should include only imdb.rating from embedded documents using nested syntax", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/include-embedded-fields-nested.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/include-embedded-fields-output.sh");
  });

  test("Should include computed fields leadActor and releaseYear", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/computed-fields.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/computed-fields-output.sh");
  });

  test("Should project fields into a new array", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/new-array-fields.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/new-array-fields-output.sh");
  });

  test("Should substitute null for non-existent field in new array", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/project/new-array-fields-null.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/project/new-array-fields-null-output.sh");
  });

}, dbName);
