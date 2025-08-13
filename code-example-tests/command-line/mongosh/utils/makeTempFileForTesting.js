const fs = require("fs");
const path = require("path");

/**
 * Creates a temporary JavaScript file for testing MongoDB shell code examples.
 *
 * Reads the code snippet from the examples directory, optionally wraps it in a printjson call
 * for output validation, and writes it to a temporary file in the temp directory.
 *
 * @param {Object} details - Details for generating the temp file.
 * @param {string} details.connectionString - The MongoDB connection string.
 * @param {string} details.dbName - The database name to use.
 * @param {string} details.filepath - The relative path to the example code file.
 * @param {boolean} details.validateOutput - Whether to wrap the code in printjson for output validation.
 * @returns {string} The absolute path to the generated temporary file.
 */
function makeTempFileForTesting(details) {
  const filepathString = "../examples/" + details.filepath;
  const snippetFilePath = path.resolve(__dirname, filepathString);
  const codeSnippet = fs.readFileSync(snippetFilePath, "utf8").trim();

  let tempFileContents = `db = connect('${details.connectionString}`;
  if (details.dbName) {
    tempFileContents = `${tempFileContents}/${details.dbName}');`;
  }

  if (details.validateOutput) {
    // If the code contains an aggregate call, just wrap it in printjson
    if (/\.aggregate\s*\(/.test(codeSnippet)) {
      tempFileContents += `\nprintjson(${codeSnippet});`;
    } else {
      // Fallback: just print the code
      tempFileContents += `\nprintjson(${codeSnippet});`;
    }
  } else {
    tempFileContents += `\n${codeSnippet};`;
  }

  const tempDir = "../temp";
  const buildTempFilepath = `${tempDir}/${details.filepath}`;
  const tempScriptPath = path.resolve(__dirname, buildTempFilepath);
  const tempScriptDir = path.dirname(tempScriptPath);

  fs.mkdirSync(tempScriptDir, { recursive: true });
  fs.writeFileSync(tempScriptPath, tempFileContents);
  return tempScriptPath;
}

module.exports = makeTempFileForTesting;
