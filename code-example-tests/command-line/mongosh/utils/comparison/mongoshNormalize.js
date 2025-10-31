const { Decimal128, ObjectId, Long, Int32, Double } = require('mongodb');

/**
 * mongoshNormalize extends the base normalize functionality to handle
 * mongosh-specific types like Long, Int32, and Double that may not be
 * present in JavaScript Driver output.
 *
 * All MongoDB types are normalized to string representations for
 * consistent comparison across different output formats.
 */

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?[0-9]*Z?$/;

/**
 * Normalizes MongoDB-specific types to string representations.
 * Handles all mongosh type constructors including Long, Int32, Double.
 *
 * @param {*} value - The value to normalize
 * @returns {*} Normalized value (string for MongoDB types, original otherwise)
 */
function normalizeMongoTypes(value) {
  if (value instanceof Decimal128 || value instanceof ObjectId) {
    return value.toString();
  }

  // Handle Long (64-bit integer)
  if (value instanceof Long || (value && typeof value.toString === 'function' && value.constructor.name === 'Long')) {
    return value.toString();
  }

  // Handle Int32 (32-bit integer)
  if (value instanceof Int32 || (value && value.constructor && value.constructor.name === 'Int32')) {
    return value.toString();
  }

  // Handle Double (explicit double precision)
  if (value instanceof Double || (value && value.constructor && value.constructor.name === 'Double')) {
    return value.toString();
  }

  return value;
}

/**
 * Normalizes Date objects and ISO date strings to consistent format.
 *
 * @param {*} value - The value to normalize
 * @returns {*} ISO string for dates, original value otherwise
 */
function normalizeDateValue(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'string' && ISO_DATE_REGEX.test(value)) {
    return new Date(value).toISOString();
  }

  return value;
}

/**
 * Recursively normalizes an item (primitive, object, or array).
 * Preserves ellipsis patterns while normalizing MongoDB types.
 *
 * @param {*} item - The item to normalize
 * @returns {*} Normalized item
 */
function normalizeItem(item) {
  // Preserve ellipsis wildcard
  if (item === '...') {
    return item;
  }

  // Handle arrays recursively
  if (Array.isArray(item)) {
    return item.map(element => normalizeElement(element));
  }

  // Handle objects
  if (typeof item === 'object' && item !== null) {
    // Try MongoDB type normalization first
    const mongoNormalized = normalizeMongoTypes(item);
    if (mongoNormalized !== item) {
      return mongoNormalized; // Was a MongoDB type, now string
    }

    // Try date normalization
    const dateNormalized = normalizeDateValue(item);
    if (dateNormalized !== item) {
      return dateNormalized; // Was a date, now ISO string
    }

    // Special case: object ellipsis marker
    if (Object.keys(item).length === 1 && item['...'] === '...') {
      return { '...': '...' };
    }

    // Regular object - normalize all properties
    return normalizeObject(item);
  }

  // Handle primitives
  return normalizeDateValue(normalizeMongoTypes(item));
}

/**
 * Normalizes array elements, preserving ellipsis patterns.
 *
 * @param {*} element - Array element to normalize
 * @returns {*} Normalized element
 */
function normalizeElement(element) {
  if (element === '...') {
    return element;
  }

  if (typeof element === 'object' && element !== null) {
    return normalizeItem(element);
  }

  return normalizeDateValue(normalizeMongoTypes(element));
}

/**
 * Normalizes all properties of an object recursively.
 *
 * @param {Object} obj - Object to normalize
 * @returns {Object} New object with normalized properties
 */
function normalizeObject(obj) {
  const normalized = {};

  for (const key in obj) {
    normalized[key] = normalizeItem(obj[key]);
  }

  return normalized;
}

/**
 * Normalizes data for comparison.
 * Handles arrays, objects, and primitives.
 *
 * @param {*} data - Data to normalize
 * @returns {*} Normalized data
 */
function normalizeForComparison(data) {
  if (Array.isArray(data)) {
    return data.map(normalizeItem);
  }

  if (typeof data === 'object' && data !== null) {
    return normalizeItem(data);
  }

  return data;
}

/**
 * Ensures both expected and actual data are in comparable formats.
 * Wraps single objects in arrays when needed for consistency.
 *
 * @param {*} expected - Expected data
 * @param {*} actual - Actual data
 * @returns {Object} Object with normalized expected and actual
 */
function ensureComparableFormat(expected, actual) {
  // If expected is array but actual is single object, wrap actual
  if (Array.isArray(expected) && !Array.isArray(actual) && typeof actual === 'object') {
    return { expected, actual: [actual] };
  }

  // If actual is array but expected is single object, wrap expected
  if (Array.isArray(actual) && !Array.isArray(expected) && typeof expected === 'object') {
    return { expected: [expected], actual };
  }

  return { expected, actual };
}

module.exports = {
  normalizeMongoTypes,
  normalizeDateValue,
  normalizeItem,
  normalizeElement,
  normalizeObject,
  normalizeForComparison,
  ensureComparableFormat,
};

