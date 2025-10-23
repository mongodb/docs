const fs = require('fs');
const path = require('path');

/**
 * Content types that can be automatically detected
 */
const ContentType = {
  FILE: 'file',
  PATTERN_STRING: 'pattern_string',
  STRUCTURED_STRING: 'structured_string',
  TEXT_BLOCK: 'text_block',
  PLAIN_STRING: 'plain_string',
  ARRAY: 'array',
  OBJECT: 'object',
  PRIMITIVE: 'primitive',
};

/**
 * Comparison strategies based on content types
 */
const ComparisonStrategy = {
  FILE_TO_ANY: 'file_to_any',
  PATTERN_TO_OBJECT: 'pattern_to_object',
  STRUCTURAL: 'structural',
  TEXT_WITH_NORMALIZATION: 'text_with_normalization',
  PRIMITIVE: 'primitive',
};

/**
 * ContentAnalyzer provides intelligent content type detection and strategy selection
 * for comparing MongoDB documentation example outputs.
 */
class ContentAnalyzer {
  /**
   * Detects the content type of a value.
   *
   * @param {*} value - The value to analyze
   * @param {string} [baseDir] - Base directory for resolving relative file paths
   * @returns {string} The detected content type from ContentType enum
   *
   * @example
   * ContentAnalyzer.detectType('expected.txt') // 'file'
   * ContentAnalyzer.detectType('{_id: "..."}') // 'pattern_string'
   * ContentAnalyzer.detectType([{a: 1}]) // 'array'
   */
  static detectType(value, baseDir = null) {
    // Handle strings - most complex detection
    if (typeof value === 'string') {
      return this._detectStringType(value, baseDir);
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return ContentType.ARRAY;
    }

    // Handle objects (but not null)
    if (value && typeof value === 'object') {
      return ContentType.OBJECT;
    }

    // Everything else is primitive
    return ContentType.PRIMITIVE;
  }

  /**
   * Detects the specific type of a string value.
   *
   * @private
   * @param {string} str - The string to analyze
   * @param {string} [baseDir] - Base directory for resolving relative file paths
   * @returns {string} The detected string content type
   */
  static _detectStringType(str, baseDir) {
    // Check if it's a file path
    if (this._isFilePath(str, baseDir)) {
      return ContentType.FILE;
    }

    // Check if it's multi-line text (prioritize over ellipsis detection)
    if (str.includes('\n') || str.includes('\r')) {
      return ContentType.TEXT_BLOCK;
    }

    // Check for ellipsis patterns (... or fields with ...)
    if (this._containsEllipsisPattern(str)) {
      return ContentType.PATTERN_STRING;
    }

    // Check if it looks like structured data (JSON-like)
    if (this._looksLikeJSON(str)) {
      return ContentType.STRUCTURED_STRING;
    }

    // Default to plain string
    return ContentType.PLAIN_STRING;
  }

  /**
   * Checks if a string represents a valid file path.
   *
   * @private
   * @param {string} str - The string to check
   * @param {string} [baseDir] - Base directory for resolving relative paths
   * @returns {boolean} True if the string is a file path that exists
   */
  static _isFilePath(str, baseDir) {
    // Simple heuristics: if it contains path separators or common file extensions
    // and the file exists, it's likely a file path
    if (!str || str.length > 500) {
      return false; // Too long to be a reasonable file path
    }

    // Check for common file patterns
    const hasPathSeparator = str.includes('/') || str.includes('\\');
    const hasFileExtension = /\.[a-z]{2,4}$/i.test(str);

    if (!hasPathSeparator && !hasFileExtension) {
      return false;
    }

    // Try to resolve and check if file exists
    try {
      let fullPath = str;
      if (baseDir && !path.isAbsolute(str)) {
        fullPath = path.resolve(baseDir, str);
      }
      return fs.existsSync(fullPath);
    } catch {
      return false;
    }
  }

