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

