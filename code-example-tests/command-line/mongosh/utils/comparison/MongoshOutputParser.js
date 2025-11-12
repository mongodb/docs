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

    // Convert single-quoted strings to double-quoted
    result = result.replace(/'([^']*)'/g, (match, content) => {
      const escapedContent = content.replace(/"/g, '\\"');
      return `"${escapedContent}"`;
    });

    // Quote unquoted keys (must be preceded by {, [, comma, or start of line)
    result = result.replace(
      /(^|[\{\[,]\s*)([a-zA-Z_$][\w$]*)(\s*:)/gm,
      '$1"$2"$3'
    );

    // Remove trailing commas
    result = result
      .replace(/,(\s*[\}\]])/g, '$1');

    return result;
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

      // Skip empty lines and standalone ellipsis markers
      if (!trimmedLine || trimmedLine === '...') {
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

