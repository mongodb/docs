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
  });
});

