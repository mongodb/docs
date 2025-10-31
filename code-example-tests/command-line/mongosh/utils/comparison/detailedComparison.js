const { ComparisonError } = require('./errorReporting');
const { comparePrimitives } = require('./primitiveComparison');
const {
  handlePropertyLevelEllipsis,
  handleArrayLevelEllipsis,
  handleObjectLevelEllipsis,
} = require('./ellipsisHandlers');
const { compareObjectKeys } = require('./objectComparison');

/**
 * Performs detailed comparison of two values, returning structured error information
 * instead of just a boolean. This enables better error reporting for unordered arrays.
 *
 * @param {*} expected - Expected value
 * @param {*} actual - Actual value
 * @param {string} path - Current path in data structure
 * @param {Object} options - Comparison options
 * @returns {Object} { isMatch: boolean, errors: Array<ComparisonError> }
 */
function compareWithDetails(expected, actual, path, options = {}) {
  const errors = [];

  // Helper to add error
  const addError = (subPath, exp, act, message) => {
    errors.push(new ComparisonError(subPath, exp, act, message));
  };

  // Handle property-level ellipsis
  const ellipsisResult = handlePropertyLevelEllipsis(expected, actual);
  if (ellipsisResult.isHandled) {
    return {
      isMatch: ellipsisResult.matches,
      errors: ellipsisResult.matches ? [] : [
        new ComparisonError(path, expected, actual, 'Pattern mismatch')
      ],
    };
  }

  // Handle strict equality for primitives
  if (expected === actual) {
    return { isMatch: true, errors: [] };
  }

  // Handle null/undefined cases
  if (expected == null || actual == null) {
    if (expected !== actual) {
      addError(path, expected, actual, 'Null/undefined mismatch');
      return { isMatch: false, errors };
    }
    return { isMatch: true, errors: [] };
  }

  // Handle type mismatches for non-objects
  if (typeof expected !== 'object' || typeof actual !== 'object') {
    const isMatch = comparePrimitives(expected, actual);
    if (!isMatch) {
      // Check if it's a type mismatch
      const expectedType = typeof expected;
      const actualType = typeof actual;

      let message;
      if (expectedType !== actualType) {
        message = `Type mismatch: expected ${expectedType} (${JSON.stringify(expected)}), got ${actualType} (${JSON.stringify(actual)})\n\n` +
          `💡 Tip: Check if your code example needs to convert the value to match the expected type`;
      } else {
        message = `Value mismatch: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}\n\n` +
          `💡 Tip: Verify the data in your test database matches the expected output`;
      }

      addError(path, expected, actual, message);
    }
    return { isMatch, errors };
  }

  // Handle array comparison
  if (Array.isArray(expected) && Array.isArray(actual)) {
    return compareArraysWithDetails(expected, actual, path, options);
  }

  // Handle array/object mismatch
  if (Array.isArray(expected) || Array.isArray(actual)) {
    addError(
      path,
      expected,
      actual,
      `Type mismatch: expected ${Array.isArray(expected) ? 'array' : 'object'}, got ${Array.isArray(actual) ? 'array' : 'object'}`
    );
    return { isMatch: false, errors };
  }

  // Handle object comparison
  return compareObjectsWithDetails(expected, actual, path, options);
}

/**
 * Compares two arrays with detailed error reporting.
 *
 * @param {Array} expectedArr - Expected array
 * @param {Array} actualArr - Actual array
 * @param {string} path - Current path
 * @param {Object} options - Comparison options
 * @returns {Object} { isMatch: boolean, errors: Array<ComparisonError> }
 */
