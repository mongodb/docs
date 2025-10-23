const {
  ContentAnalyzer,
  ContentType,
  ComparisonStrategy,
} = require('../comparison/ContentAnalyzer');
const fs = require('fs');
const path = require('path');

describe('ContentAnalyzer', () => {
  describe('detectType', () => {
    describe('string detection', () => {
      it('should detect pattern strings with ellipsis', () => {
        const result = ContentAnalyzer.detectType('{_id: "...", name: "test"}');
        expect(result).toBe(ContentType.PATTERN_STRING);
      });

      it('should detect pattern strings with truncated values', () => {
        const result = ContentAnalyzer.detectType('{message: "Hello..."}');
        expect(result).toBe(ContentType.PATTERN_STRING);
      });

      it('should detect multi-line text blocks', () => {
        const result = ContentAnalyzer.detectType('Line 1\nLine 2\nLine 3');
        expect(result).toBe(ContentType.TEXT_BLOCK);
      });

      it('should detect structured strings (JSON-like)', () => {
        const result = ContentAnalyzer.detectType('{"key": "value"}');
        expect(result).toBe(ContentType.STRUCTURED_STRING);
      });

      it('should detect structured strings with MongoDB syntax', () => {
        const result = ContentAnalyzer.detectType('{key: "value"}');
        expect(result).toBe(ContentType.STRUCTURED_STRING);
      });

      it('should detect plain strings', () => {
        const result = ContentAnalyzer.detectType('just a simple string');
        expect(result).toBe(ContentType.PLAIN_STRING);
      });

      it('should detect file paths', () => {
        // Create a temporary file
        const testDir = path.resolve(__dirname, '../../test-fixtures');
        const testFile = path.join(testDir, 'content-analyzer-test.txt');

        if (!fs.existsSync(testDir)) {
          fs.mkdirSync(testDir, { recursive: true });
        }
        fs.writeFileSync(testFile, 'test content');

        try {
          const result = ContentAnalyzer.detectType(testFile);
          expect(result).toBe(ContentType.FILE);
        } finally {
          fs.unlinkSync(testFile);
          if (fs.existsSync(testDir) && fs.readdirSync(testDir).length === 0) {
            fs.rmdirSync(testDir);
          }
        }
      });

      it('should not detect non-existent paths as files', () => {
        const result = ContentAnalyzer.detectType('/nonexistent/file.txt');
        expect(result).not.toBe(ContentType.FILE);
      });
    });

    describe('array detection', () => {
      it('should detect arrays', () => {
        const result = ContentAnalyzer.detectType([1, 2, 3]);
        expect(result).toBe(ContentType.ARRAY);
      });

      it('should detect empty arrays', () => {
        const result = ContentAnalyzer.detectType([]);
        expect(result).toBe(ContentType.ARRAY);
      });

      it('should detect arrays of objects', () => {
        const result = ContentAnalyzer.detectType([{ a: 1 }, { b: 2 }]);
        expect(result).toBe(ContentType.ARRAY);
      });
    });

    describe('object detection', () => {
      it('should detect objects', () => {
        const result = ContentAnalyzer.detectType({ a: 1, b: 2 });
        expect(result).toBe(ContentType.OBJECT);
      });

      it('should detect empty objects', () => {
        const result = ContentAnalyzer.detectType({});
        expect(result).toBe(ContentType.OBJECT);
      });

      it('should detect nested objects', () => {
        const result = ContentAnalyzer.detectType({ outer: { inner: 1 } });
        expect(result).toBe(ContentType.OBJECT);
      });

      it('should not treat null as object', () => {
        const result = ContentAnalyzer.detectType(null);
        expect(result).toBe(ContentType.PRIMITIVE);
      });
    });

    describe('primitive detection', () => {
      it('should detect numbers', () => {
        const result = ContentAnalyzer.detectType(42);
        expect(result).toBe(ContentType.PRIMITIVE);
      });

      it('should detect booleans', () => {
        expect(ContentAnalyzer.detectType(true)).toBe(ContentType.PRIMITIVE);
        expect(ContentAnalyzer.detectType(false)).toBe(ContentType.PRIMITIVE);
      });

      it('should detect null', () => {
        const result = ContentAnalyzer.detectType(null);
        expect(result).toBe(ContentType.PRIMITIVE);
      });

      it('should detect undefined', () => {
        const result = ContentAnalyzer.detectType(undefined);
        expect(result).toBe(ContentType.PRIMITIVE);
      });
    });
  });

  describe('analyzePatterns', () => {
    it('should detect ellipsis in strings', () => {
      const result = ContentAnalyzer.analyzePatterns('{_id: "..."}');
      expect(result.hasEllipsis).toBe(true);
    });

    it('should detect ellipsis in objects', () => {
      const result = ContentAnalyzer.analyzePatterns({ _id: '...', name: 'test' });
      expect(result.hasEllipsis).toBe(true);
    });

    it('should detect global ellipsis marker', () => {
      const result = ContentAnalyzer.analyzePatterns({ a: 1, '...': '...' });
      expect(result.hasEllipsis).toBe(true);
    });

    it('should detect JSON Lines format', () => {
      const content = '{"a": 1}\n{"b": 2}\n{"c": 3}';
      const result = ContentAnalyzer.analyzePatterns(content);
      expect(result.isJSONLines).toBe(true);
    });

    it('should detect MongoDB syntax', () => {
      const patterns = [
        'ObjectId("507f1f77bcf86cd799439011")',
        'ISODate("2023-01-01")',
        'NumberLong(123)',
        'Decimal128("123.45")',
      ];

      patterns.forEach((pattern) => {
        const result = ContentAnalyzer.analyzePatterns(pattern);
        expect(result.isMongoDBSyntax).toBe(true);
      });
    });

    it('should detect structured content', () => {
      const result = ContentAnalyzer.analyzePatterns('{"key": "value"}');
      expect(result.isStructured).toBe(true);
    });

    it('should mark objects as structured', () => {
      const result = ContentAnalyzer.analyzePatterns({ a: 1 });
      expect(result.isStructured).toBe(true);
    });
  });

  describe('selectStrategy', () => {
    it('should select FILE_TO_ANY for file inputs', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.FILE,
        ContentType.OBJECT
      );
      expect(strategy).toBe(ComparisonStrategy.FILE_TO_ANY);
    });

    it('should select PATTERN_TO_OBJECT for pattern strings vs objects', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.PATTERN_STRING,
        ContentType.OBJECT
      );
      expect(strategy).toBe(ComparisonStrategy.PATTERN_TO_OBJECT);
    });

    it('should select PATTERN_TO_OBJECT for pattern strings vs arrays', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.PATTERN_STRING,
        ContentType.ARRAY
      );
      expect(strategy).toBe(ComparisonStrategy.PATTERN_TO_OBJECT);
    });

    it('should select STRUCTURAL for object vs object', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.OBJECT,
        ContentType.OBJECT
      );
      expect(strategy).toBe(ComparisonStrategy.STRUCTURAL);
    });

    it('should select STRUCTURAL for array vs array', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.ARRAY,
        ContentType.ARRAY
      );
      expect(strategy).toBe(ComparisonStrategy.STRUCTURAL);
    });

    it('should select STRUCTURAL for structured string vs object', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.STRUCTURED_STRING,
        ContentType.OBJECT
      );
      expect(strategy).toBe(ComparisonStrategy.STRUCTURAL);
    });

    it('should select TEXT_WITH_NORMALIZATION for text blocks', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.TEXT_BLOCK,
        ContentType.TEXT_BLOCK
      );
      expect(strategy).toBe(ComparisonStrategy.TEXT_WITH_NORMALIZATION);
    });

    it('should select TEXT_WITH_NORMALIZATION for plain strings', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.PLAIN_STRING,
        ContentType.PLAIN_STRING
      );
      expect(strategy).toBe(ComparisonStrategy.TEXT_WITH_NORMALIZATION);
    });

    it('should select PRIMITIVE as default', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.PRIMITIVE,
        ContentType.PRIMITIVE
      );
      expect(strategy).toBe(ComparisonStrategy.PRIMITIVE);
    });
  });

  describe('edge cases', () => {
    it('should handle very long strings', () => {
      const longString = 'a'.repeat(10000);
      const result = ContentAnalyzer.detectType(longString);
      expect(result).toBe(ContentType.PLAIN_STRING);
    });

    it('should handle strings that look like paths but are not', () => {
      const fakePath = 'this/looks/like/path.txt';
      const result = ContentAnalyzer.detectType(fakePath);
      // Should not be FILE since it doesn't exist
      expect(result).not.toBe(ContentType.FILE);
    });

    it('should handle mixed content in strings', () => {
      const mixed = '{"key": "value"}\nSome text\n...';
      const result = ContentAnalyzer.detectType(mixed);
      // Should be TEXT_BLOCK due to newlines, even though it has JSON and ellipsis
      expect(result).toBe(ContentType.TEXT_BLOCK);
    });

    it('should handle arrays with ellipsis', () => {
      const arr = [1, '...', 3];
      const result = ContentAnalyzer.detectType(arr);
      expect(result).toBe(ContentType.ARRAY);

      const patterns = ContentAnalyzer.analyzePatterns(arr);
      expect(patterns.hasEllipsis).toBe(true);
    });
  });

  describe('MongoDB-specific patterns', () => {
    it('should detect ObjectId in strings', () => {
      const content = '{_id: ObjectId("507f1f77bcf86cd799439011")}';
      const result = ContentAnalyzer.analyzePatterns(content);
      expect(result.isMongoDBSyntax).toBe(true);
    });

    it('should detect Decimal128 in strings', () => {
      const content = '{price: Decimal128("19.99")}';
      const result = ContentAnalyzer.analyzePatterns(content);
      expect(result.isMongoDBSyntax).toBe(true);
    });

    it('should detect multiple MongoDB constructors', () => {
      const content = `{
        _id: ObjectId("..."),
        date: ISODate("2023-01-01"),
        count: NumberLong(1234)
      }`;
      const result = ContentAnalyzer.analyzePatterns(content);
      expect(result.isMongoDBSyntax).toBe(true);
    });
  });
});

