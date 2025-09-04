const { exec } = require("child_process");
const makeTempFileForTesting = require("./makeTempFileForTesting");
const unorderedOutputArrayMatches = require("./unorderedOutputArrayMatches");

/**
 * Runs a sequence of MongoDB shell scripts and validates the output of the last one.
 * This utility simplifies test writing by handling the common pattern of:
 * 1. Loading data files sequentially
 * 2. Running a pipeline/query
 * 3. Validating output against expected results
 *
 * @param {Object} config - Configuration for the test
 * @param {string} config.mongoUri - MongoDB connection string
 * @param {string} config.dbName - Database name to use
 * @param {number} config.port - MongoDB port
 * @param {string[]} config.files - Array of file paths relative to examples directory
 * @param {string} config.expectedOutputFile - Path to expected output file
 * @param {Function} config.done - Jest done callback
 * @param {Function} config.expect - Jest expect function
 */
function testExamplesSequentially(config) {
  const { mongoUri, dbName, port, files, expectedOutputFile, done, expect } = config;

  if (!files || files.length === 0) {
    throw new Error("At least one file must be specified");
  }

  let tempFilePaths;
  if (files.length > 1) {
    // For multi-file tests, concatenate all files into one temp file
    const details = {
      connectionString: mongoUri,
      dbName: dbName,
      filepath: files,
      validateOutput: true,
    };
    const tempPath = makeTempFileForTesting(details);
    tempFilePaths = [tempPath];
  } else {
    // For single-file tests, keep current behavior
    tempFilePaths = files.map((filepath, index) => {
      const isLastFile = index === files.length - 1;
      const details = {
        connectionString: mongoUri,
        dbName: dbName,
        filepath: filepath,
        validateOutput: isLastFile,
      };
      const tempPath = makeTempFileForTesting(details);
      console.log(`[runSequentialTests] Temp file for step ${index + 1}: ${tempPath}`);
      return tempPath;
    });
  }

  // Execute files sequentially (will be just one for multi-file tests)
  executeSequentially(tempFilePaths, 0, port, expectedOutputFile, done, expect);
}

/**
 * Recursively executes files in sequence
 * @param {string[]} tempFilePaths - Array of temp file paths
 * @param {number} index - Current file index
 * @param {number} port - MongoDB port
 * @param {string} expectedOutputFile - Expected output file path
 * @param {Function} done - Jest done callback
 * @param {Function} expect - Jest expect function
 */
function executeSequentially(tempFilePaths, index, port, expectedOutputFile, done, expect) {
  if (index >= tempFilePaths.length) {
    // All files executed successfully
    done();
    return;
  }

  const isLastFile = index === tempFilePaths.length - 1;
  const tempFilePath = tempFilePaths[index];

  exec(
    `mongosh --file ${tempFilePath} --port ${port}`,
    (error, stdout, stderr) => {
      if (stderr !== "") {
        console.error(`[runSequentialTests] Standard Error for step ${index + 1}:`, stderr);
      }
      // Handle errors
      if (error) {
        console.error(`[runSequentialTests] Error for step ${index + 1}:`, error);
        expect(error).toBeNull();
        return;
      }

      // If this is the last file, validate output
      if (isLastFile && expectedOutputFile) {
        const result = unorderedOutputArrayMatches(expectedOutputFile, stdout);
        if (!result) {
          console.error(`[runSequentialTests] Output did not match expected output.`);
        }
        expect(result).toBe(true);
      }

      // Continue with next file
      executeSequentially(tempFilePaths, index + 1, port, expectedOutputFile, done, expect);
    }
  );
}

module.exports = testExamplesSequentially;