function compareArraysWithDetails(expectedArr, actualArr, path, options) {
  const errors = [];

  // Check array-level ellipsis
  const ellipsisResult = handleArrayLevelEllipsis(expectedArr, actualArr);
  if (ellipsisResult.isHandled) {
    return {
      isMatch: ellipsisResult.matches,
      errors: ellipsisResult.matches ? [] : [
        new ComparisonError(path, expectedArr, actualArr, 'Array ellipsis pattern mismatch')
      ],
    };
  }

  // Check length mismatch
  if (expectedArr.length !== actualArr.length) {
    const message = `Array length mismatch: expected ${expectedArr.length} elements, got ${actualArr.length}\n\n` +
      `💡 Tip: Check if your code example returns all expected items or if there are extra items in the output`;
    errors.push(
      new ComparisonError(
        path,
        expectedArr,
        actualArr,
        message
      )
    );
    return { isMatch: false, errors };
  }

  // For ordered comparison, compare element by element
  const isOrdered = options.comparisonType === 'ordered';
  if (isOrdered) {
    let allMatch = true;
    for (let i = 0; i < expectedArr.length; i++) {
      const elemPath = `${path}[${i}]`;
      const result = compareWithDetails(expectedArr[i], actualArr[i], elemPath, options);
      if (!result.isMatch) {
        allMatch = false;
        errors.push(...result.errors);
      }
    }
    return { isMatch: allMatch, errors };
  }

  // For unordered comparison, we need to find best matches
  // This is handled by the caller using analyzeUnorderedMismatch
  // For now, just do element-by-element comparison to collect errors
  let allMatch = true;
  for (let i = 0; i < expectedArr.length; i++) {
    const elemPath = `${path}[${i}]`;
    const result = compareWithDetails(expectedArr[i], actualArr[i], elemPath, options);
    if (!result.isMatch) {
      allMatch = false;
      errors.push(...result.errors);
    }
  }
  return { isMatch: allMatch, errors };
}

/**
 * Compares two objects with detailed error reporting.
 *
 * @param {Object} expectedObj - Expected object
 * @param {Object} actualObj - Actual object
 * @param {string} path - Current path
 * @param {Object} options - Comparison options
 * @returns {Object} { isMatch: boolean, errors: Array<ComparisonError> }
 */
function compareObjectsWithDetails(expectedObj, actualObj, path, options) {
  const errors = [];

  // Check object-level ellipsis
  const ellipsisResult = handleObjectLevelEllipsis(expectedObj, actualObj);
  if (ellipsisResult.isHandled) {
    return {
      isMatch: ellipsisResult.matches,
      errors: ellipsisResult.matches ? [] : [
        new ComparisonError(path, expectedObj, actualObj, 'Object ellipsis pattern mismatch')
      ],
    };
  }

  // Get keys from both objects
  const expectedKeys = Object.keys(expectedObj);
  const actualKeys = Object.keys(actualObj);

  // Check for missing and extra keys
  const missingKeys = expectedKeys.filter(key => !(key in actualObj));
  const extraKeys = actualKeys.filter(key => !(key in expectedObj));

  let allMatch = true;

  // Report missing keys
  for (const key of missingKeys) {
    allMatch = false;
    const message = `Missing expected field '${key}'\n\n` +
      `💡 Tip: Check if your code example includes the '${key}' field in the output`;
    errors.push(
      new ComparisonError(
        `${path}.${key}`,
        expectedObj[key],
        undefined,
        message
      )
    );
  }

  // Report extra keys (unless ignored)
  const ignoreFields = options.ignoreFields || [];
  for (const key of extraKeys) {
    if (!ignoreFields.includes(key)) {
      allMatch = false;
      const message = `Unexpected extra field '${key}'\n\n` +
        `💡 Tip: Either add '${key}' to your expected output or use ignoreFields option to ignore it`;
      errors.push(
        new ComparisonError(
          `${path}.${key}`,
          undefined,
          actualObj[key],
          message
        )
      );
    }
  }

  // Compare common keys
  const commonKeys = expectedKeys.filter(key => key in actualObj);
  for (const key of commonKeys) {
    const keyPath = `${path}.${key}`;
    const result = compareWithDetails(expectedObj[key], actualObj[key], keyPath, options);
    if (!result.isMatch) {
      allMatch = false;
      errors.push(...result.errors);
    }
  }

  return { isMatch: allMatch, errors };
}

module.exports = {
  compareWithDetails,
  compareArraysWithDetails,
  compareObjectsWithDetails,
};

