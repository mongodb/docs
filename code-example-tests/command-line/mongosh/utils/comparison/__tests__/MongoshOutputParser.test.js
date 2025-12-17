const { MongoshOutputParser } = require('../MongoshOutputParser.js');

describe('MongoshOutputParser', () => {
  describe('parse', () => {
    test('should parse single object', () => {
      const input = `{
  name: 'Carl',
  vocation: 'ENGINEER'
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data).toEqual([
        { name: 'Carl', vocation: 'ENGINEER' }
      ]);
    });

    test('should parse multiple consecutive objects', () => {
      const input = `{
  name: 'Carl',
  vocation: 'ENGINEER'
}
{
  name: 'Olive',
  vocation: 'ENGINEER'
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toEqual({ name: 'Carl', vocation: 'ENGINEER' });
      expect(result.data[1]).toEqual({ name: 'Olive', vocation: 'ENGINEER' });
    });

    test('should handle ISODate constructor', () => {
      const input = `{
  name: 'Carl',
  dateofbirth: ISODate("1998-12-26T13:13:55.000Z")
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0].dateofbirth).toBeInstanceOf(Date);
    });

    test('should handle ObjectId constructor', () => {
      const input = `{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: 'test'
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0]._id.toString()).toBe('507f1f77bcf86cd799439011');
    });

    test('should handle comments', () => {
      const input = `// This is a comment
{
  name: 'Carl'
}
# Another comment
{
  name: 'Olive'
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
    });

    test('should handle trailing commas', () => {
      const input = `{
  name: 'Carl',
  vocation: 'ENGINEER',
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0]).toEqual({ name: 'Carl', vocation: 'ENGINEER' });
    });

    test('should handle empty Map objects', () => {
      const input = `{
  acknowledged: true,
  results: Map(0) {}
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0].results).toBeInstanceOf(Map);
      expect(result.data[0].results.size).toBe(0);
    });

    test('should handle Map objects with single entry', () => {
      const input = `{
  acknowledged: true,
  insertResults: Map(1) { 0 => { insertedId: ObjectId('507f1f77bcf86cd799439011') } }
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0].insertResults).toBeInstanceOf(Map);
      expect(result.data[0].insertResults.size).toBe(1);
      expect(result.data[0].insertResults.get(0)).toHaveProperty('insertedId');
      expect(result.data[0].insertResults.get(0).insertedId.toString()).toBe('507f1f77bcf86cd799439011');
    });

    test('should handle Map objects with multiple entries', () => {
      const input = `{
  acknowledged: true,
  insertResults: Map(2) {
    0 => { insertedId: ObjectId('507f1f77bcf86cd799439011') },
    1 => { insertedId: ObjectId('507f1f77bcf86cd799439012') }
  }
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0].insertResults).toBeInstanceOf(Map);
      expect(result.data[0].insertResults.size).toBe(2);
      expect(result.data[0].insertResults.get(0).insertedId.toString()).toBe('507f1f77bcf86cd799439011');
      expect(result.data[0].insertResults.get(1).insertedId.toString()).toBe('507f1f77bcf86cd799439012');
    });

    test('should handle bulkWrite verboseResults output format', () => {
      const input = `{
  acknowledged: true,
  insertedCount: 2,
  matchedCount: 1,
  modifiedCount: 1,
  deletedCount: 0,
  upsertedCount: 0,
  insertResults: Map(2) {
    0 => { insertedId: ObjectId('507f1f77bcf86cd799439011') },
    2 => { insertedId: ObjectId('507f1f77bcf86cd799439012') }
  },
  updateResults: Map(1) {
    1 => { matchedCount: 1, modifiedCount: 1, didUpsert: false }
  },
  deleteResults: Map(0) {}
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0]).toHaveProperty('acknowledged', true);
      expect(result.data[0]).toHaveProperty('insertedCount', 2);
      expect(result.data[0].insertResults).toBeInstanceOf(Map);
      expect(result.data[0].insertResults.size).toBe(2);
      expect(result.data[0].updateResults).toBeInstanceOf(Map);
      expect(result.data[0].updateResults.size).toBe(1);
      expect(result.data[0].deleteResults).toBeInstanceOf(Map);
      expect(result.data[0].deleteResults.size).toBe(0);
    });

    test('should handle strings with embedded apostrophes', () => {
      const input = `{
  consensus: "One of Hollywood's greatest critical and commercial successes."
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0].consensus).toBe("One of Hollywood's greatest critical and commercial successes.");
    });

    test('should handle strings with embedded quotes (like story titles)', () => {
      // This test reproduces the error from the hint test - the writer string contains
      // embedded double quotes which, after normalization, break the parser.
      const input = `{
  writers: [
    'Stephen King (short story "Rita Hayworth and Shawshank Redemption")',
    'Frank Darabont (screenplay)'
  ]
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0].writers[0]).toBe('Stephen King (short story "Rita Hayworth and Shawshank Redemption")');
    });

    test('should handle complex movie document like the hint test output', () => {
      // Exact sample from the hint test output file
      const input = `[
  {
    _id: ObjectId('573a1399f29313caabceeb20'),
    fullplot: 'Andy Dufresne is a young and successful banker whose life changes drastically.',
    imdb: { rating: 9.3, votes: 1521105, id: 111161 },
    year: 1994,
    genres: [ 'Crime', 'Drama' ],
    rated: 'R',
    title: 'The Shawshank Redemption',
    writers: [
      'Stephen King (short story "Rita Hayworth and Shawshank Redemption")',
      'Frank Darabont (screenplay)'
    ]
  }
]`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].title).toBe('The Shawshank Redemption');
    });

    test('should handle double-quoted strings containing apostrophes', () => {
      // This is the key failing case from the hint test:
      // When a string uses double quotes (because it contains apostrophes inside),
      // the single-quote-to-double-quote conversion regex incorrectly matches
      // apostrophes within the double-quoted string.
      const input = `{
  consensus: "One of Hollywood's greatest critical and commercial successes."
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0].consensus).toBe("One of Hollywood's greatest critical and commercial successes.");
    });

    test('should handle mix of single and double quoted strings with apostrophes', () => {
      // This reproduces the exact pattern from the hint test output file:
      // Some fields use single quotes, others use double quotes (containing apostrophes)
      const input = `{
  title: 'The Godfather: Part II',
  consensus: "Francis Ford Coppola's continuation of Mario Puzo's saga."
}`;

      const result = MongoshOutputParser.parse(input);

      expect(result.success).toBe(true);
      expect(result.data[0].title).toBe('The Godfather: Part II');
      expect(result.data[0].consensus).toBe("Francis Ford Coppola's continuation of Mario Puzo's saga.");
    });
  });

  describe('parseExpectedOutput', () => {
    test('should detect standalone ellipsis', () => {
      const input = `{
  name: 'Carl'
}
...
{
  name: 'Olive'
}`;

      const result = MongoshOutputParser.parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.hasOmittedFields).toBe(true);
      expect(result.data[0]['...']).toBe('...');
      expect(result.data[1]['...']).toBe('...');
    });

    test('should not add ellipsis when not present', () => {
      const input = `{
  name: 'Carl'
}`;

      const result = MongoshOutputParser.parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.hasOmittedFields).toBe(false);
      expect(result.data[0]).not.toHaveProperty('...');
    });

    test('should preserve ellipsis inside quoted strings', () => {
      // This tests that ellipsis inside string values are NOT treated as
      // truncation markers. The ",...'" pattern at the end of a string value
      // should remain intact after normalization.
      const input = `{
  plot: 'What do you love the most?", "What scares you the most?",...',
  title: 'Test Movie'
}`;

      const result = MongoshOutputParser.parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].plot).toBe(
        'What do you love the most?", "What scares you the most?",...'
      );
      expect(result.data[0].title).toBe('Test Movie');
    });

    test('should preserve ellipsis in double-quoted strings', () => {
      // Test with double-quoted strings containing ellipsis
      const input = `{
  description: "This is a long description that ends with...",
  name: 'Test'
}`;

      const result = MongoshOutputParser.parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].description).toBe(
        'This is a long description that ends with...'
      );
    });

    test('should handle multiple ellipsis patterns in one document', () => {
      // Complex case with ellipsis both inside strings and as markers
      const input = `{
  plot: 'The story continues...',
  summary: 'A tale of...',
  title: 'Movie'
}`;

      const result = MongoshOutputParser.parseExpectedOutput(input);

      expect(result.success).toBe(true);
      expect(result.data[0].plot).toBe('The story continues...');
      expect(result.data[0].summary).toBe('A tale of...');
      expect(result.data[0].title).toBe('Movie');
    });
  });
});

