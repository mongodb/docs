const vm = require('vm');
const {
  Decimal128,
  ObjectId,
  Long,
  Int32,
  Double,
  Timestamp,
  Binary,
  BSONRegExp,
  Code,
  DBRef,
  MaxKey,
  MinKey
} = require('mongodb');

/**
 * MongoshOutputParser handles parsing of mongosh shell output strings.
 *
 * mongosh output differs from JavaScript Driver output in several ways:
 * - Output is captured as strings from stdout
 * - Multiple objects appear consecutively without array wrapper
 * - Uses mongosh-specific type constructors (ISODate, etc.)
 * - May contain REPL artifacts or formatting
 *
 * This parser normalizes mongosh output into JavaScript objects for comparison.
 */
class MongoshOutputParser {
  /**
   * Creates evaluation context with MongoDB type constructors.
   * Supports both function call and new constructor syntax.
   *
   * @returns {Object} Context object for vm.runInNewContext
   */
  static createEvaluationContext() {
    // Wrapper functions that work both as constructors (new X()) and functions (X())
    function DateConstructor(value) {
      return new Date(value);
    }
    DateConstructor.prototype = Date.prototype;

    function ObjectIdConstructor(value) {
      return new ObjectId(value);
    }
    ObjectIdConstructor.prototype = ObjectId.prototype;

    function Decimal128Constructor(value) {
      return new Decimal128(value);
    }
    Decimal128Constructor.prototype = Decimal128.prototype;

    function LongConstructor(value) {
      if (typeof value === 'string') {
        return Long.fromString(value);
      }
      return Long.fromNumber(value);
    }
    LongConstructor.prototype = Long.prototype;

    function Int32Constructor(value) {
      return new Int32(parseInt(value, 10));
    }
    Int32Constructor.prototype = Int32.prototype;

    function DoubleConstructor(value) {
      return new Double(parseFloat(value));
    }
    DoubleConstructor.prototype = Double.prototype;

    function TimestampConstructor(value) {
      // Handle both object format {t: number, i: number} and direct construction
      if (typeof value === 'object' && value !== null && 't' in value && 'i' in value) {
        return new Timestamp({ t: value.t, i: value.i });
      }
      return new Timestamp(value);
    }
    TimestampConstructor.prototype = Timestamp.prototype;

    function BinaryConstructor(value, subtype) {
      return new Binary(value, subtype);
    }
    BinaryConstructor.prototype = Binary.prototype;
    // Add static methods that mongosh uses
    BinaryConstructor.createFromBase64 = function(base64String, subtype) {
      return Binary.createFromBase64(base64String, subtype);
    };

    function BSONRegExpConstructor(pattern, options) {
      return new BSONRegExp(pattern, options);
    }
    BSONRegExpConstructor.prototype = BSONRegExp.prototype;

    function CodeConstructor(code, scope) {
      return new Code(code, scope);
    }
    CodeConstructor.prototype = Code.prototype;

    function DBRefConstructor(collection, oid, db) {
      return new DBRef(collection, oid, db);
    }
    DBRefConstructor.prototype = DBRef.prototype;

    function MaxKeyConstructor() {
      return new MaxKey();
    }
    MaxKeyConstructor.prototype = MaxKey.prototype;

    function MinKeyConstructor() {
      return new MinKey();
    }
    MinKeyConstructor.prototype = MinKey.prototype;

    return {
      Decimal128: Decimal128Constructor,
      NumberDecimal: Decimal128Constructor, // Legacy name
      ObjectId: ObjectIdConstructor,
      Date: DateConstructor,
      ISODate: DateConstructor, // mongosh-specific
      Long: LongConstructor,
      NumberLong: LongConstructor, // Legacy name
      Int32: Int32Constructor,
      NumberInt: Int32Constructor, // Legacy name
      Double: DoubleConstructor,
      Timestamp: TimestampConstructor,
      Binary: BinaryConstructor,
      BSONRegExp: BSONRegExpConstructor,
      Code: CodeConstructor,
      DBRef: DBRefConstructor,
      MaxKey: MaxKeyConstructor,
      MinKey: MinKeyConstructor,
      Map: Map, // Native JavaScript Map for mongosh Map output
    };
  }

