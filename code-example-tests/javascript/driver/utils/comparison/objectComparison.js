/**
 * Analyzes object keys to determine comparison strategy and constraints.
 * Detects global ellipsis patterns and configures field omission rules.
 *
 * @param {Object} objA - Expected object (may contain ellipsis patterns)
 * @param {Object} objB - Actual object to compare against
 * @param {Object} [options={}] - Comparison options
 * @returns {Object} Analysis result with comparison metadata
 * @returns {boolean} returns.canProceed - Whether comparison can continue
 * @returns {string[]} returns.keysA - Keys from expected object
 * @returns {string[]} returns.keysB - Keys from actual object
 * @returns {boolean} returns.allowOmittedFields - Whether missing fields are allowed
 * @returns {boolean} returns.hasGlobalOmission - Whether global '...' marker is present
 *
 * @example
 * compareObjectKeys({a: 1, '...': '...'}, {a: 1, b: 2})
 * // Returns: {canProceed: true, allowOmittedFields: true, hasGlobalOmission: true, ...}
 */
function compareObjectKeys(objA, objB, options = {}) {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // Check for global omission marker
  const hasGlobalOmission = keysA.includes('...') && objA['...'] === '...';
  const allPropsEllipsis =
    keysA.length > 0 && keysA.every((k) => objA[k] === '...');
  const allowOmittedFields =
    hasGlobalOmission || allPropsEllipsis;

  if (!allowOmittedFields) {
    // Strict comparison: keys must match exactly
    if (keysA.length !== keysB.length) return { canProceed: false };

    const keySetA = new Set(keysA);
    const keySetB = new Set(keysB);

    for (const key of keySetA) {
      if (!keySetB.has(key)) return { canProceed: false };
    }

    for (const key of keySetB) {
      if (!keySetA.has(key)) return { canProceed: false };
    }
  }

  return {
    canProceed: true,
    keysA,
    keysB,
    allowOmittedFields,
    hasGlobalOmission,
  };
}

/**
 * Determines if an object key should be ignored during comparison.
 * Handles ellipsis markers and fields with dynamic values.
 *
 * @param {string} key - The object key to evaluate
 * @param {Object} [options={}] - Comparison options
 * @param {string[]} [options.ignoreFieldValues] - List of field names to ignore during value comparison
 * @returns {boolean} True if key should be skipped during comparison
 *
 * @example
 * shouldIgnoreKey('...')  // Returns: true
 * shouldIgnoreKey('data') // Returns: false
 * shouldIgnoreKey('_id', {ignoreFieldValues: ['_id']}) // Returns: true
 * shouldIgnoreKey('timestamp', {ignoreFieldValues: ['timestamp', 'uuid']}) // Returns: true
 */
function shouldIgnoreKey(key, options) {
  // Skip global omission marker
  if (key === '...') return true;

  // Check if key is in ignore list
  if (options.ignoreFieldValues && options.ignoreFieldValues.includes(key)) {
    return true;
  }

  return false;
}

/**
 * Compares properties of two objects using a provided comparison function.
 * Handles ellipsis patterns and missing keys based on configuration.
 *
 * @param {Object} objA - Expected object (may contain ellipsis patterns)
 * @param {Object} objB - Actual object to compare against
 * @param {Function} compareValuesFn - Function to compare individual values
 * @param {Object} keyAnalysis - Analysis result from compareObjectKeys()
 * @param {string[]} keyAnalysis.keysA - Keys from expected object
 * @param {boolean} keyAnalysis.allowOmittedFields - Whether missing fields are allowed
 * @param {Object} [options={}] - Comparison options
 * @returns {boolean} True if all properties match according to comparison rules
 *
 * @example
 * const analysis = compareObjectKeys({a: 1, '...': '...'}, {a: 1, b: 2});
 * compareObjectProperties({a: 1, '...': '...'}, {a: 1, b: 2}, deepEqual, analysis)
 * // Returns: true (ellipsis allows extra 'b' field)
 */
function compareObjectProperties(
  objA,
  objB,
  compareValuesFn,
  keyAnalysis,
  options = {}
) {
  const { keysA, allowOmittedFields } = keyAnalysis;

  for (const key of keysA) {
    if (shouldIgnoreKey(key, options)) {
      continue;
    }

    // Handle property-level ellipsis
    if (objA[key] === '...') {
      continue; // Ellipsis matches any value
    }

    // Check if key exists in object B
    if (!(key in objB)) {
      if (allowOmittedFields) {
        continue; // Missing key is allowed
      } else {
        return false; // Missing key not allowed
      }
    }

    // Compare the property values
    if (!compareValuesFn(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

module.exports = {
  compareObjectKeys,
  shouldIgnoreKey,
  compareObjectProperties,
};
