const { Decimal128, ObjectId } = require('mongodb');

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?[0-9]*Z?$/;
// Match unquoted keys - must be preceded by {, [, comma, or newline (with optional whitespace)
// Use lookbehind to ensure we're at the start of a key-value pair
const UNQUOTED_KEY_REGEX = /(^|[\{\[,]\s*)([a-zA-Z_][\w]*)(\s*:)/gm;
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
  let bracketCount = 0;
  let inDocument = false;
  let isArray = false; // Track if the current document is an array

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Skip standalone ellipsis lines ONLY when between documents (not inside one)
    // When inside a document (object or array), preserve ellipsis for:
    // - Object: indicates omitted fields (will be converted to "...": "...")
    // - Array: indicates omitted elements (will be converted to "...")
    if (trimmedLine === '...' && !inDocument) continue;

    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    const openBrackets = (line.match(/\[/g) || []).length;
    const closeBrackets = (line.match(/\]/g) || []).length;

    // Start of a document (either object or array)
    if (
      !inDocument &&
      (trimmedLine.startsWith('{') || trimmedLine.startsWith('['))
    ) {
      inDocument = true;
      isArray = trimmedLine.startsWith('[');
      braceCount = 0;
      bracketCount = 0;
      currentBlock = [line];
    } else if (inDocument) {
      currentBlock.push(line);
    }

    if (inDocument) {
      braceCount += openBraces - closeBraces;
      bracketCount += openBrackets - closeBrackets;

      // Document is complete when both brace and bracket counts are zero
      if (braceCount === 0 && bracketCount === 0) {
        docBlocks.push(currentBlock.join('\n'));
        inDocument = false;
        isArray = false;
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
 * Converts standalone `"..."` on its own line inside objects to `"...": "..."`
 * to indicate omitted fields. This is context-aware and only converts inside
 * objects, not arrays.
 *
 * This enables support for patterns like:
 * { ok: 1, ... } where ... indicates more fields may exist
 *
 * @param {string} str - String with potential standalone ellipsis lines
 * @returns {string} String with standalone ellipsis converted to key-value pairs inside objects
 */
function convertStandaloneEllipsisToField(str) {
  const lines = str.split('\n');
  const result = [];
  // Track nesting: positive = more { than }, negative = more [ than {
  // We use a stack to track whether we're in an object or array context
  const contextStack = []; // 'object' or 'array'

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    // Check if this line is a standalone "..." (with optional whitespace and comma)
    const standaloneMatch = line.match(/^(\s*)"\.\.\."\s*(,?)(\s*)$/);

    if (standaloneMatch) {
      // Count braces/brackets to determine current context
      // We need to look at what's on the stack based on all previous lines
      let currentContext = contextStack.length > 0 ? contextStack[contextStack.length - 1] : null;

      if (currentContext === 'object') {
        // We're inside an object, convert to key-value pair
        // Check if we need to add a comma (if there's no comma and more content follows)
        let comma = standaloneMatch[2];
        if (!comma) {
          // Look ahead to see if there's more content (non-closing-brace content)
          for (let i = lineIndex + 1; i < lines.length; i++) {
            const nextLine = lines[i].trim();
            if (nextLine.length === 0) continue; // Skip empty lines
            if (nextLine.startsWith('}') || nextLine.startsWith(']')) {
              // Next meaningful line is a closing brace/bracket, no comma needed
              break;
            }
            // There's more content, add a comma
            comma = ',';
            break;
          }
        }
        result.push(`${standaloneMatch[1]}"...": "..."${comma}${standaloneMatch[3]}`);
      } else {
        // We're inside an array or at top level, keep as-is
        result.push(line);
      }
    } else {
      result.push(line);
    }

    // Update context stack based on this line (excluding strings)
    let inString = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
        inString = !inString;
      } else if (!inString) {
        if (char === '{') {
          contextStack.push('object');
        } else if (char === '[') {
          contextStack.push('array');
        } else if (char === '}' || char === ']') {
          contextStack.pop();
        }
      }
    }
  }

  return result.join('\n');
}

/**
 * Quotes unquoted ellipsis patterns in a string-aware manner.
 * This function processes the string character by character, skipping over
 * quoted strings to avoid transforming ellipsis that are inside string values.
 *
 * Transforms:
 * - Property-level: `{ _id: ... }` → `{ _id: "..." }`
 * - Array-level: `[..., ...]` → `["...", "..."]`
 * - Array start: `[...]` → `["..."]`
 *
 * Preserves:
 * - Ellipsis inside strings: `"story ends..."` → unchanged
 *
 * @param {string} str - String with potential unquoted ellipsis
 * @returns {string} String with unquoted ellipsis converted to quoted strings
 */
function quoteUnquotedEllipsis(str) {
  let result = '';
  let i = 0;

  while (i < str.length) {
    const char = str[i];

    if (char === '"') {
      // Inside a double-quoted string - copy verbatim until closing quote
      result += char;
      i++;
      while (i < str.length) {
        const innerChar = str[i];
        result += innerChar;
        if (innerChar === '\\' && i + 1 < str.length) {
          // Escaped character - copy the next char too
          i++;
          result += str[i];
        } else if (innerChar === '"') {
          // End of string
          break;
        }
        i++;
      }
      i++;
    } else if (char === '.' && str.substring(i, i + 3) === '...') {
      // Found potential ellipsis outside a string
      // Check if this is an unquoted ellipsis that needs quoting
      // Look ahead to see what follows the ellipsis
      const afterEllipsis = str.substring(i + 3);
      const followedByDelimiter = /^[\s,\}\]]/.test(afterEllipsis);

      if (followedByDelimiter) {
        // This is an unquoted ellipsis - quote it
        result += '"..."';
        i += 3;
      } else {
        // Not a standalone ellipsis, just copy the dot
        result += char;
        i++;
      }
    } else {
      result += char;
      i++;
    }
  }

  return result;
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
  // First, escape any double quotes that are inside single-quoted strings
  let result = doc.replace(/'([^']*)'/g, (match, content) => {
    // Escape any double quotes in the content
    const escapedContent = content.replace(/"/g, '\\"');
    return `"${escapedContent}"`;
  });

  // Quote unquoted ellipsis in a string-aware manner
  // This must be done after quote conversion but before other transformations
  result = quoteUnquotedEllipsis(result);

  // Convert standalone `"..."` on its own line to `"...": "..."` to indicate omitted fields
  // This enables support for patterns like { ok: 1, ... } where ... indicates more fields exist
  // This is context-aware and only converts inside objects, not arrays
  result = convertStandaloneEllipsisToField(result);

  result = result
    .replace(/,\s*}/g, '}') // Remove trailing commas before }
    .replace(/,\s*]/g, ']') // Remove trailing commas before ]
    // $1 = prefix (start/brace/bracket/comma + whitespace), $2 = key name, $3 = colon with whitespace
    .replace(UNQUOTED_KEY_REGEX, '$1"$2"$3') // Add quotes to keys
    .replace(UNQUOTED_DATE_REGEX, ': "$1"'); // Wrap dates in quotes

  // Only convert quoted date strings to Date constructors if they're not already inside new Date() calls
  if (!result.includes('new Date(')) {
    result = result.replace(QUOTED_DATE_REGEX, 'Date("$1")'); // Convert to Date constructor
  }

  return result;
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
