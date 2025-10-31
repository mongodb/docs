const Expect = require('../Expect');

describe('Expect API', () => {
  describe('basic comparison', () => {
    test('should match identical single objects', () => {
      const actual = `{ name: 'Carl', vocation: 'ENGINEER' }`;
      const expected = [{ name: 'Carl', vocation: 'ENGINEER' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should match multiple objects', () => {
      const actual = `{ name: 'Carl' }
{ name: 'Olive' }`;
      const expected = [
        { name: 'Carl' },
        { name: 'Olive' }
      ];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should throw on mismatch', () => {
      const actual = `{ name: 'Carl' }`;
      const expected = [{ name: 'Olive' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).toThrow();
    });
  });

  describe('ellipsis patterns', () => {
    test('should match with property-level ellipsis', () => {
      const actual = `{ _id: '507f1f77bcf86cd799439011', name: 'Carl' }`;
      const expected = [{ _id: '...', name: 'Carl' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should match with object-level ellipsis', () => {
      const actual = `{ name: 'Carl', age: 30, city: 'NYC' }`;
      const expected = [{ name: 'Carl', '...': '...' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('ignored fields', () => {
    test('should ignore specified fields', () => {
      const actual = `{ _id: '507f1f77bcf86cd799439011', name: 'Carl' }`;
      const expected = [{ _id: 'different-id', name: 'Carl' }];

      expect(() => {
        Expect.that(actual)
          .withIgnoredFields('_id')
          .shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('array comparison modes', () => {
    test('should use unordered comparison by default', () => {
      const actual = `{ name: 'Carl' }
{ name: 'Olive' }`;
      const expected = [
        { name: 'Olive' },
        { name: 'Carl' }
      ];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should enforce order with withOrderedSort', () => {
      const actual = `{ name: 'Carl' }
{ name: 'Olive' }`;
      const expected = [
        { name: 'Olive' },
        { name: 'Carl' }
      ];

      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch(expected);
      }).toThrow();
    });

    test('should match ordered arrays correctly', () => {
      const actual = `{ name: 'Carl' }
{ name: 'Olive' }`;
      const expected = [
        { name: 'Carl' },
        { name: 'Olive' }
      ];

      expect(() => {
        Expect.that(actual)
          .withOrderedSort()
          .shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('MongoDB types', () => {
    test('should handle ISODate', () => {
      const actual = `{ date: ISODate("2023-01-01T00:00:00.000Z") }`;
      const expected = [{ date: new Date("2023-01-01T00:00:00.000Z") }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });

    test('should handle ObjectId', () => {
      const actual = `{ _id: ObjectId("507f1f77bcf86cd799439011") }`;
      // Use ellipsis for ObjectId comparison
      const expected = [{ _id: '...' }];

      expect(() => {
        Expect.that(actual).shouldMatch(expected);
      }).not.toThrow();
    });
  });

  describe('method chaining', () => {
    test('should chain multiple options', () => {
      const actual = `{ _id: '123', name: 'Carl', age: 30 }
{ _id: '456', name: 'Olive', age: 25 }`;
      const expected = [
        { _id: 'ignored', name: 'Olive', '...': '...' },
        { _id: 'ignored', name: 'Carl', '...': '...' }
      ];

      expect(() => {
        Expect.that(actual)
          .withIgnoredFields('_id')
          .withUnorderedSort()
          .shouldMatch(expected);
      }).not.toThrow();
    });
  });
});


