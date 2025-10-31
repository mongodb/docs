const { isPrimitive } = require('./primitiveComparison');

/**
 * Compares arrays using frequency counting for efficient duplicate handling.
 * Best for arrays of primitives where order doesn't matter and duplicates exist.
 *
 * @param {Array} arrayA - First array to compare
 * @param {Array} arrayB - Second array to compare
 * @returns {boolean} True if arrays have same elements with same frequencies
 *
 * @example
 * compareArraysByFrequency([1, 2, 2, 3], [3, 2, 1, 2]) // true
 * compareArraysByFrequency([1, 2], [1, 2, 2]) // false (different frequencies)
 */
function compareArraysByFrequency(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  // Get frequency maps for both arrays
  const freqA = arrayA.reduce((map, item) => {
    const key = JSON.stringify(item);
    map.set(key, (map.get(key) || 0) + 1);
    return map;
  }, new Map());

  const freqB = arrayB.reduce((map, item) => {
    const key = JSON.stringify(item);
    map.set(key, (map.get(key) || 0) + 1);
    return map;
  }, new Map());

  // Compare frequencies
  if (freqA.size !== freqB.size) return false;

  for (const [key, countA] of freqA) {
    const countB = freqB.get(key) || 0;
    if (countA !== countB) return false;
  }

  return true;
}

/**
 * Compares arrays using backtracking algorithm for complex object matching.
 * Finds optimal pairing between elements when order doesn't matter and objects need deep comparison.
 *
 * @param {Array} arrayA - First array to compare
 * @param {Array} arrayB - Second array to compare
 * @param {Function} compareElementsFn - Function to compare individual elements
 * @returns {boolean} True if arrays can be matched with backtracking
 *
 * @example
 * compareArraysByBacktracking(
 *   [{a: 1}, {b: 2}],
 *   [{b: 2}, {a: 1}],
 *   (a, b) => JSON.stringify(a) === JSON.stringify(b)
 * ) // true
 */
function compareArraysByBacktracking(arrayA, arrayB, compareElementsFn) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  const used = new Array(arrayB.length).fill(false);

  function backtrack(index) {
    if (index === arrayA.length) return true;

    for (let j = 0; j < arrayB.length; j++) {
      if (!used[j] && compareElementsFn(arrayA[index], arrayB[j])) {
        used[j] = true;
        if (backtrack(index + 1)) return true;
        used[j] = false;
      }
    }
    return false;
  }

  return backtrack(0);
}

/**
 * Hybrid array comparison that optimally handles mixed primitive/object arrays.
 * Uses frequency counting for primitives and backtracking for objects.
 *
 * @param {Array} arrayA - First array to compare
 * @param {Array} arrayB - Second array to compare
 * @param {Function} compareElementsFn - Function to compare individual elements (used for objects)
 * @returns {boolean} True if arrays match using hybrid approach
 *
 * @example
 * compareArraysHybrid(
 *   [1, 2, {a: 1}],
 *   [{a: 1}, 2, 1],
 *   (a, b) => areObjectsEqual(a, b)
 * ) // true (primitives [1,2] match, object {a:1} matches)
 */
function compareArraysHybrid(arrayA, arrayB, compareElementsFn) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  // Separate primitives from objects
  const primitivesA = arrayA.filter(isPrimitive);
  const primitivesB = arrayB.filter(isPrimitive);
  const objectsA = arrayA.filter((item) => !isPrimitive(item));
  const objectsB = arrayB.filter((item) => !isPrimitive(item));

  // Must have same counts of primitives vs objects
  if (
    primitivesA.length !== primitivesB.length ||
    objectsA.length !== objectsB.length
  ) {
    return false;
  }

  // Compare primitives using frequency map
  if (!compareArraysByFrequency(primitivesA, primitivesB)) {
    return false;
  }

  // Compare objects using backtracking
  if (objectsA.length > 0) {
    return compareArraysByBacktracking(objectsA, objectsB, compareElementsFn);
  }

  return true;
}

/**
 * Compares arrays in strict element-by-element order.
 * Elements must match at corresponding positions.
 *
 * @param {Array} arrayA - First array to compare
 * @param {Array} arrayB - Second array to compare
 * @param {Function} compareElementsFn - Function to compare elements at each position
 * @returns {boolean} True if all elements match in order
 *
 * @example
 * compareArraysOrdered(
 *   [{a: 1}, {b: 2}],
 *   [{a: 1}, {b: 2}],
 *   (a, b) => areObjectsEqual(a, b)
 * ) // true
 *
 * compareArraysOrdered(
 *   [{a: 1}, {b: 2}],
 *   [{b: 2}, {a: 1}],
 *   (a, b) => areObjectsEqual(a, b)
 * ) // false (different order)
 */
function compareArraysOrdered(arrayA, arrayB, compareElementsFn) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!compareElementsFn(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
}

module.exports = {
  compareArraysByBacktracking,
  compareArraysHybrid,
  compareArraysOrdered,
};
