const { isTruncatedValue } = require('../ellipsis');

/**
 * Handles property-level ellipsis and truncation patterns in value comparisons.
 * Detects and processes different ellipsis types including full wildcards and prefix truncation.
 *
 * @param {*} expected - Expected value (may contain ellipsis patterns)
 * @param {*} actual - Actual value to compare against
 * @returns {Object} Handler result
 * @returns {boolean} returns.isHandled - Whether ellipsis pattern was detected
 * @returns {boolean} [returns.matches] - Whether values match (only if isHandled is true)
 *
 * @example
 * handlePropertyLevelEllipsis('...', 'anything')
 * // Returns: {isHandled: true, matches: true}
 *
 * handlePropertyLevelEllipsis('prefix...', 'prefixSuffix')
 * // Returns: {isHandled: true, matches: true}
 *
 * handlePropertyLevelEllipsis('prefix...', 'different')
 * // Returns: {isHandled: true, matches: false}
 */
function handlePropertyLevelEllipsis(expected, actual) {
  const truncResult = isTruncatedValue(expected);

  if (truncResult === true) {
    // '...' matches any value
    return { isHandled: true, matches: true };
  }

  if (truncResult === 'truncated') {
    // 'prefix...' matches strings that start with prefix
    if (typeof actual === 'string') {
      const prefix = expected.slice(0, -3);
      return { isHandled: true, matches: actual.startsWith(prefix) };
    } else {
      return { isHandled: true, matches: false };
    }
  }

  if (expected === '...') {
    return { isHandled: true, matches: true };
  }

  return { isHandled: false };
}

/**
 * Detects and handles array-level ellipsis patterns for flexible array matching.
 * Supports full array wildcards and arrays containing ellipsis elements requiring special processing.
 *
 * @param {Array} expectedArray - Expected array (may contain ellipsis patterns)
 * @param {Array} actualArray - Actual array to compare against
 * @returns {Object} Handler result
 * @returns {boolean} returns.isHandled - Whether array-level ellipsis was detected
 * @returns {boolean} [returns.matches] - Whether arrays match (for simple cases)
 * @returns {boolean} [returns.requiresEllipsisMatching] - Whether complex ellipsis processing is needed
 *
 * @example
 * handleArrayLevelEllipsis(['...'], [1, 2, 3])
 * // Returns: {isHandled: true, matches: true}
 *
 * handleArrayLevelEllipsis([1, '...', 3], [1, 2, 3])
 * // Returns: {isHandled: true, requiresEllipsisMatching: true}
 *
 * handleArrayLevelEllipsis([1, 2], [1, 2])
 * // Returns: {isHandled: false}
 */
function handleArrayLevelEllipsis(expectedArray, actualArray) {
  // Array-level ellipsis: ['...'] matches any array
  if (expectedArray.length === 1 && expectedArray[0] === '...') {
    return { isHandled: true, matches: true };
  }

  // Check if array contains ellipsis requiring special handling
  if (expectedArray.includes('...')) {
    return { isHandled: true, requiresEllipsisMatching: true };
  }

  // Check for wildcard ellipsis in unordered arrays
  if (expectedArray.some((el) => isTruncatedValue(el) === true)) {
    return { isHandled: true, matches: true };
  }

  return { isHandled: false };
}

/**
 * Detects and handles object-level ellipsis patterns for flexible object matching.
 * Recognizes the special {... : '...'} pattern that matches any valid object structure.
 *
 * @param {Object} expectedObj - Expected object (may be ellipsis pattern)
 * @param {Object} actualObj - Actual object to compare against
 * @returns {Object} Handler result
 * @returns {boolean} returns.isHandled - Whether object-level ellipsis was detected
 * @returns {boolean} [returns.matches] - Whether objects match according to ellipsis rules
 *
 * @example
 * handleObjectLevelEllipsis({'...': '...'}, {a: 1, b: 2})
 * // Returns: {isHandled: true, matches: true}
 *
 * handleObjectLevelEllipsis({'...': '...'}, [1, 2, 3])
 * // Returns: {isHandled: true, matches: false} (arrays don't match object ellipsis)
 *
 * handleObjectLevelEllipsis({a: 1}, {a: 1})
 * // Returns: {isHandled: false}
 */
function handleObjectLevelEllipsis(expectedObj, actualObj) {
  // Object ellipsis: { ...: '...' } matches any object
  if (
    typeof expectedObj === 'object' &&
    expectedObj !== null &&
    !Array.isArray(expectedObj) &&
    Object.keys(expectedObj).length === 1 &&
    Object.prototype.hasOwnProperty.call(expectedObj, '...') &&
    expectedObj['...'] === '...'
  ) {
    const isValidObject =
      typeof actualObj === 'object' &&
      actualObj !== null &&
      !Array.isArray(actualObj);
    return { isHandled: true, matches: isValidObject };
  }

  return { isHandled: false };
}

module.exports = {
  handlePropertyLevelEllipsis,
  handleArrayLevelEllipsis,
  handleObjectLevelEllipsis,
};
