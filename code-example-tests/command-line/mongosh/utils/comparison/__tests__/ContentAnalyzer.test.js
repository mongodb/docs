const {
  ContentAnalyzer,
  ContentType,
  ComparisonStrategy,
} = require('../ContentAnalyzer');
const path = require('path');
const fs = require('fs');

describe('ContentAnalyzer', () => {
  describe('detectType()', () => {
    describe('String type detection', () => {
      it('should detect file paths that exist', () => {
        // Use a file we know exists in the test directory
        const testFile = path.resolve(__dirname, 'ContentAnalyzer.test.js');
        const type = ContentAnalyzer.detectType(testFile);
        expect(type).toBe(ContentType.FILE);
      });

      it('should detect relative file paths with baseDir', () => {
        const baseDir = path.resolve(__dirname, '../../../examples');
        // This file should exist based on the test we saw earlier
        const type = ContentAnalyzer.detectType(
          'indexes/simple/create-simple-index/output.sh',
          baseDir
        );
        expect(type).toBe(ContentType.FILE);
      });

      it('should detect plain strings without path separators', () => {
        const type = ContentAnalyzer.detectType('title_1');
        expect(type).toBe(ContentType.PLAIN_STRING);
      });

      it('should detect plain strings that are simple values', () => {
        expect(ContentAnalyzer.detectType('success')).toBe(ContentType.PLAIN_STRING);
        expect(ContentAnalyzer.detectType('42')).toBe(ContentType.PLAIN_STRING);
        expect(ContentAnalyzer.detectType('hello world')).toBe(ContentType.PLAIN_STRING);
      });

      it('should detect pattern strings with ellipsis', () => {
        const type = ContentAnalyzer.detectType('{_id: "...", name: "test"}');
        expect(type).toBe(ContentType.PATTERN_STRING);
      });

      it('should detect mongosh output strings', () => {
        const type = ContentAnalyzer.detectType('{ name: "Alice", age: 25 }');
        expect(type).toBe(ContentType.MONGOSH_OUTPUT_STRING);
      });

      it('should detect mongosh output with MongoDB constructors', () => {
        expect(ContentAnalyzer.detectType('ObjectId("507f1f77bcf86cd799439011")')).toBe(
          ContentType.MONGOSH_OUTPUT_STRING
        );
        expect(ContentAnalyzer.detectType('ISODate("2023-01-01T00:00:00Z")')).toBe(
          ContentType.MONGOSH_OUTPUT_STRING
        );
      });

      it('should detect multi-line text blocks', () => {
        const multiLine = 'line 1\nline 2\nline 3';
        expect(ContentAnalyzer.detectType(multiLine)).toBe(ContentType.TEXT_BLOCK);
      });

      it('should detect strings that look like file paths even if they do not exist', () => {
        const type = ContentAnalyzer.detectType('nonexistent/file.sh');
        // Should be detected as FILE even if it doesn't exist
        // This allows for helpful "file not found" error messages
        expect(type).toBe(ContentType.FILE);
      });
    });

    describe('Non-string type detection', () => {
      it('should detect arrays', () => {
        expect(ContentAnalyzer.detectType([1, 2, 3])).toBe(ContentType.ARRAY);
        expect(ContentAnalyzer.detectType([{ a: 1 }])).toBe(ContentType.ARRAY);
      });

      it('should detect objects', () => {
        expect(ContentAnalyzer.detectType({ name: 'test' })).toBe(ContentType.OBJECT);
        expect(ContentAnalyzer.detectType({ a: 1, b: 2 })).toBe(ContentType.OBJECT);
      });

      it('should detect primitives', () => {
        expect(ContentAnalyzer.detectType(42)).toBe(ContentType.PRIMITIVE);
        expect(ContentAnalyzer.detectType(true)).toBe(ContentType.PRIMITIVE);
        expect(ContentAnalyzer.detectType(null)).toBe(ContentType.PRIMITIVE);
        expect(ContentAnalyzer.detectType(undefined)).toBe(ContentType.PRIMITIVE);
      });
    });
  });

  describe('analyzePatterns()', () => {
    it('should detect ellipsis in strings', () => {
      const patterns = ContentAnalyzer.analyzePatterns('{_id: "...", name: "test"}');
      expect(patterns.hasEllipsis).toBe(true);
    });

    it('should detect ellipsis in objects', () => {
      const patterns = ContentAnalyzer.analyzePatterns({ _id: '...', name: 'test' });
      expect(patterns.hasEllipsis).toBe(true);
    });

    it('should detect ellipsis in nested objects', () => {
      const patterns = ContentAnalyzer.analyzePatterns({
        user: { _id: '...', name: 'test' },
      });
      expect(patterns.hasEllipsis).toBe(true);
    });

    it('should detect mongosh syntax in strings', () => {
      const patterns = ContentAnalyzer.analyzePatterns('ObjectId("507f1f77bcf86cd799439011")');
      expect(patterns.isMongoshSyntax).toBe(true);
    });

    it('should detect structured content', () => {
      const patterns = ContentAnalyzer.analyzePatterns({ name: 'test' });
      expect(patterns.isStructured).toBe(true);
    });

    it('should return false for plain strings without patterns', () => {
      const patterns = ContentAnalyzer.analyzePatterns('title_1');
      expect(patterns.hasEllipsis).toBe(false);
      expect(patterns.isMongoshSyntax).toBe(false);
      expect(patterns.isStructured).toBe(false);
    });
  });

  describe('selectStrategy()', () => {
    it('should select FILE_TO_ANY for file types', () => {
      const strategy = ContentAnalyzer.selectStrategy(ContentType.FILE, ContentType.ARRAY);
      expect(strategy).toBe(ComparisonStrategy.FILE_TO_ANY);
    });

    it('should select PATTERN_TO_PARSED for pattern strings', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.PATTERN_STRING,
        ContentType.OBJECT
      );
      expect(strategy).toBe(ComparisonStrategy.PATTERN_TO_PARSED);
    });

    it('should select MONGOSH_STRING_TO_PARSED for mongosh strings vs objects', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.MONGOSH_OUTPUT_STRING,
        ContentType.OBJECT
      );
      expect(strategy).toBe(ComparisonStrategy.MONGOSH_STRING_TO_PARSED);
    });

    it('should select STRUCTURAL for object to object comparison', () => {
      const strategy = ContentAnalyzer.selectStrategy(ContentType.OBJECT, ContentType.OBJECT);
      expect(strategy).toBe(ComparisonStrategy.STRUCTURAL);
    });

    it('should select TEXT_WITH_NORMALIZATION for plain string comparisons', () => {
      const strategy = ContentAnalyzer.selectStrategy(
        ContentType.PLAIN_STRING,
        ContentType.PLAIN_STRING
      );
      expect(strategy).toBe(ComparisonStrategy.TEXT_WITH_NORMALIZATION);
    });
  });
});

