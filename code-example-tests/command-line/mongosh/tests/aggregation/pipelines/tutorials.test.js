const { exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const testExamplesSequentially = require("../../../utils/testExamplesSequentially");

jest.setTimeout(10000);

describe("mongosh aggregation pipeline tutorial tests", () => {
  const mongoUri = process.env.CONNECTION_STRING;
  const port = process.env.CONNECTION_PORT;
  const dbName = "agg-pipeline";

  // Drop the database and delete temp files after running the tests
  afterEach(() => {
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }

    const tempDirPath = path.resolve(__dirname, "../../../temp");
    try {
      // Recursively delete the `/temp` directory and its contents
      fs.rmSync(tempDirPath, { recursive: true, force: true });
    } catch (error) {
      console.error("Failed to clean temp directory:", error.message);
    }
  });

  test("Should return filtered output that includes the three specified person records", (done) => {
    const exampleFiles = [
      "aggregation/pipelines/filter/load-data.js",
      "aggregation/pipelines/filter/run-pipeline.js"
    ];
    const outputFile = "aggregation/pipelines/filter/output.sh";

    testExamplesSequentially({
      mongoUri,
      dbName,
      port,
      files: exampleFiles,
      expectedOutputFile: outputFile,
      done,
      expect
    });
  });

  test("Should return grouped and totaled output that includes the three expected records", (done) => {
    const exampleFiles = [
      "aggregation/pipelines/group/load-data.js",
      "aggregation/pipelines/group/run-pipeline.js"
    ];
    const outputFile = "aggregation/pipelines/group/output.sh";
    testExamplesSequentially({
      mongoUri,
      dbName,
      port,
      files: exampleFiles,
      expectedOutputFile: outputFile,
      done,
      expect
    });
  });

  test("Should return unpacked output grouped by product name", (done) => {
    const exampleFiles = [
      "aggregation/pipelines/unwind/load-data.js",
      "aggregation/pipelines/unwind/run-pipeline.js"
    ];
    const outputFile = "aggregation/pipelines/unwind/output.sh";
    testExamplesSequentially({
      mongoUri,
      dbName,
      port,
      files: exampleFiles,
      expectedOutputFile: outputFile,
      done,
      expect
    });
  });

  test("Should return joined data with the customer product name and category", (done) => {
    const exampleFiles = [
      "aggregation/pipelines/join-one-to-one/load-data-orders.js",
      "aggregation/pipelines/join-one-to-one/load-data-products.js",
      "aggregation/pipelines/join-one-to-one/run-pipeline.js"
    ];
    const outputFile = "aggregation/pipelines/join-one-to-one/output.sh";
    testExamplesSequentially({
      mongoUri,
      dbName,
      port,
      files: exampleFiles,
      expectedOutputFile: outputFile,
      done,
      expect
    });
  });

  test("Should return joined data based on multiple fields", (done) => {
    const exampleFiles = [
      "aggregation/pipelines/join-multi-field/load-data-orders.js",
      "aggregation/pipelines/join-multi-field/load-data-products.js",
      "aggregation/pipelines/join-multi-field/create-embedded-pipeline.js",
      "aggregation/pipelines/join-multi-field/run-pipeline.js"
    ];
    const outputFile = "aggregation/pipelines/join-multi-field/output.sh";
    testExamplesSequentially({
      mongoUri,
      dbName,
      port,
      files: exampleFiles,
      expectedOutputFile: outputFile,
      done,
      expect
    });
  });
});
