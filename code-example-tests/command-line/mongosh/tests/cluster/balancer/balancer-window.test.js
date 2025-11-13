const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

jest.setTimeout(10000);

describe("mongosh balancer window tests", () => {
  const dbName = "config";

  beforeEach(() => {
    // Clear any existing balancer settings before each test
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}/config" --eval "db.settings.deleteOne({_id: 'balancer'})"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to clear balancer settings:`, error.message);
    }
  });

  test("Should set and verify an activeWindow balancer window", async () => {
    await Expect
      .outputFromExampleFiles([
        "cluster/balancer/set-daily-window.js",
        "cluster/balancer/check-balancer-window.js"
      ])
      .withDbName(dbName)
      .shouldMatch("cluster/balancer/output-check-daily.sh");
  });

  test("Should set and verify an activeWindowDOW (weekdays)", async () => {
    await Expect
      .outputFromExampleFiles([
        "cluster/balancer/set-weekday-window.js",
        "cluster/balancer/check-balancer-window.js"
      ])
      .withDbName(dbName)
      .shouldMatch("cluster/balancer/output-check-weekday.sh");
  });

  test("Should set and verify an activeWindowDOW (overnight)", async () => {
    await Expect
      .outputFromExampleFiles([
        "cluster/balancer/set-overnight-window.js",
        "cluster/balancer/check-balancer-window.js"
      ])
      .withDbName(dbName)
      .shouldMatch("cluster/balancer/output-check-overnight.sh");
  });

  test("Should clear activeWindow setting", async () => {
    await Expect
      .outputFromExampleFiles([
        "cluster/balancer/set-daily-window.js",
        "cluster/balancer/unset-active-window.js",
        "cluster/balancer/check-balancer-window.js"
      ])
      .withDbName(dbName)
      .shouldMatch("cluster/balancer/output-check-cleared.sh");
  });

  test("Should clear activeWindowDOW setting", async () => {
    await Expect
      .outputFromExampleFiles([
        "cluster/balancer/set-weekday-window.js",
        "cluster/balancer/unset-active-window-DOW.js",
        "cluster/balancer/check-balancer-window.js"
      ])
      .withDbName(dbName)
      .shouldMatch("cluster/balancer/output-check-cleared.sh");
  });
});