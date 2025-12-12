const fs = require("fs");
const path = require("path");
const { ErrorMessageBuilder } = require("./comparison/errorReporting");

/**
 * Strips Bluehawk markup tags from code content.
 * Removes lines containing Bluehawk directives like :snippet-start:, :snippet-end:, etc.
 * Also removes inline tags like :remove: and :emphasize: from the end of code lines.
 *
 * @param {string} content - The code content potentially containing Bluehawk tags
 * @returns {string} Content with Bluehawk tags removed
 */
function stripBluehawkTags(content) {
  // Remove lines that contain Bluehawk markup tags and inline tags
  // Block tags (entire line): :snippet-start:, :snippet-end:, :remove-start:, :remove-end:,
  //                           :uncomment-start:, :uncomment-end:, :replace-start:, :replace-end:,
  //                           :state-start:, :state-end:, :state-remove-start:, :state-remove-end:
  // Inline tags (end of line): :remove:, :emphasize:
  return content
    .split('\n')
    .filter(line => !line.trim().match(/^\/\/\s*:[a-z-]+:/))  // Remove block tag lines
    .map(line => line.replace(/\s*\/\/\s*:[a-z-]+:\s*$/, ''))  // Remove inline tags from end of lines
    .join('\n');
}

/**
 * Validates the generated temp file content for common issues.
 *
 * @param {string} content - The temp file content to validate
 * @param {string} filepath - The original code example filepath
 * @returns {Object|null} Error object if validation fails, null if valid
 */
function validateTempFileContent(content, filepath) {
  const issues = [];

  // Check for unbalanced parentheses
  const openParens = (content.match(/\(/g) || []).length;
  const closeParens = (content.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    issues.push(`Unbalanced parentheses: ${openParens} opening, ${closeParens} closing`);
  }

  // Check for unbalanced brackets
  const openBrackets = (content.match(/\[/g) || []).length;
  const closeBrackets = (content.match(/\]/g) || []).length;
  if (openBrackets !== closeBrackets) {
    issues.push(`Unbalanced brackets: ${openBrackets} opening, ${closeBrackets} closing`);
  }

  // Check for unbalanced braces
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    issues.push(`Unbalanced braces: ${openBraces} opening, ${closeBraces} closing`);
  }

  // Check for double printjson wrapping (common mistake)
  if (/printjson\s*\(\s*printjson\s*\(/.test(content)) {
    issues.push('Double printjson() wrapping detected');
  }

  // Check for missing connection setup
  if (!content.includes('db = connect(')) {
    issues.push('Missing database connection setup (db = connect(...))');
  }

  // Check for malformed connection string
  if (content.includes("db = connect('") && !content.includes("');")) {
    issues.push('Malformed connection string (missing closing quote and parenthesis)');
  }

  if (issues.length > 0) {
    return {
      filepath,
      issues: issues.join('; ')
    };
  }

  return null;
}

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
 * @throws {Error} If temp file formation fails validation
 */
function makeTempFileForTesting(details) {
  // Handle both single filepath and array of filepaths
  const filepaths = Array.isArray(details.filepath) ? details.filepath : [details.filepath];

  let codeSnippet = '';

  // Read and combine all files
  for (const filepath of filepaths) {
    const filepathString = "../examples/" + filepath;
    const snippetFilePath = path.resolve(__dirname, filepathString);

    try {
      let fileContent = fs.readFileSync(snippetFilePath, "utf8").trim();
      // Strip Bluehawk markup tags before processing
      fileContent = stripBluehawkTags(fileContent);
      codeSnippet += fileContent + '\n';
    } catch (error) {
      if (error.code === 'ENOENT') {
        const baseDir = path.resolve(__dirname, "../examples");
        throw new Error(ErrorMessageBuilder.fileNotFound(filepath, baseDir, 'code example'));
      }
      throw error;
    }
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
          let content;
          try {
            content = fs.readFileSync(path.resolve(__dirname, "../examples/" + filepath), "utf8").trim();
            // Strip Bluehawk markup tags before processing
            content = stripBluehawkTags(content);
          } catch (error) {
            if (error.code === 'ENOENT') {
              const baseDir = path.resolve(__dirname, "../examples");
              throw new Error(ErrorMessageBuilder.fileNotFound(filepath, baseDir, 'code example'));
            }
            throw error;
          }

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

  // Validate the generated temp file content before writing
  const validationError = validateTempFileContent(tempFileContents, mainFilepath);
  if (validationError) {
    const errorMessage = ErrorMessageBuilder.tempFileFormationError(
      validationError.filepath,
      validationError.issues,
      tempScriptPath,
      tempFileContents
    );
    throw new Error(errorMessage);
  }

  fs.mkdirSync(tempScriptDir, { recursive: true });
  fs.writeFileSync(tempScriptPath, tempFileContents);
  return tempScriptPath;
}

module.exports = makeTempFileForTesting;
