import { kernelCompareSync } from './KernelBridge.js';
import { Decimal128, ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';

/**
 * Comparison result used by the public Expect API. Two static factory methods
 * mirror the kernel's response shape: a successful match, or a structured
 * failure with path / expected / actual / message fields.
 */
class ComparisonResult {
  constructor(isMatch, path, expected, actual, message) {
    this.isMatch = isMatch;
    this.path = path;
    this.expected = expected;
    this.actual = actual;
    this.message = message;
  }
  static success() {
    return new ComparisonResult(true, '', undefined, undefined, '');
  }
  static failure(path, expected, actual, message) {
    return new ComparisonResult(false, path, expected, actual, message);
  }
  /** Human-readable summary suitable for AssertionError messages. */
  getErrorSummary() {
    if (this.isMatch) return '';
    if (this.path && this.path !== 'root') {
      return `${this.path}: ${this.message}`;
    }
    return this.message || 'Comparison failed';
  }
}

/**
 * Convert BSON wrappers and Date instances into JSON-friendly equivalents.
 * Walks arrays and plain objects recursively; primitives pass through.
 *
 * @param {*} value
 */
function normalizeItem(value) {
  if (value === null || value === undefined) return value;
  if (typeof value === 'bigint') return value.toString();
  if (value instanceof ObjectId) return value.toString();
  if (value instanceof Decimal128) return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(normalizeItem);
  if (typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = normalizeItem(v);
    return out;
  }
  return value;
}

/**
 * ComparisonEngine routes every comparison through the language-agnostic
 * comparison kernel (a native Go binary under tools/comparison-kernel/bin/).
 *
 * The bridge serialises the expected value into raw text the kernel can parse
 * and the actual value into a JSON-compatible payload. All ellipsis handling,
 * Extended-JSON collapsing, MongoDB-shell normalisation, and field-ignoring
 * happens inside the kernel so behaviour stays consistent across language
 * suites.
 */
class ComparisonEngine {
  /**
   * @param {*} expected - File path, MongoDB-syntax string, object, array,
   *   primitive, or BSON value.
   * @param {*} actual - Test result of any JSON-serialisable type.
   * @param {object} [options] - Comparison options.
   * @param {string} [options.arrayComparison] - 'ordered' or 'unordered'.
   * @param {string[]} [options.ignoreFields] - Field names to ignore.
   * @param {string} [options.baseDir] - Base directory for file-path resolution.
   * @returns {ComparisonResult}
   */
  static compare(expected, actual, options = {}) {
    const baseDir =
      options.baseDir || path.resolve(__dirname, '../../examples');

    let expectedContent;
    try {
      expectedContent = ComparisonEngine._serializeExpected(expected, baseDir);
    } catch (error) {
      return ComparisonResult.failure(
        'root',
        expected,
        actual,
        `Failed to resolve expected value: ${error.message}`
      );
    }

    const actualPayload = ComparisonEngine._serializeActual(actual);

    const kernelOptions = {};
    if ((options.arrayComparison || 'unordered') === 'ordered') {
      kernelOptions.comparisonType = 'ordered';
    }
    const ignoreFields =
      options.ignoreFields || options.ignoreFieldValues || [];
    if (ignoreFields.length > 0) {
      kernelOptions.ignoreFieldValues = ignoreFields;
    }

    let response;
    try {
      response = kernelCompareSync(
        expectedContent,
        actualPayload,
        kernelOptions
      );
    } catch (error) {
      return ComparisonResult.failure(
        'root',
        expected,
        actual,
        `comparison-kernel invocation failed: ${error.message}`
      );
    }

    if (response.isMatch) {
      return ComparisonResult.success();
    }

    if (response.error) {
      return ComparisonResult.failure('root', expected, actual, response.error);
    }

    const errors = response.errors || [];
    if (errors.length === 0) {
      return ComparisonResult.failure(
        'root',
        expected,
        actual,
        'Comparison failed'
      );
    }

    const message = errors
      .map((e) => {
        const prefix = e.path ? `${e.path}: ` : '';
        const values =
          e.expected !== undefined || e.actual !== undefined
            ? ` (Expected: ${e.expected ?? ''}, Actual: ${e.actual ?? ''})`
            : '';
        return `${prefix}${e.message}${values}`;
      })
      .join('\n');
    return ComparisonResult.failure(
      errors[0].path || 'root',
      errors[0].expected || String(expected),
      errors[0].actual || String(actual),
      message
    );
  }

  /**
   * Serialise an expected value into raw text the kernel can parse:
   *
   *   - existing file path → file contents
   *   - string starting with `{` or `[` → as-is (MongoDB-syntax content)
   *   - anything else → BSON-normalised and JSON-stringified
   *
   * @private
   */
  static _serializeExpected(expected, baseDir) {
    if (expected === undefined) return 'null';

    if (typeof expected === 'string') {
      const fullPath = path.isAbsolute(expected)
        ? expected
        : path.resolve(baseDir, expected);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        return fs.readFileSync(fullPath, 'utf8');
      }
      const trimmed = expected.trim();
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        return expected;
      }
      return JSON.stringify(expected);
    }

    return JSON.stringify(ComparisonEngine._normalize(expected));
  }

  /**
   * Serialise an actual value into a JSON-compatible payload for the kernel's
   * `actual` wire field. Always produces a top-level array so the kernel sees
   * a uniform document list whether the caller passed one value or many.
   *
   * @private
   */
  static _serializeActual(actual) {
    if (actual === undefined) return [null];
    const normalized = ComparisonEngine._normalize(actual);
    if (Array.isArray(normalized)) return normalized;
    return [normalized];
  }

  /**
   * Apply BSON/Date normalisation so types the kernel doesn't natively
   * understand (ObjectId, Decimal128, Date instances) are turned into their
   * canonical string form. Arrays and plain objects are walked recursively;
   * primitives pass through unchanged.
   *
   * @private
   */
  static _normalize(value) {
    if (Array.isArray(value)) return value.map(normalizeItem);
    if (value !== null && typeof value === 'object')
      return normalizeItem(value);
    return value;
  }

  /**
   * Run a schema-based validation through the kernel. The kernel checks
   * document count, required-field presence, and field-value equality on
   * BOTH expected and actual, mirroring the behaviour the Expect API has
   * always advertised for shouldResemble().withSchema().
   *
   * @param {*} expected - Expected value (file path, string, object, array).
   * @param {*} actual - Actual value (any JSON-serialisable type).
   * @param {object} schema - Schema definition.
   * @param {number} schema.count - Required document count.
   * @param {string[]} [schema.requiredFields=[]] - Fields that must exist on every document.
   * @param {object} [schema.fieldValues={}] - Field-value pairs that must match exactly.
   * @param {object} [options]
   * @param {string} [options.baseDir]
   * @returns {ComparisonResult}
   */
  static compareWithSchema(expected, actual, schema, options = {}) {
    const baseDir =
      options.baseDir || path.resolve(__dirname, '../../examples');

    let expectedContent;
    try {
      expectedContent = ComparisonEngine._serializeExpected(expected, baseDir);
    } catch (error) {
      return ComparisonResult.failure(
        'root',
        expected,
        actual,
        `Failed to resolve expected value: ${error.message}`
      );
    }

    const kernelOptions = {
      schema: {
        count: schema.count,
        requiredFields: schema.requiredFields || [],
        fieldValues: schema.fieldValues || {},
      },
    };

    let response;
    try {
      response = kernelCompareSync(
        expectedContent,
        ComparisonEngine._serializeActual(actual),
        kernelOptions
      );
    } catch (error) {
      return ComparisonResult.failure(
        'root',
        expected,
        actual,
        `comparison-kernel invocation failed: ${error.message}`
      );
    }

    if (response.isMatch) return ComparisonResult.success();

    const errors = response.errors || [];
    const message = errors
      .map((e) => (e.path ? `${e.path}: ${e.message}` : e.message))
      .join('\n');
    return ComparisonResult.failure(
      'root',
      expected,
      actual,
      message || response.error || 'Schema validation failed'
    );
  }
}

export { ComparisonEngine };
