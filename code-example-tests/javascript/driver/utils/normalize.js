const { Decimal128, ObjectId } = require('mongodb');

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?[0-9]*Z?$/;
const UNQUOTED_KEY_REGEX = /(\b[a-zA-Z_][\w]*)\s*:/g;
const UNQUOTED_DATE_REGEX =
  /:\s*([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.?[0-9]*Z?)\b/g;
const QUOTED_DATE_REGEX =
  /"([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.?[0-9]*Z?)"/g;

/**
 * Determines if a value resembles a MongoDB ObjectId.
 * Checks for 24-character hex strings or objects with toHexString method.
 *
 * @param {*} val - The value to check
 * @returns {boolean} True if the value appears to be an ObjectId
 *
 * @example
 * isObjectIdLike('507f1f77bcf86cd799439011') // true
 * isObjectIdLike(new ObjectId()) // true
 * isObjectIdLike('not-an-id') // false
 */
function isObjectIdLike(val) {
  if (val == null) return false;
  return (
    (typeof val === 'string' &&
      val.length === 24 &&
      /^[a-f0-9]{24}$/i.test(val)) ||
    (val && typeof val.toHexString === 'function')
  );
}

/**
 * Converts MongoDB-specific types (Decimal128, ObjectId) to string representations
 * for consistent comparison across different MongoDB driver versions.
 *
 * @param {*} value - The value to normalize
 * @returns {*} The normalized value (string for MongoDB types, original value otherwise)
 *
 * @example
 * normalizeMongoTypes(new Decimal128('123.45')) // '123.45'
 * normalizeMongoTypes(new ObjectId()) // '507f1f77bcf86cd799439011'
 * normalizeMongoTypes('regular string') // 'regular string'
 */
function normalizeMongoTypes(value) {
  if (value instanceof Decimal128 || value instanceof ObjectId) {
    return value.toString();
  }
  return value;
}

/**
 * Normalizes Date objects and ISO date strings to consistent ISO string format
 * for reliable date comparison across different representations.
 *
 * @param {*} value - The value to normalize (Date object, ISO string, or other)
 * @returns {*} ISO string for dates, original value for non-dates
 *
 * @example
 * normalizeDateValue(new Date('2023-01-01')) // '2023-01-01T00:00:00.000Z'
 * normalizeDateValue('2023-01-01T12:00:00Z') // '2023-01-01T12:00:00.000Z'
 * normalizeDateValue('not a date') // 'not a date'
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
 * Recursively normalizes a single item (primitive, object, or array) by applying
 * MongoDB type normalization, date normalization, and preserving ellipsis patterns.
 *
 * @param {*} item - The item to normalize
 * @returns {*} The normalized item with consistent types for comparison
 *
 * @example
 * normalizeItem('...') // '...' (preserved)
 * normalizeItem([new Date(), '...']) // ['2023-01-01T00:00:00.000Z', '...']
 * normalizeItem({id: new ObjectId(), date: new Date()}) // {id: '507f...', date: '2023-01-01T...'}
 */
function normalizeItem(item) {
  if (item === '...') {
    return item; // Preserve ellipsis wildcard
  }

  if (Array.isArray(item)) {
    return item.map((element) => normalizeElement(element));
  }

  if (typeof item === 'object' && item !== null) {
    // Handle MongoDB types first
    const mongoNormalized = normalizeMongoTypes(item);
    if (mongoNormalized !== item) {
      return mongoNormalized; // MongoDB type was converted to string
    }

    // Handle Date objects
    const dateNormalized = normalizeDateValue(item);
    if (dateNormalized !== item) {
      return dateNormalized; // Date was converted to ISO string
    }

    // Handle special object ellipsis case
    if (Object.keys(item).length === 1 && item['...'] === '...') {
      return { '...': '...' };
    }

    return normalizeObject(item);
  }

  // Handle primitives
  return normalizeDateValue(normalizeMongoTypes(item));
}

/**
 * Normalizes individual array elements, preserving ellipsis patterns and
 * applying type normalization recursively.
 *
 * @param {*} element - The array element to normalize
 * @returns {*} The normalized element
 *
 * @example
 * normalizeElement('...') // '...' (preserved)
 * normalizeElement({date: new Date()}) // {date: '2023-01-01T00:00:00.000Z'}
 * normalizeElement(new ObjectId()) // '507f1f77bcf86cd799439011'
 */
function normalizeElement(element) {
  if (element === '...') {
    return element;
  }

  if (typeof element === 'object' && element !== null) {
    return normalizeItem(element); // Use recursive normalizeItem
  }

  // Handle primitives - MongoDB types and dates
  return normalizeDateValue(normalizeMongoTypes(element));
}

/**
 * Normalizes all properties of an object by recursively applying normalization
 * to each property value.
 *
 * @param {Object} obj - The object to normalize
 * @returns {Object} New object with normalized property values
 *
 * @example
 * normalizeObject({
 *   id: new ObjectId(),
 *   created: new Date(),
 *   tags: ['...']
 * })
 * // Returns: {id: '507f...', created: '2023-01-01T...', tags: ['...']}
 */
function normalizeObject(obj) {
  const normalized = {};

  for (const key in obj) {
    normalized[key] = normalizeItem(obj[key]);
  }

  return normalized;
}

/**
 * Parses file contents into separate document blocks by tracking brace balance.
 * Handles multiple concatenated objects separated by newlines.
 *
 * @param {string} contents - Raw file contents containing one or more JSON-like objects
 * @returns {string[]} Array of individual document blocks as strings
 *
 * @example
 * splitIntoDocumentBlocks(`{a: 1}
 * {b: 2}`)
 * // Returns: ['{a: 1}', '{b: 2}']
 */
function splitIntoDocumentBlocks(contents) {
  const lines = contents.trim().split('\n');
  const docBlocks = [];
  let currentBlock = [];
  let braceCount = 0;
  let inDocument = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;

    if (!inDocument && trimmedLine.startsWith('{')) {
      inDocument = true;
      braceCount = 0;
      currentBlock = [line];
    } else if (inDocument) {
      currentBlock.push(line);
    }

    if (inDocument) {
      braceCount += openBraces - closeBraces;

      if (braceCount === 0) {
        docBlocks.push(currentBlock.join('\n'));
        inDocument = false;
        currentBlock = [];
      }
    }
  }

  if (currentBlock.length > 0) {
    docBlocks.push(currentBlock.join('\n'));
  }

  return docBlocks;
}

