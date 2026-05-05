const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");

jest.setTimeout(10000);

const mongoUri = process.env.CONNECTION_STRING;

function dropTestDbs(dbNames) {
  for (const dbName of dbNames) {
    try {
      execSync(
        `mongosh "${mongoUri}" --eval "db.getSiblingDB('${dbName}').dropDatabase();"`,
        { encoding: "utf8" }
      );
    } catch (e) {
      console.error(`Failed to drop ${dbName}:`, e.message);
    }
  }
}

describe("mongosh tests for $graphLookup aggregation stage", () => {

  beforeEach(() => {
    dropTestDbs([
      "test_graphLookup_employees",
      "test_graphLookup_airports",
      "test_graphLookup_people"
    ]);
  });

  afterEach(() => {
    dropTestDbs([
      "test_graphLookup_employees",
      "test_graphLookup_airports",
      "test_graphLookup_people"
    ]);
  });

  test("Should return reporting hierarchy within a single collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/graphLookup/employees-insert.js",
        "aggregation/stages/graphLookup/employees-reporting-hierarchy.js"
      ])
      .withDbName("test_graphLookup_employees")
      .shouldResemble("aggregation/stages/graphLookup/employees-reporting-hierarchy-output.sh")
      .withSchema({
        count: 6,
        requiredFields: ["name", "reportingHierarchy"],
      });
  });

  test("Should return reachable destinations across multiple collections", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/graphLookup/airports-insert.js",
        "aggregation/stages/graphLookup/travelers-insert.js",
        "aggregation/stages/graphLookup/travelers-destinations.js"
      ])
      .withDbName("test_graphLookup_airports")
      .shouldResemble("aggregation/stages/graphLookup/travelers-destinations-output.sh")
      .withSchema({
        count: 3,
        requiredFields: ["name", "nearestAirport", "destinations"],
      });
  });

  test("Should find connections who play golf using restrictSearchWithMatch", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/graphLookup/people-insert.js",
        "aggregation/stages/graphLookup/people-golf-connections.js"
      ])
      .withDbName("test_graphLookup_people")
      .shouldResemble("aggregation/stages/graphLookup/people-golf-connections-output.sh")
      .withSchema({
        count: 1,
        requiredFields: ["name", "friends", "connections who play golf"],
      });
  });

});
