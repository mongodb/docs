const { comparePrimitives } = require('./comparison/primitiveComparison');
const {
  compareArraysByBacktracking,
  compareArraysHybrid,
  compareArraysOrdered,
} = require('./comparison/arrayComparison');
const {
  compareObjectKeys,
  compareObjectProperties,
} = require('./comparison/objectComparison');
const {
  handlePropertyLevelEllipsis,
  handleArrayLevelEllipsis,
  handleObjectLevelEllipsis,
} = require('./comparison/ellipsisHandlers');
const { matchWithEllipsis } = require('./ellipsis');

/**
 * Compares two values for deep equality with support for MongoDB types, ellipsis patterns,
 * and flexible array/object comparison strategies.
 *
 * @param {*} a - The expected value (can contain ellipsis patterns)
 * @param {*} b - The actual value to compare against
 * @param {Object} [options={}] - Comparison options
 * @param {string} [options.comparisonType] - 'ordered' or 'unordered' for arrays
 * @param {boolean} [options.unordered] - Whether to compare arrays in unordered fashion
 * @param {string[]} [options.ignoreFieldValues] - Array of field names to ignore during value comparison
 * @param {boolean} [options.allowOmittedFieldsWithEllipsis] - Whether to allow omitted fields
 * @returns {boolean} True if the values are considered equal according to the comparison rules
 *
 * @example
 * // Basic comparison
 * areObjectsEqual({ a: 1 }, { a: 1 }) // true
 *
 * // Ellipsis matching
 * areObjectsEqual({ _id: '...' }, { _id: 'any-value' }) // true
 *
 * // Truncated string matching
 * areObjectsEqual({ title: 'Hello...' }, { title: 'Hello World' }) // true
 *
 * // Global ellipsis for flexible object matching
 * areObjectsEqual({ a: 1, '...': '...' }, { a: 1, b: 2, c: 3 }) // true
 */
function areObjectsEqual(a, b, options = {}) {
  // Handle property-level ellipsis first
  const ellipsisResult = handlePropertyLevelEllipsis(a, b);
  if (ellipsisResult.isHandled) {
    return ellipsisResult.matches;
  }

  // Handle strict equality for primitives
  if (a === b) {
    return true;
  }

  // Handle null/undefined cases
  if (a == null || b == null) {
    return a === b;
  }

  // Handle type mismatches for non-objects
  if (typeof a !== 'object' || typeof b !== 'object') {
    return comparePrimitives(a, b);
  }

  // Handle array comparison
  if (Array.isArray(a) && Array.isArray(b)) {
    return compareArrays(a, b, options);
  }

  // Handle object comparison
  if (Array.isArray(a) || Array.isArray(b)) {
    return false; // One is array, one is object
  }

  return compareObjects(a, b, options);
}

/**
 * Compares two arrays using the appropriate strategy based on options and content types.
 * Supports ellipsis patterns, ordered/unordered comparison, and hybrid approaches for
 * mixed primitive/object arrays.
 *
 * @param {Array} arrayA - The expected array (may contain ellipsis patterns)
 * @param {Array} arrayB - The actual array to compare against
 * @param {Object} options - Comparison options from parent function
 * @returns {boolean} True if arrays are considered equal according to the comparison strategy
 *
 * @example
 * // Ellipsis matching
 * compareArrays([1, '...', 4], [1, 2, 3, 4], {}) // true
 *
 * // Unordered comparison
 * compareArrays([{a:1}, {b:2}], [{b:2}, {a:1}], {unordered: true}) // true
 */
function compareArrays(arrayA, arrayB, options) {
  // Check for array-level ellipsis
  const ellipsisResult = handleArrayLevelEllipsis(arrayA, arrayB);
  if (ellipsisResult.isHandled) {
    if (ellipsisResult.requiresEllipsisMatching) {
      return matchWithEllipsis(
        arrayA,
        arrayB,
        options
      );
    }
    return ellipsisResult.matches;
  }

  // Choose comparison strategy based on options
  const isUnordered =
    options.unordered || options.comparisonType === 'unordered';
  const isOrdered = options.comparisonType === 'ordered';

  if (isOrdered) {
    return compareArraysOrdered(arrayA, arrayB, (a, b) =>
      areObjectsEqual(a, b, options)
    );
  }

  if (isUnordered) {
    // Determine if all elements are objects (use backtracking) or use hybrid approach
    const allObjectsA =
      arrayA.length > 0 &&
      arrayA.every((el) => el && typeof el === 'object' && !Array.isArray(el));
    const allObjectsB =
      arrayB.length > 0 &&
      arrayB.every((el) => el && typeof el === 'object' && !Array.isArray(el));

    if (allObjectsA && allObjectsB) {
      return compareArraysByBacktracking(arrayA, arrayB, (a, b) =>
        areObjectsEqual(a, b, options)
      );
    } else {
      return compareArraysHybrid(arrayA, arrayB, (a, b) =>
        areObjectsEqual(a, b, options)
      );
    }
  }

  // Default: strict ordered comparison
  return compareArraysOrdered(arrayA, arrayB, (a, b) =>
    areObjectsEqual(a, b, options)
  );
}

/**
 * Compares two objects with support for ellipsis patterns, global omission markers,
 * and flexible key matching strategies.
 *
 * @param {Object} objA - The expected object (may contain ellipsis patterns)
 * @param {Object} objB - The actual object to compare against
 * @param {Object} options - Comparison options from parent function
 * @returns {boolean} True if objects are considered equal according to the comparison rules
 *
 * @example
 * // Property ellipsis
 * compareObjects({ _id: '...' }, { _id: 'any-value' }, {}) // true
 *
 * // Global ellipsis
 * compareObjects({ a: 1, '...': '...' }, { a: 1, b: 2 }, {}) // true
 */
function compareObjects(objA, objB, options) {
  // Check for object-level ellipsis
  const ellipsisResult = handleObjectLevelEllipsis(objA, objB);
  if (ellipsisResult.isHandled) {
    return ellipsisResult.matches;
  }

  // Analyze object keys
  const keyAnalysis = compareObjectKeys(objA, objB, options);
  if (!keyAnalysis.canProceed) {
    return false;
  }

  // Compare object properties
  return compareObjectProperties(
    objA,
    objB,
    (a, b) => areObjectsEqual(a, b, options),
    keyAnalysis,
    options
  );
}

module.exports = { areObjectsEqual };