  /**
   * Checks if a string contains ellipsis patterns.
   *
   * @private
   * @param {string} str - The string to check
   * @returns {boolean} True if the string contains ... patterns
   */
  static _containsEllipsisPattern(str) {
    // Check for standalone ... or ... within quotes
    return str.includes('...') || /["']\.\.\.["']/.test(str);
  }

  /**
   * Checks if a string looks like JSON or MongoDB document syntax.
   *
   * @private
   * @param {string} str - The string to check
   * @returns {boolean} True if the string appears to be structured data
   */
  static _looksLikeJSON(str) {
    const trimmed = str.trim();

    // Check if it starts with { or [ (object or array syntax)
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      return true;
    }

    // Check for key-value patterns common in JSON/MongoDB syntax
    if (/[{,]\s*[a-zA-Z_$][\w$]*\s*:/.test(str)) {
      return true;
    }

    return false;
  }

  /**
   * Analyzes patterns in the content to provide additional metadata.
   *
   * @param {*} content - The content to analyze
   * @returns {Object} Pattern analysis information
   * @returns {boolean} returns.hasEllipsis - Whether content contains ellipsis patterns
   * @returns {boolean} returns.isJSONLines - Whether content looks like JSON Lines format
   * @returns {boolean} returns.isMongoDBSyntax - Whether content uses MongoDB syntax
   * @returns {boolean} returns.isStructured - Whether content is structured data
   */
  static analyzePatterns(content) {
    const result = {
      hasEllipsis: false,
      isJSONLines: false,
      isMongoDBSyntax: false,
      isStructured: false,
    };

    if (typeof content === 'string') {
      result.hasEllipsis = this._containsEllipsisPattern(content);
      result.isJSONLines = this._looksLikeJSONLines(content);
      result.isMongoDBSyntax = this._looksLikeMongoDBSyntax(content);
      result.isStructured = this._looksLikeJSON(content);
    } else if (typeof content === 'object' && content !== null) {
      result.isStructured = true;
      result.hasEllipsis = this._hasEllipsisInObject(content);
    }

    return result;
  }

  /**
   * Checks if content looks like JSON Lines format (multiple JSON objects, one per line).
   *
   * @private
   * @param {string} str - The string to check
   * @returns {boolean} True if it looks like JSON Lines
   */
  static _looksLikeJSONLines(str) {
    const lines = str.split('\n').filter(line => line.trim());
    if (lines.length < 2) return false;

    // Check if multiple lines start with { or [
    const jsonLineCount = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed.startsWith('{') || trimmed.startsWith('[');
    }).length;

    return jsonLineCount >= 2;
  }

  /**
   * Checks if content uses MongoDB-specific syntax.
   *
   * @private
   * @param {string} str - The string to check
   * @returns {boolean} True if it contains MongoDB syntax
   */
  static _looksLikeMongoDBSyntax(str) {
    // Check for MongoDB-specific constructors
    const mongoPatterns = [
      /ObjectId\s*\(/,
      /ISODate\s*\(/,
      /NumberLong\s*\(/,
      /NumberDecimal\s*\(/,
      /Decimal128\s*\(/,
      /BinData\s*\(/,
    ];

    return mongoPatterns.some(pattern => pattern.test(str));
  }

  /**
   * Recursively checks if an object contains ellipsis patterns.
   *
   * @private
   * @param {Object} obj - The object to check
   * @returns {boolean} True if ellipsis patterns are found
   */
  static _hasEllipsisInObject(obj) {
    if (obj === '...') return true;
    if (typeof obj === 'string' && obj.includes('...')) return true;

    if (Array.isArray(obj)) {
      return obj.some(item => this._hasEllipsisInObject(item));
    }

    if (typeof obj === 'object' && obj !== null) {
      if (obj['...'] === '...') return true;
      return Object.values(obj).some(value => this._hasEllipsisInObject(value));
    }

    return false;
  }

  /**
   * Selects the appropriate comparison strategy based on content types.
   *
   * @param {string} expectedType - Content type of expected value
   * @param {string} actualType - Content type of actual value
   * @param {Object} patterns - Pattern analysis from analyzePatterns()
   * @returns {string} The comparison strategy to use
   */
  static selectStrategy(expectedType, actualType, patterns = {}) {
    // If expected is a file, load it and route to appropriate strategy
    if (expectedType === ContentType.FILE) {
      return ComparisonStrategy.FILE_TO_ANY;
    }

    // If expected is a pattern string and actual is structured, use pattern matching
    if (expectedType === ContentType.PATTERN_STRING &&
        (actualType === ContentType.OBJECT || actualType === ContentType.ARRAY)) {
      return ComparisonStrategy.PATTERN_TO_OBJECT;
    }

    // Both are structured types (arrays or objects) - use structural comparison
    if ((expectedType === ContentType.ARRAY || expectedType === ContentType.OBJECT ||
         expectedType === ContentType.STRUCTURED_STRING) &&
        (actualType === ContentType.ARRAY || actualType === ContentType.OBJECT)) {
      return ComparisonStrategy.STRUCTURAL;
    }

    // Both are text types - use text comparison with normalization
    if ((expectedType === ContentType.TEXT_BLOCK || expectedType === ContentType.PLAIN_STRING) &&
        (actualType === ContentType.TEXT_BLOCK || actualType === ContentType.PLAIN_STRING)) {
      return ComparisonStrategy.TEXT_WITH_NORMALIZATION;
    }

    // Default to primitive comparison
    return ComparisonStrategy.PRIMITIVE;
  }
}

module.exports = {
  ContentAnalyzer,
  ContentType,
  ComparisonStrategy,
};

