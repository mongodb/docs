const { exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const makeTempFileForTesting = require("../../../utils/makeTempFileForTesting");
const unorderedOutputArrayMatches = require("../../../utils/unorderedOutputArrayMatches");

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
    // Load test data details
    const loadDataFilePath = "aggregation/pipelines/filter/load-data.js";

    const loadDataDetails = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: loadDataFilePath,
      validateOutput: false,
    };

    const tempLoadDataPath = makeTempFileForTesting(loadDataDetails);

    // Run the aggregation pipeline details
    const pipelineFilePath = "aggregation/pipelines/filter/run-pipeline.js";
    const expectedOutputFilePath = "aggregation/pipelines/filter/output.sh";

    const pipelineDetails = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: pipelineFilePath,
      validateOutput: true,
    };

    const tempPipelinePath = makeTempFileForTesting(pipelineDetails);

    // Load the test data, then run the pipeline
    exec(
      `mongosh --file ${tempLoadDataPath} --port ${port}`,
      (error, stdout, stderr) => {
        expect(error).toBeNull(); // Ensure no error occurred
        if (stderr !== "") {
          console.error("Standard Error:", stderr);
        }
        // Run the pipeline after the test data is loaded
        exec(
          `mongosh --file ${tempPipelinePath} --port ${port}`,
          (error, stdout, stderr) => {
            expect(error).toBeNull(); // Ensure no error occurred
            if (stderr !== "") {
              console.error("Standard Error:", stderr);
            }

            // Validate the output
            const result = unorderedOutputArrayMatches(
              expectedOutputFilePath,
              stdout,
            );
            expect(result).toBe(true);
            done();
          },
        );
      },
    );
  });

  test("Should return grouped and totaled output that includes the three expected records", (done) => {
    // Load test data details
    const loadDataFilePath = "aggregation/pipelines/group/load-data.js";

    const loadDataDetails = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: loadDataFilePath,
      validateOutput: false,
    };

    const tempLoadDataPath = makeTempFileForTesting(loadDataDetails);

    // Run the aggregation pipeline details
    const pipelineFilePath = "aggregation/pipelines/group/run-pipeline.js";
    const expectedOutputFilePath = "aggregation/pipelines/group/output.sh";

    const pipelineDetails = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: pipelineFilePath,
      validateOutput: true,
    };

    const tempPipelinePath = makeTempFileForTesting(pipelineDetails);

    // Load the test data, then run the pipeline
    exec(
      `mongosh --file ${tempLoadDataPath} --port ${port}`,
      (error, stdout, stderr) => {
        expect(error).toBeNull(); // Ensure no error occurred
        if (stderr !== "") {
          console.error("Standard Error:", stderr);
        }
        // Run the pipeline after the test data is loaded
        exec(
          `mongosh --file ${tempPipelinePath} --port ${port}`,
          (error, stdout, stderr) => {
            expect(error).toBeNull(); // Ensure no error occurred
            if (stderr !== "") {
              console.error("Standard Error:", stderr);
            }

            // Validate the output
            const result = unorderedOutputArrayMatches(
              expectedOutputFilePath,
              stdout,
            );
            expect(result).toBe(true);
            done();
          },
        );
      },
    );
  });

  test("Should return unpacked output grouped by product name", (done) => {
    // Load test data details
    const loadDataFilePath = "aggregation/pipelines/unwind/load-data.js";

    const loadDataDetails = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: loadDataFilePath,
      validateOutput: false,
    };

    const tempLoadDataPath = makeTempFileForTesting(loadDataDetails);

    // Run the aggregation pipeline details
    const pipelineFilePath = "aggregation/pipelines/unwind/run-pipeline.js";
    const expectedOutputFilePath = "aggregation/pipelines/unwind/output.sh";

    const pipelineDetails = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: pipelineFilePath,
      validateOutput: true,
    };

    const tempPipelinePath = makeTempFileForTesting(pipelineDetails);

    // Load the test data, then run the pipeline
    exec(
      `mongosh --file ${tempLoadDataPath} --port ${port}`,
      (error, stdout, stderr) => {
        expect(error).toBeNull(); // Ensure no error occurred
        if (stderr !== "") {
          console.error("Standard Error:", stderr);
        }
        // Run the pipeline after the test data is loaded
        exec(
          `mongosh --file ${tempPipelinePath} --port ${port}`,
          (error, stdout, stderr) => {
            expect(error).toBeNull(); // Ensure no error occurred
            if (stderr !== "") {
              console.error("Standard Error:", stderr);
            }

            // Validate the output
            const result = unorderedOutputArrayMatches(
              expectedOutputFilePath,
              stdout,
            );
            expect(result).toBe(true);
            done();
          },
        );
      },
    );
  });

  test("Should return joined data with the customer product name and category", (done) => {
    // Load test data details
    const loadDataOrdersFilePath = "aggregation/pipelines/join-one-to-one/load-data-orders.js";

    const loadDataOrdersDetails = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: loadDataOrdersFilePath,
      validateOutput: false,
    };

    const tempLoadDataOrdersPath = makeTempFileForTesting(loadDataOrdersDetails);

    const loadDataProductsFilePath = "aggregation/pipelines/join-one-to-one/load-data-products.js";

    const loadDataProductsDetails = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: loadDataProductsFilePath,
      validateOutput: false,
    };

    const tempLoadDataProductsPath = makeTempFileForTesting(loadDataProductsDetails);

    // Run the aggregation pipeline details
    const pipelineFilePath = "aggregation/pipelines/join-one-to-one/run-pipeline.js";
    const expectedOutputFilePath = "aggregation/pipelines/join-one-to-one/output.sh";

    const pipelineDetails = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: pipelineFilePath,
      validateOutput: true,
    };

    const tempPipelinePath = makeTempFileForTesting(pipelineDetails);

    // Load the orders test data
    exec(
      `mongosh --file ${tempLoadDataOrdersPath} --port ${port}`,
      (error, stdout, stderr) => {
        expect(error).toBeNull(); // Ensure no error occurred
        if (stderr !== "") {
          console.error("Standard Error:", stderr);
        }
        // Load the products test data
        exec(
          `mongosh --file ${tempLoadDataProductsPath} --port ${port}`,
          (error, stdout, stderr) => {
            expect(error).toBeNull(); // Ensure no error occurred
            if (stderr !== "") {
              console.error("Standard Error:", stderr);
            }

            // Run the pipeline after the test data is loaded
            exec(
              `mongosh --file ${tempPipelinePath} --port ${port}`,
              (error, stdout, stderr) => {
                expect(error).toBeNull(); // Ensure no error occurred
                if (stderr !== "") {
                  console.error("Standard Error:", stderr);
                }

                // Validate the output
                const result = unorderedOutputArrayMatches(
                  expectedOutputFilePath,
                  stdout,
                );
                expect(result).toBe(true);
                done();
              },
            );
          },
        );
      },
    );
  });
});
