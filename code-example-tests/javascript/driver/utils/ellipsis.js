// NOTE: Do not require areObjectsEqual at the top to avoid circular dependency

/**
 * Determines if a value represents a truncated string or ellipsis pattern.
 *
 * @param {*} val - The value to check for truncation patterns
 * @returns {boolean|string} Returns:
 *   - `true` if value is exactly '...' (matches any value)
 *   - `'truncated'` if value is a string ending with '...' (prefix matching)
 *   - `false` if value is not a truncation pattern
 *
 * @example
 * isTruncatedValue('...') // true (matches any value)
 * isTruncatedValue('Hello...') // 'truncated' (prefix matching)
 * isTruncatedValue('Hello') // false (no truncation)
 */
function isTruncatedValue(val) {
  // Match exact '...' or any string ending with '...'
  if (val === '...') return true;
  if (typeof val === 'string' && val.trim() === '...') return true;
  if (typeof val === 'string' && val.endsWith('...')) return 'truncated';
  return false;
}

/**
 * Checks if an object represents a wildcard ellipsis pattern ({ ...: '...' }).
 * This pattern matches any object structure.
 *
 * @param {*} val - The value to check for object ellipsis pattern
 * @returns {boolean} True if the value is an object ellipsis pattern
 *
 * @example
 * isObjectEllipsis({ '...': '...' }) // true
 * isObjectEllipsis({ a: 1, '...': '...' }) // false (has other properties)
 * isObjectEllipsis({ a: 1 }) // false (no ellipsis)
 */
function isObjectEllipsis(val) {
  return (
    typeof val === 'object' &&
    val !== null &&
    Object.keys(val).length === 1 &&
    Object.prototype.hasOwnProperty.call(val, '...') &&
    val['...'] === '...'
  );
}

/**
 * Performs ellipsis-aware array matching with backtracking support.
 * Handles '...' wildcards, truncated strings, and nested object/array comparison.
 *
 * @param {Array} eArr - Expected array (may contain ellipsis patterns)
 * @param {Array} aArr - Actual array to match against
 * @param {Object} [options={}] - Comparison options passed to nested comparisons
 * @param {number} [depth=0] - Current recursion depth (for internal use)
 * @returns {boolean} True if the arrays match according to ellipsis rules
 *
 * @example
 * // Basic ellipsis matching
 * matchWithEllipsis(['...'], [1, 2, 3]) // true (any array)
 * matchWithEllipsis([1, '...', 4], [1, 2, 3, 4]) // true (middle elements skipped)
 *
 * // Truncated string matching
 * matchWithEllipsis(['Hello...'], ['Hello World']) // true (prefix match)
 *
 * // Nested object matching
 * matchWithEllipsis([{a: '...'}], [{a: 1, b: 2}]) // true (nested ellipsis)
 */
function matchWithEllipsis(
  eArr,
  aArr,
  options = {},
  depth = 0
) {
  // Require here to avoid circular dependency
  const { areObjectsEqual } = require('./areObjectsEqual');

  // Base case: both empty
  if (eArr.length === 0 && aArr.length === 0) {
    return true;
  }
  // Only expected exhausted: fail if actual remains (unless trailing ellipsis)
  if (eArr.length === 0) {
    return false;
  }
  // Only actual exhausted: must be all trailing ellipsis
  if (aArr.length === 0) {
    const allEllipsis = eArr.every((el) => el === '...');
    return allEllipsis;
  }
  // Ellipsis handling
  if (eArr[0] === '...') {
    // If ellipsis is last, it matches any remainder
    if (eArr.length === 1) {
      return true;
    }
    // Try to match the next non-ellipsis element at every possible position
    for (let skip = 0; skip <= aArr.length; skip++) {
      if (
        matchWithEllipsis(
          eArr.slice(1),
          aArr.slice(skip),
          options,
          depth + 1
        )
      ) {
        return true;
      }
    }
    return false;
  }
  // Non-ellipsis: must match current element
  const truncElem = isTruncatedValue(eArr[0]);
  if (truncElem === 'truncated') {
    if (typeof aArr[0] === 'string') {
      const prefix = eArr[0].slice(0, -3);
      const match = aArr[0].startsWith(prefix);
      if (!match) {
        return false;
      }
      return matchWithEllipsis(
        eArr.slice(1),
        aArr.slice(1),
        options,
        depth + 1
      );
    } else {
      return false;
    }
  }
  if (!areObjectsEqual(eArr[0], aArr[0], options)) {
    return false;
  }
  return matchWithEllipsis(
    eArr.slice(1),
    aArr.slice(1),
    options,
    depth + 1
  );
}

module.exports = { isTruncatedValue, isObjectEllipsis, matchWithEllipsis };
