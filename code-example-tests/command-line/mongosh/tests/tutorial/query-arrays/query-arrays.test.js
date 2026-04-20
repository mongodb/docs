const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("query arrays example tests", () => {

  test("Should return documents where genres exactly matches an array", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-arrays/match-exact-array.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-arrays/match-exact-array-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "genres"],
        fieldValues: { genres: ["Action", "Comedy"] },
      });
  });

  test("Should return documents where genres contains all specified elements", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-arrays/match-all.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-arrays/match-all-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "genres"],
      });
  });

  test("Should return documents where genres contains a specified element", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-arrays/find-element.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-arrays/find-element-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "genres"],
      });
  });

  test("Should return documents where a cast element matches a regex", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-arrays/find-element-regex.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-arrays/find-element-regex-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "cast"],
      });
  });

  test("Should return documents using compound filter conditions on array elements", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-arrays/compound-filter.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-arrays/compound-filter-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "cast"],
      });
  });

  test("Should return documents where a single cast element meets multiple criteria", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-arrays/elem-match.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-arrays/elem-match-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "cast"],
      });
  });

  test("Should return documents where the first cast element equals a specified value", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-arrays/array-index.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-arrays/array-index-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "cast"],
      });
  });

  test("Should return documents where genres has a specified number of elements", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-arrays/array-size.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-arrays/array-size-output.sh")
      .withSchema({
        count: 4,
        requiredFields: ["_id", "title", "genres"],
      });
  });

}, dbName);
