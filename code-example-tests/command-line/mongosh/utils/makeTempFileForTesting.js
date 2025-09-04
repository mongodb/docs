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
 * @param {string|string[]} details.filepath - The relative path to the example code file, or an array of paths for dependencies.
 * @param {boolean} details.validateOutput - Whether to wrap the code in printjson for output validation.
 * @returns {string} The absolute path to the generated temporary file.
 */
function makeTempFileForTesting(details) {
  // Handle both single filepath and array of filepaths
  const filepaths = Array.isArray(details.filepath) ? details.filepath : [details.filepath];

  let codeSnippet = '';

  // Read and combine all files
  for (const filepath of filepaths) {
    const filepathString = "../examples/" + filepath;
    const snippetFilePath = path.resolve(__dirname, filepathString);
    const fileContent = fs.readFileSync(snippetFilePath, "utf8").trim();
    codeSnippet += fileContent + '\n';
  }

  codeSnippet = codeSnippet.trim();

  let tempFileContents = `db = connect('${details.connectionString}`;
  if (details.dbName) {
    tempFileContents = `${tempFileContents}/${details.dbName}');`;
  }

  if (details.validateOutput) {
    if (filepaths.length > 1) {
      // Concatenate all files, but wrap the last file's aggregation pipeline in printjson
      const allFilesContent = filepaths
        .map((filepath, idx) => {
          const content = fs.readFileSync(path.resolve(__dirname, "../examples/" + filepath), "utf8").trim();
          // For the last file, wrap aggregation pipeline in printjson
          if (idx === filepaths.length - 1) {
            const trimmed = content.trim();
            if (/^db\.[^.]+\.aggregate\s*\(/.test(trimmed)) {
              return `printjson(${trimmed});`;
            } else if (/^(const|let|var)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*db\.[^.]+\.aggregate\s*\(/.test(trimmed)) {
              const match = trimmed.match(/^(const|let|var)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*db\.[^.]+\.aggregate\s*\(/);
              const varName = match[2];
              return `${trimmed}\nprintjson(${varName});`;
            } else {
              return `printjson(${trimmed});`;
            }
          }
          return content;
        })
        .join('\n');
      tempFileContents += `\n${allFilesContent}`;
    } else {
      // Single file case (existing behavior)
      if (/\.aggregate\s*\(/.test(codeSnippet)) {
        tempFileContents += `\nprintjson(${codeSnippet});`;
      } else {
        tempFileContents += `\nprintjson(${codeSnippet});`;
      }
    }
  } else {
    tempFileContents += `\n${codeSnippet};`;
  }

  const tempDir = "../temp";
  // Use the first filepath for the temp file name to maintain consistency
  const mainFilepath = Array.isArray(details.filepath) ? details.filepath[details.filepath.length - 1] : details.filepath;
  const buildTempFilepath = `${tempDir}/${mainFilepath}`;
  const tempScriptPath = path.resolve(__dirname, buildTempFilepath);
  const tempScriptDir = path.dirname(tempScriptPath);

  fs.mkdirSync(tempScriptDir, { recursive: true });
  fs.writeFileSync(tempScriptPath, tempFileContents);
  return tempScriptPath;
}

module.exports = makeTempFileForTesting;
