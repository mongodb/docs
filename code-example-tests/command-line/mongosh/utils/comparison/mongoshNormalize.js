const {
  Decimal128,
  ObjectId,
  Long,
  Int32,
  Double,
  Timestamp,
  Binary
} = require('mongodb');

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
 * Handles all mongosh type constructors including Long, Int32, Double, and Map.
 *
 * @param {*} value - The value to normalize
 * @returns {*} Normalized value (string for MongoDB types, array for Maps, original otherwise)
 */
function normalizeMongoTypes(value) {
  if (value instanceof Decimal128 || value instanceof ObjectId) {
    return value.toString();
  }

  // Handle Map objects (from bulkWrite verboseResults)
  // Convert Map to array of objects with 'index' property
  // Example: Map([[0, {insertedId: ObjectId('...')}]]) -> [{index: 0, insertedId: '...'}]
  if (value instanceof Map) {
    return normalizeMapToArray(value);
  }

  // Handle Timestamp (check before Long since Timestamp also has toNumber method)
  if (value instanceof Timestamp || (value && value.constructor && value.constructor.name === 'Timestamp')) {
    return `Timestamp({ t: ${value.high}, i: ${value.low} })`;
  }

  // Handle Binary (check before Long since Binary might also have similar methods)
  if (value instanceof Binary || (value && value.constructor && value.constructor.name === 'Binary')) {
    const base64 = value.buffer.toString('base64');
    return `Binary.createFromBase64("${base64}", ${value.sub_type})`;
  }

  // Handle Long (64-bit integer)
  if (value instanceof Long || (value && typeof value.toString === 'function' && value.constructor.name === 'Long')) {
    // Convert to number if it fits within JavaScript's safe integer range
    const longValue = value.toNumber();
    if (Number.isSafeInteger(longValue)) {
      return longValue;
    }
    // Fall back to string for very large numbers
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
 * Converts a Map object to an array of objects with 'index' property.
 * This is used to normalize bulkWrite verboseResults output.
 *
 * The Map keys are numeric indices, and values are result objects.
 * We convert to an array format that matches the expected output structure.
 *
 * @param {Map} map - The Map object to convert
 * @returns {Array} Array of objects with index property and normalized values
 *
 * @example
 * // Input: Map([[0, {insertedId: ObjectId('...')}], [1, {insertedId: ObjectId('...')}]])
 * // Output: [{index: 0, insertedId: '...'}, {index: 1, insertedId: '...'}]
 */
function normalizeMapToArray(map) {
  const result = [];

  for (const [key, value] of map.entries()) {
    // Recursively normalize the value
    const normalizedValue = normalizeItem(value);

    // If the value is an object, add the index property to it
    if (typeof normalizedValue === 'object' && normalizedValue !== null && !Array.isArray(normalizedValue)) {
      result.push({ index: key, ...normalizedValue });
    } else {
      // If value is not an object, create an object with index and value
      result.push({ index: key, value: normalizedValue });
    }
  }

  return result;
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
  normalizeMapToArray,
};

