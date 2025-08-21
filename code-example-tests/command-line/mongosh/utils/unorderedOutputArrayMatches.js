const path = require("path");
const fs = require("fs");
const vm = require("vm");
const { Decimal128, ObjectId } = require("mongodb");

/**
 * Quotes unquoted keys in JavaScript object literals.
 *
 * @param {string} str - The string to process.
 * @returns {string} The processed string with quoted keys.
 */
function quoteUnquotedKeys(str) {
  return str.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
}

/**
 * Converts single-quoted strings to double-quoted strings.
 *
 * @param {string} str - The string to process.
 * @returns {string} The processed string with double quotes.
 */
function singleToDoubleQuotes(str) {
  return str.replace(/'([^']*)'/g, (_, val) => `"${val.replace(/"/g, '\\"')}"`);
}

/**
 * Rewrites MongoDB constructor calls to use the `new` keyword.
 *
 * @param {string} str - The string to process.
 * @returns {string} The processed string with constructors rewritten.
 */
function rewriteMongoConstructors(str) {
  return str
    .replace(/Decimal128\s*\(\s*(['"][^'"]+['"])\s*\)/g, "new Decimal128($1)")
    .replace(/ObjectId\s*\(\s*(['"][^'"]+['"])\s*\)/g, "new ObjectId($1)")
    .replace(/ISODate\s*\(\s*(['"][^'"]+['"])\s*\)/g, "new Date($1)");
}

/**
 * Extracts all top-level JavaScript object literals from a string by tracking curly brace depth,
 * removes comments, and wraps the objects in a single array literal.
 * This is robust to newlines, comments, and nested objects/arrays, and is used to parse
 * output files containing multiple object literals separated by whitespace or newlines.
 *
 * @param {string} str - The raw string containing one or more JavaScript object literals.
 * @returns {string} A string representing an array of the extracted objects, suitable for evaluation.
 * @throws {Error} If the input contains mismatched curly braces.
 */
function wrapObjectsInArrayByBraces(str) {
  // Remove comments and trim
  const cleaned = str
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/^\s*#.*$/gm, "")
    .trim();

  let objects = [];
  let braceDepth = 0;
  let current = '';
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === '{') {
      if (braceDepth === 0 && current.trim()) {
        // Ignore any text between objects
        current = '';
      }
      braceDepth++;
    }
    if (braceDepth > 0) current += char;
    if (char === '}') {
      braceDepth--;
      if (braceDepth === 0) {
        objects.push(current.trim());
        current = '';
      }
    }
  }
  if (braceDepth !== 0) {
    throw new Error("Mismatched braces in expected output file.");
  }
  return `[${objects.join(',\n')}]`;
}

/**
 * Attempts to parse the expected output from a string, handling JSON, JS object literals, and MongoDB constructors.
 *
 * @param {string} raw - The raw expected output string.
 * @returns {any} The parsed expected output, or undefined if parsing fails.
 */
function parseExpectedOutput(raw) {
  let preprocessed = wrapObjectsInArrayByBraces(raw);
  preprocessed = singleToDoubleQuotes(preprocessed);
  preprocessed = quoteUnquotedKeys(preprocessed);
  preprocessed = rewriteMongoConstructors(preprocessed);

  // Try JSON first
  try {
    return JSON.parse(preprocessed);
  } catch {}

  // Fallback: evaluate as JS array
  try {
    return vm.runInNewContext(preprocessed, {
      Decimal128,
      ObjectId,
      ISODate: (v) => new Date(v),
    });
  } catch (error) {
    console.error("Failed to parse expected output as array of objects:", error, preprocessed.slice(0, 500));
    return undefined;
  }
}

/**
 * Attempts to parse the actual output from a string, handling MongoDB constructors.
 *
 * @param {string} output - The raw actual output string.
 * @returns {any} The parsed actual output, or undefined if parsing fails.
 */
function parseActualOutput(output) {
  try {
    let preprocessed = rewriteMongoConstructors(output);
    return vm.runInNewContext(preprocessed, {
      Decimal128,
      ObjectId,
      ISODate: (v) => new Date(v),
    });
  } catch (error) {
    console.error("Failed to parse actual output:", error);
    return undefined;
  }
}

/**
 * Normalizes MongoDB-specific types (Decimal128, ObjectId, Date) for comparison.
 *
 * @param {any} item - The item to normalize.
 * @returns {any} The normalized item.
 */
function normalizeItem(item) {
  if (item == null) return item;
  if (Array.isArray(item)) return item.map(normalizeItem);
  if (typeof item === "object") {
    const normalized = {};
    for (const key in item) {
      const val = item[key];
      if (val instanceof Decimal128 || val instanceof ObjectId) {
        normalized[key] = val.toString();
      } else if (val instanceof Date) {
        normalized[key] = val.toISOString();
      } else if (typeof val === "object") {
        normalized[key] = normalizeItem(val);
      } else {
        normalized[key] = val;
      }
    }
    return normalized;
  }
  return item;
}

/**
 * Compares the output of a code example to the expected output, allowing for unordered arrays and flexible data formats.
 *
 * @param {string} filepath - The relative path to the expected output file.
 * @param {string} output - The actual output string to compare.
 * @returns {boolean} True if the outputs match (unordered), false otherwise.
 */
function unorderedArrayOutputMatches(filepath, output) {
  const outputFilePath = path.resolve(__dirname, "../examples/" + filepath);
  const rawExpectedOutput = fs.readFileSync(outputFilePath, "utf8");

  const expectedOutput = parseExpectedOutput(rawExpectedOutput);
  const actualOutputArray = parseActualOutput(output);

  if (expectedOutput === undefined || actualOutputArray === undefined) {
    console.log("One or both arrays is undefined.");
    return false;
  }

  const expectedArr = Array.isArray(expectedOutput)
    ? expectedOutput
    : [expectedOutput];
  const actualArr = Array.isArray(actualOutputArray)
    ? actualOutputArray
    : [actualOutputArray];

  const isEqual =
    actualArr.length === expectedArr.length &&
    expectedArr.every((expectedItem) =>
      actualArr.some(
        (actualItem) =>
          JSON.stringify(normalizeItem(actualItem)) ===
          JSON.stringify(normalizeItem(expectedItem)),
      ),
    );

  if (!isEqual) {
    console.log("Mismatch between actual output and expected output:", {
      actualArr,
      expectedArr,
    });
  }

  return isEqual;
}

module.exports = unorderedArrayOutputMatches;
