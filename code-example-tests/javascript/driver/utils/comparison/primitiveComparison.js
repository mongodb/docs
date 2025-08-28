/**
 * Normalizes a single primitive value for consistent comparison.
 * Handles MongoDB BSON types, Date objects, and ISO date strings.
 *
 * @param {*} value - The value to normalize
 * @returns {*} Normalized value (strings for MongoDB types, ISO strings for dates)
 *
 * @example
 * normalizeValue(new ObjectId('507f...')) // '507f1f77bcf86cd799439011'
 * normalizeValue(new Date('2023-01-01')) // '2023-01-01T00:00:00.000Z'
 * normalizeValue('2023-01-01T12:00:00Z') // '2023-01-01T12:00:00.000Z'
 */
function normalizeValue(value) {
  // Handle MongoDB types
  if (value && typeof value === 'object' && value._bsontype === 'ObjectId') {
    return value.toString();
  }
  if (value && typeof value === 'object' && value._bsontype === 'Decimal128') {
    return value.toString();
  }

  // Handle Date objects
  if (value instanceof Date) {
    return value.toISOString();
  }

  // Handle ISO date strings
  if (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?[0-9]*Z?$/.test(value)
  ) {
    return new Date(value).toISOString();
  }

  return value;
}

/**
 * Compares two primitive values after normalization.
 * Ensures consistent comparison of MongoDB types and dates.
 *
 * @param {*} a - First value to compare
 * @param {*} b - Second value to compare
 * @returns {boolean} True if normalized values are equal
 *
 * @example
 * comparePrimitives(new Date('2023-01-01'), '2023-01-01T00:00:00.000Z') // true
 * comparePrimitives(new ObjectId('507f...'), '507f1f77bcf86cd799439011') // true
 */
function comparePrimitives(a, b) {
  const normalizedA = normalizeValue(a);
  const normalizedB = normalizeValue(b);
  return normalizedA === normalizedB;
}

/**
 * Determines if a value should be treated as a primitive for comparison purposes.
 * Primitives include null, undefined, strings, numbers, booleans, but not objects or functions.
 *
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is considered primitive
 *
 * @example
 * isPrimitive('hello') // true
 * isPrimitive(123) // true
 * isPrimitive(null) // true
 * isPrimitive({}) // false
 * isPrimitive([]) // false
 */
function isPrimitive(value) {
  return (
    value === null || (typeof value !== 'object' && typeof value !== 'function')
  );
}

module.exports = {
  comparePrimitives,
  isPrimitive,
};
