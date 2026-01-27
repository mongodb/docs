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
      errors: ellipsisResult.matches
        ? []
        : [new ComparisonError(path, expected, actual, 'Pattern mismatch')],
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
      addError(
        path,
        expected,
        actual,
        `Value mismatch: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
      );
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
  if (ellipsisResult.isHandled && !ellipsisResult.requiresEllipsisMatching) {
    return {
      isMatch: ellipsisResult.matches,
      errors: ellipsisResult.matches
        ? []
        : [
            new ComparisonError(
              path,
              expectedArr,
              actualArr,
              'Array pattern mismatch'
            ),
          ],
    };
  }

  // Check length
  if (expectedArr.length !== actualArr.length) {
    errors.push(
      new ComparisonError(
        path,
        expectedArr,
        actualArr,
        `Array length mismatch: expected ${expectedArr.length} elements, got ${actualArr.length}`
      )
    );
    return { isMatch: false, errors };
  }

  // For ordered comparison, compare element by element
  if (options.comparisonType === 'ordered') {
    let allMatch = true;
    for (let i = 0; i < expectedArr.length; i++) {
      const elemPath = `${path}[${i}]`;
      const result = compareWithDetails(
        expectedArr[i],
        actualArr[i],
        elemPath,
        options
      );
      if (!result.isMatch) {
        allMatch = false;
        errors.push(...result.errors);
      }
    }
    return { isMatch: allMatch, errors };
  }

  // For unordered comparison, this function shouldn't be called directly
  // (it will be handled by analyzeUnorderedMismatch)
  // But if it is called, we can't provide detailed matching here
  // Just return a simple boolean check
  errors.push(
    new ComparisonError(
      path,
      expectedArr,
      actualArr,
      'Unordered array comparison requires analyzeUnorderedMismatch'
    )
  );
  return { isMatch: false, errors };
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
      errors: ellipsisResult.matches
        ? []
        : [
            new ComparisonError(
              path,
              expectedObj,
              actualObj,
              'Object pattern mismatch'
            ),
          ],
    };
  }

  // Analyze object keys
  const keyAnalysis = compareObjectKeys(expectedObj, actualObj, options);

  // Get keys to compare
  const keysA = Object.keys(expectedObj).filter((k) => k !== '...');
  const keysB = Object.keys(actualObj).filter((k) => k !== '...');
  const keySetA = new Set(keysA);
  const keySetB = new Set(keysB);

  // Check for missing keys (in expected but not in actual)
  const missingKeys = keysA.filter((k) => !keySetB.has(k));
  if (missingKeys.length > 0) {
    for (const key of missingKeys) {
      errors.push(
        new ComparisonError(
          `${path}.${key}`,
          expectedObj[key],
          undefined,
          `Missing expected key: "${key}"`
        )
      );
    }
  }

  // Check for extra keys (in actual but not in expected)
  if (!keyAnalysis.allowOmittedFields) {
    const extraKeys = keysB.filter((k) => !keySetA.has(k));
    if (extraKeys.length > 0) {
      for (const key of extraKeys) {
        errors.push(
          new ComparisonError(
            `${path}.${key}`,
            undefined,
            actualObj[key],
            `Unexpected extra key: "${key}"`
          )
        );
      }
    }
  }

  // If keys don't match properly and we can't proceed, return early
  if (!keyAnalysis.canProceed) {
    return { isMatch: false, errors };
  }

  // Compare each property that exists in expected
  let allMatch = true;
  for (const key of keysA) {
    if (key === '...') continue; // Skip global ellipsis marker

    if (keySetB.has(key)) {
      const propPath = `${path}.${key}`;
      const result = compareWithDetails(
        expectedObj[key],
        actualObj[key],
        propPath,
        options
      );
      if (!result.isMatch) {
        allMatch = false;
        errors.push(...result.errors);
      }
    }
  }

  return { isMatch: allMatch && errors.length === 0, errors };
}

module.exports = {
  compareWithDetails,
};