  /**
   * Normalizes mongosh syntax to valid JavaScript.
   * Handles:
   * - Single quotes to double quotes
   * - Unquoted keys
   * - Trailing commas
   * - MongoDB constructor calls
   * - Comments
   * - Map literals (Map(n) { key => value } to new Map([[key, value]]))
   *
   * @param {string} str - Raw mongosh output string
   * @returns {string} Normalized JavaScript syntax
   */
  static normalizeMongoShellSyntax(str) {
    let result = str;

    // Remove comments (both // and # style)
    result = result
      .replace(/^\s*\/\/.*$/gm, '')
      .replace(/^\s*#.*$/gm, '');

    // Convert Map literals: Map(n) { key => value, ... } to new Map([[key, value], ...])
    // This handles mongosh's Map output format from bulkWrite operations
    result = this.normalizeMapLiterals(result);

    // Convert single-quoted strings to double-quoted using a state machine.
    // This properly handles:
    // - Single-quoted strings with embedded double quotes (escape them)
    // - Double-quoted strings with embedded apostrophes (leave them alone)
    result = MongoshOutputParser.convertSingleToDoubleQuotes(result);

    // Quote unquoted keys (must be preceded by {, [, comma, or start of line)
    result = result.replace(
      /(^|[\{\[,]\s*)([a-zA-Z_$][\w$]*)(\s*:)/gm,
      '$1"$2"$3'
    );

    // Quote unquoted ellipsis used as property values (e.g., { _id: ... , count: ... })
    // This must come after key quoting but before trailing comma removal
    // Match: colon, optional whitespace, three dots, followed by comma, whitespace, or closing brace
    result = result.replace(
      /:\s*\.\.\.(\s*[,\}\]])/g,
      ': "..."$1'
    );

    // Quote standalone ellipsis in arrays (e.g., [ { ... }, ... ] where the last ... is an array element)
    // Match: line with only whitespace and ... that appears after a comma or opening bracket
    // This converts [ ..., ... ] to [ ..., "..." ]
    result = result.replace(
      /,(\s*)\.\.\./g,
      ',$1"..."'
    );

    // Remove trailing commas
    result = result
      .replace(/,(\s*[\}\]])/g, '$1');

