const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("db.collection.estimatedDocumentCount() tests", () => {

  test("Should count all documents in the sample_mflix.movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.estimatedDocumentCount/estimated-document-count.js"
      ])
      .withDbName(dbName)
      .shouldMatch(
        "mongosh-commands/db.collection.estimatedDocumentCount/" +
          "estimated-document-count-output.sh"
      );
  });

}, dbName);
