/**
 * Tests for BSON type parsing in fileParser.js.
 * Validates that expected output files containing various BSON types
 * can be parsed correctly for comparison.
 */

const { parseExpectedOutput } = require('../comparison/fileParser');

describe('fileParser BSON Type Support', () => {
  describe('Binary type and static methods', () => {
    test('should parse Binary.fromInt8Array with Int8Array', () => {
      // This pattern appears in $convert aggregation output when converting
      // arrays of integers to binData (e.g., for vector embeddings)
      const input = `[
  {
    convertedVector: Binary.fromInt8Array(new Int8Array([0,1,0,10]))
  }
]`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      const binary = result.data[0].convertedVector;
      expect(binary).toBeDefined();
      expect(binary.constructor.name).toBe('Binary');
    });

    test('should parse Binary.fromFloat32Array with Float32Array', () => {
      const input = `{
  vectorData: Binary.fromFloat32Array(new Float32Array([1.5, 2.5, 3.5]))
}`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      const binary = result.data[0].vectorData;
      expect(binary).toBeDefined();
      expect(binary.constructor.name).toBe('Binary');
    });

    test('should parse Binary.createFromBase64', () => {
      const input = `{
  data: Binary.createFromBase64("SGVsbG8gV29ybGQ=", 0)
}`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      const binary = result.data[0].data;
      expect(binary).toBeDefined();
      expect(binary.constructor.name).toBe('Binary');
    });

    test('should parse Binary.createFromHexString', () => {
      const input = `{
  data: Binary.createFromHexString("48656c6c6f", 0)
}`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      const binary = result.data[0].data;
      expect(binary).toBeDefined();
      expect(binary.constructor.name).toBe('Binary');
    });
  });

  describe('Numeric BSON types', () => {
    test('should parse Long/NumberLong', () => {
      const input = `{ count: Long("9223372036854775807") }`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].count.constructor.name).toBe('Long');
    });

    test('should parse NumberLong legacy syntax', () => {
      const input = `{ count: NumberLong("12345") }`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].count.constructor.name).toBe('Long');
    });

    test('should parse Int32/NumberInt', () => {
      const input = `{ value: Int32(42) }`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].value.constructor.name).toBe('Int32');
    });

    test('should parse Double', () => {
      const input = `{ price: Double(19.99) }`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].price.constructor.name).toBe('Double');
    });

    test('should parse Decimal128/NumberDecimal', () => {
      const input = `{ amount: Decimal128("123.456") }`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].amount.constructor.name).toBe('Decimal128');
    });
  });

  describe('Other BSON types', () => {
    test('should parse Timestamp', () => {
      const input = `{ ts: Timestamp({ t: 1234567890, i: 1 }) }`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].ts.constructor.name).toBe('Timestamp');
    });

    test('should parse BSONRegExp', () => {
      const input = `{ pattern: BSONRegExp("test.*", "i") }`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].pattern.constructor.name).toBe('BSONRegExp');
    });

    test('should parse MaxKey and MinKey', () => {
      const input = `{ max: MaxKey(), min: MinKey() }`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].max.constructor.name).toBe('MaxKey');
      expect(result.data[0].min.constructor.name).toBe('MinKey');
    });

    test('should parse ISODate (alias for Date)', () => {
      const input = `{ created: ISODate("2024-01-15T10:30:00.000Z") }`;

      const result = parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].created).toBeInstanceOf(Date);
    });
  });
});