    return result;
  }

  /**
   * Converts mongosh Map literal syntax to JavaScript Map constructor syntax.
   * Transforms: Map(n) { key => value, ... } to new Map([[key, value], ...])
   *
   * This is necessary because mongosh outputs Map objects in a literal format
   * that isn't valid JavaScript. The format appears in bulkWrite results with
   * verboseResults: true.
   *
   * @param {string} str - String potentially containing Map literals
   * @returns {string} String with Map literals converted to constructor syntax
   */
  static normalizeMapLiterals(str) {
    // Match Map(n) { ... } patterns, handling nested braces
    // We need to find the matching closing brace for each Map
    let result = str;
    const mapStartPattern = /Map\(\d+\)\s*\{/g;

    // Find all Map starts
    let match;
    const replacements = [];

    while ((match = mapStartPattern.exec(str)) !== null) {
      const startIndex = match.index;
      const contentStartIndex = match.index + match[0].length;

      // Find the matching closing brace
      let braceCount = 1;
      let endIndex = contentStartIndex;
      let inString = false;
      let stringChar = null;

      for (let i = contentStartIndex; i < str.length && braceCount > 0; i++) {
        const char = str[i];
        const prevChar = i > 0 ? str[i - 1] : null;

        // Track string boundaries
        if ((char === '"' || char === "'") && prevChar !== '\\') {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar) {
            inString = false;
            stringChar = null;
          }
        }

        if (!inString) {
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
        }

        if (braceCount === 0) {
          endIndex = i;
          break;
        }
      }

      const content = str.substring(contentStartIndex, endIndex);
      const fullMatch = str.substring(startIndex, endIndex + 1);

      // Handle empty maps
      if (!content.trim()) {
        replacements.push({ original: fullMatch, replacement: 'new Map([])' });
        continue;
      }

      // Split by commas that are not inside nested braces or brackets
      const entries = this.splitMapEntries(content);

      // Convert each "key => value" pair to "[key, value]"
      const arrayEntries = entries.map(entry => {
        const arrowMatch = entry.match(/^(.+?)\s*=>\s*(.+)$/s);
        if (arrowMatch) {
          const key = arrowMatch[1].trim();
          const value = arrowMatch[2].trim();
          return `[${key}, ${value}]`;
        }
        return entry; // Fallback if format doesn't match
      });

      replacements.push({
        original: fullMatch,
        replacement: `new Map([${arrayEntries.join(', ')}])`
      });
    }

    // Apply replacements in reverse order to maintain indices
    for (let i = replacements.length - 1; i >= 0; i--) {
      const { original, replacement } = replacements[i];
      result = result.replace(original, replacement);
    }

    return result;
  }

  /**
   * Converts single-quoted strings to double-quoted strings using a state machine.
   * Properly handles:
   * - Single-quoted strings containing double quotes (escapes them)
   * - Double-quoted strings containing apostrophes (leaves them unchanged)
   * - Escaped characters within strings
   *
   * @param {string} str - Input string with mixed quote styles
   * @returns {string} String with all single-quoted strings converted to double-quoted
   */
  static convertSingleToDoubleQuotes(str) {
    let result = '';
    let i = 0;

    while (i < str.length) {
      const char = str[i];

      if (char === '"') {
        // Start of a double-quoted string - copy it verbatim
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
            // End of double-quoted string
            break;
          }
          i++;
        }
        i++;
      } else if (char === "'") {
        // Start of a single-quoted string - convert to double-quoted
        result += '"';
        i++;
        while (i < str.length) {
          const innerChar = str[i];
          if (innerChar === '\\' && i + 1 < str.length) {
            // Escaped character - copy both chars
            result += innerChar;
            i++;
            result += str[i];
          } else if (innerChar === "'") {
            // End of single-quoted string
            break;
          } else if (innerChar === '"') {
            // Double quote inside single-quoted string - escape it
            result += '\\"';
          } else {
            result += innerChar;
          }
          i++;
        }
        result += '"';
        i++;
      } else {
        // Regular character - copy it
        result += char;
        i++;
      }
    }

    return result;
  }

  /**
   * Splits Map entry content by commas, respecting nested braces and brackets.
   * This ensures we don't split on commas inside nested objects or arrays.
   *
   * @param {string} content - The content inside Map(n) { ... }
   * @returns {string[]} Array of individual "key => value" entries
   */
  static splitMapEntries(content) {
    const entries = [];
    let current = '';
    let braceDepth = 0;
    let bracketDepth = 0;
    let inString = false;
    let stringChar = null;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      const prevChar = i > 0 ? content[i - 1] : null;

      // Track string boundaries
      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = null;
        }
      }

      if (!inString) {
        // Track brace and bracket depth
        if (char === '{') braceDepth++;
        if (char === '}') braceDepth--;
        if (char === '[') bracketDepth++;
        if (char === ']') bracketDepth--;

        // Split on comma only at depth 0
        if (char === ',' && braceDepth === 0 && bracketDepth === 0) {
          entries.push(current.trim());
          current = '';
          continue;
        }
      }

      current += char;
    }

    // Add the last entry
    if (current.trim()) {
      entries.push(current.trim());
    }

    return entries;
  }

  /**
   * Extracts individual document blocks from mongosh output.
   * Handles multiple consecutive objects by tracking brace/bracket depth.
   *
   * @param {string} output - Raw mongosh output string
   * @returns {string[]} Array of document block strings
   */
  static splitIntoDocumentBlocks(output) {
    const lines = output.trim().split('\n');
    const docBlocks = [];
    let currentBlock = [];
    let braceCount = 0;
    let bracketCount = 0;
    let inDocument = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Skip empty lines (standalone ellipsis are handled in normalization)
      if (!trimmedLine) {
        continue;
      }

      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      const openBrackets = (line.match(/\[/g) || []).length;
      const closeBrackets = (line.match(/\]/g) || []).length;

      // Start of a document
      if (!inDocument && (trimmedLine.startsWith('{') || trimmedLine.startsWith('['))) {
        inDocument = true;
        braceCount = 0;
        bracketCount = 0;
        currentBlock = [line];
      } else if (inDocument) {
        currentBlock.push(line);
      }

      if (inDocument) {
        braceCount += openBraces - closeBraces;
        bracketCount += openBrackets - closeBrackets;

        // Document complete when both counts reach zero
        if (braceCount === 0 && bracketCount === 0) {
          docBlocks.push(currentBlock.join('\n'));
          inDocument = false;
          currentBlock = [];
        }
      }
    }

    // Handle incomplete block
    if (currentBlock.length > 0) {
      docBlocks.push(currentBlock.join('\n'));
    }

    return docBlocks;
  }

  /**
   * Parses a single document block into a JavaScript object.
   *
   * @param {string} block - Document block string
   * @param {Object} context - Evaluation context with MongoDB constructors
   * @returns {*} Parsed JavaScript object/array
   * @throws {Error} If parsing fails
   */
  static parseDocumentBlock(block, context) {
    const normalized = this.normalizeMongoShellSyntax(block);

    try {
      // Wrap in parentheses to handle both objects and arrays
      return vm.runInNewContext('(' + normalized + ')', context);
    } catch (error) {
      throw new Error(
        `Failed to parse mongosh output block: ${error.message}\n` +
        `Block (first 200 chars): ${normalized.substring(0, 200)}`
      );
    }
  }

  /**
   * Parses mongosh output string into an array of JavaScript objects.
   * Main entry point for parsing mongosh test output.
   *
   * @param {string} output - Raw mongosh stdout output
   * @returns {Object} Parse result with success flag and data/error
   * @returns {boolean} returns.success - Whether parsing succeeded
   * @returns {Array} [returns.data] - Parsed objects array (if success)
   * @returns {Error} [returns.error] - Parse error (if failure)
   *
   * @example
   * const result = MongoshOutputParser.parse(stdout);
   * if (result.success) {
   *   console.log('Parsed objects:', result.data);
   * } else {
   *   console.error('Parse error:', result.error);
   * }
   */
  static parse(output) {
    if (!output || typeof output !== 'string') {
      return {
        success: false,
        error: new Error('Invalid output: expected non-empty string'),
      };
    }

    const context = this.createEvaluationContext();
    const blocks = this.splitIntoDocumentBlocks(output);
    const parsedObjects = [];

    try {
      for (const block of blocks) {
        if (!block.trim()) continue;

        const parsed = this.parseDocumentBlock(block, context);

        // If parsed result is an array, flatten it
        if (Array.isArray(parsed)) {
          parsedObjects.push(...parsed);
        } else {
          parsedObjects.push(parsed);
        }
      }

      return {
        success: true,
        data: parsedObjects,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  /**
   * Parses an expected output file containing mongosh-formatted output.
   * Detects standalone ellipsis markers for flexible field matching.
   *
   * @param {string} fileContent - Content of expected output file
   * @returns {Object} Parse result with success, data, and metadata
   * @returns {boolean} returns.success - Whether parsing succeeded
   * @returns {Array} [returns.data] - Parsed expected output (if success)
   * @returns {boolean} [returns.hasOmittedFields] - Whether global ellipsis detected
   * @returns {Error} [returns.error] - Parse error (if failure)
   */
  static parseExpectedOutput(fileContent) {
    const hasStandaloneEllipsis = /^\s*\.\.\.\s*$/m.test(fileContent);
    const parseResult = this.parse(fileContent);

    if (!parseResult.success) {
      return parseResult;
    }

    // If standalone ellipsis found, add global ellipsis marker to objects
    if (hasStandaloneEllipsis) {
      const dataWithEllipsis = parseResult.data.map(item => {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          return { ...item, '...': '...' };
        }
        return item;
      });

      return {
        success: true,
        data: dataWithEllipsis,
        hasOmittedFields: true,
      };
    }

    return {
      ...parseResult,
      hasOmittedFields: false,
    };
  }
}

module.exports = { MongoshOutputParser };