/**
 * Converts MongoDB document syntax to valid JavaScript syntax for evaluation.
 * Handles ellipsis patterns, trailing commas, quote normalization, and date strings.
 *
 * @param {string} doc - Document string in MongoDB-like syntax
 * @returns {string} Valid JavaScript object syntax
 *
 * @example
 * normalizeDocumentSyntax(`{
 *   _id: ObjectId('...'),
 *   name: 'test',
 *   created: 2023-01-01T00:00:00Z,
 * }`)
 * // Returns: '{"_id": "...","name": "test","created": Date("2023-01-01T00:00:00Z")}'
 */
function normalizeDocumentSyntax(doc) {
  return doc
    .replace(/:\s*\.\.\./g, ": '...'") // Replace ellipsis
    .replace(/,\s*}/g, '}') // Remove trailing commas before }
    .replace(/,\s*]/g, ']') // Remove trailing commas before ]
    .replace(/'(.*?)'/g, '"$1"') // Single to double quotes
    .replace(UNQUOTED_KEY_REGEX, '"$1":') // Add quotes to keys
    .replace(UNQUOTED_DATE_REGEX, ': "$1"') // Wrap dates in quotes
    .replace(QUOTED_DATE_REGEX, 'Date("$1")'); // Convert to Date constructor
}

/**
 * Preprocesses file contents containing MongoDB-like documents into valid JavaScript
 * arrays for evaluation. Handles multiple documents and syntax normalization.
 *
 * @param {string} contents - Raw file contents with MongoDB document syntax
 * @returns {string[]} Array of JavaScript-ready document strings
 *
 * @example
 * preprocessFileContents(`{name: 'doc1'}
 * {name: 'doc2', _id: ...}`)
 * // Returns: ['{"name": "doc1"}', '{"name": "doc2", "_id": "..."}']
 */
function preprocessFileContents(contents) {
  const docBlocks = splitIntoDocumentBlocks(contents);
  return docBlocks.map(normalizeDocumentSyntax);
}

module.exports = {
  isObjectIdLike,
  normalizeItem,
  preprocessFileContents,
};
