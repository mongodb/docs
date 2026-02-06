const fs = require('fs');
const path = require('path');

/**
 * Content types that can be automatically detected
 */
const ContentType = {
  FILE: 'file',
  PATTERN_STRING: 'pattern_string',
  MONGOSH_OUTPUT_STRING: 'mongosh_output_string',
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
  PATTERN_TO_PARSED: 'pattern_to_parsed',
  MONGOSH_STRING_TO_PARSED: 'mongosh_string_to_parsed',
  STRUCTURAL: 'structural',
  TEXT_WITH_NORMALIZATION: 'text_with_normalization',
  PRIMITIVE: 'primitive',
};

/**
 * ContentAnalyzer provides intelligent content type detection and strategy selection
 * for comparing MongoDB Shell (mongosh) documentation example outputs.
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
   * ContentAnalyzer.detectType('expected.sh') // 'file'
   * ContentAnalyzer.detectType('{_id: "..."}') // 'pattern_string'
   * ContentAnalyzer.detectType([{a: 1}]) // 'array'
   * ContentAnalyzer.detectType('title_1') // 'plain_string'
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
    // Check if it's a file path (must check first before other patterns)
    if (this._isFilePath(str, baseDir)) {
      return ContentType.FILE;
    }

    // Check if it's multi-line text (prioritize over other patterns)
    if (str.includes('\n') || str.includes('\r')) {
      return ContentType.TEXT_BLOCK;
    }

    // Check for ellipsis patterns (... or fields with ...)
    if (this._containsEllipsisPattern(str)) {
      return ContentType.PATTERN_STRING;
    }

    // Check if it looks like mongosh output (JSON-like or MongoDB syntax)
    if (this._looksLikeMongoshOutput(str)) {
      return ContentType.MONGOSH_OUTPUT_STRING;
    }

    // Default to plain string (e.g., "title_1", "success", "42")
    return ContentType.PLAIN_STRING;
  }

  /**
   * Checks if a string represents a file path.
   * Returns true if the string looks like a file path (contains path separators
   * or file extensions) OR if the file exists.
   *
   * @private
   * @param {string} str - The string to check
   * @param {string} [baseDir] - Base directory for resolving relative paths
   * @returns {boolean} True if the string looks like a file path
   */
  static _isFilePath(str, baseDir) {
    // Simple heuristics: if it contains path separators or common file extensions
    if (!str || str.length > 500) {
      return false; // Too long to be a reasonable file path
    }

    // Check for common file patterns
    const hasPathSeparator = str.includes('/') || str.includes('\\');
    const hasFileExtension = /\.(sh|js|json|txt|md)$/i.test(str);

    // If it has path separators or file extensions, treat it as a file path
    // (even if it doesn't exist - this allows for helpful "file not found" errors)
    if (hasPathSeparator || hasFileExtension) {
      return true;
    }

    // Also check if file exists (for cases without obvious path indicators)
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
   * Checks if a string looks like mongosh output (JSON or MongoDB document syntax).
   *
   * @private
   * @param {string} str - The string to check
   * @returns {boolean} True if the string appears to be mongosh output
   */
  static _looksLikeMongoshOutput(str) {
    const trimmed = str.trim();

    // Check if it starts with { or [ (object or array syntax)
    if (
      (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))
    ) {
      return true;
    }

    // Check for MongoDB-specific constructors
    const mongoPatterns = [
      /ObjectId\s*\(/,
      /ISODate\s*\(/,
      /NumberLong\s*\(/,
      /NumberDecimal\s*\(/,
      /Decimal128\s*\(/,
      /BinData\s*\(/,
    ];

    if (mongoPatterns.some((pattern) => pattern.test(str))) {
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
   * @returns {boolean} returns.isMongoshSyntax - Whether content uses MongoDB syntax
   * @returns {boolean} returns.isStructured - Whether content is structured data
   */
  static analyzePatterns(content) {
    const result = {
      hasEllipsis: false,
      isMongoshSyntax: false,
      isStructured: false,
    };

    if (typeof content === 'string') {
      result.hasEllipsis = this._containsEllipsisPattern(content);
      result.isMongoshSyntax = this._looksLikeMongoshOutput(content);
      result.isStructured = this._looksLikeMongoshOutput(content);
    } else if (typeof content === 'object' && content !== null) {
      result.isStructured = true;
      result.hasEllipsis = this._hasEllipsisInObject(content);
    }

    return result;
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
      return obj.some((item) => this._hasEllipsisInObject(item));
    }

    if (typeof obj === 'object' && obj !== null) {
      if (obj['...'] === '...') return true;
      return Object.values(obj).some((value) =>
        this._hasEllipsisInObject(value)
      );
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

    // If expected is a pattern string, parse and compare
    if (expectedType === ContentType.PATTERN_STRING) {
      return ComparisonStrategy.PATTERN_TO_PARSED;
    }

    // If expected is mongosh output string and actual is structured, parse and compare
    if (
      expectedType === ContentType.MONGOSH_OUTPUT_STRING &&
      (actualType === ContentType.OBJECT || actualType === ContentType.ARRAY)
    ) {
      return ComparisonStrategy.MONGOSH_STRING_TO_PARSED;
    }

    // If expected is structured (object/array) and actual is a mongosh string, parse actual and compare
    if (
      (expectedType === ContentType.ARRAY || expectedType === ContentType.OBJECT) &&
      (actualType === ContentType.MONGOSH_OUTPUT_STRING ||
        actualType === ContentType.TEXT_BLOCK ||
        actualType === ContentType.PLAIN_STRING)
    ) {
      return ComparisonStrategy.STRUCTURAL;
    }

    // Both are structured types (arrays or objects) - use structural comparison
    if (
      (expectedType === ContentType.ARRAY || expectedType === ContentType.OBJECT) &&
      (actualType === ContentType.ARRAY || actualType === ContentType.OBJECT)
    ) {
      return ComparisonStrategy.STRUCTURAL;
    }

    // Both are text types - use text comparison with normalization
    if (
      (expectedType === ContentType.TEXT_BLOCK ||
        expectedType === ContentType.PLAIN_STRING) &&
      (actualType === ContentType.TEXT_BLOCK ||
        actualType === ContentType.PLAIN_STRING ||
        actualType === ContentType.MONGOSH_OUTPUT_STRING)
    ) {
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

