const { areObjectsEqual } = require('../areObjectsEqual');

// Tests for ellipsis, truncation, and omission logic in areObjectsEqual

describe('areObjectsEqual - ellipsis/truncation/omission support', () => {
  it('matches nested property-level ellipsis', () => {
    const expected = { a: { b: '...' } };
    expect(areObjectsEqual(expected, { a: { b: 123 } }, {})).toBe(true);
    expect(areObjectsEqual(expected, { a: { b: { x: 1 } } }, {})).toBe(
      true
    );
    expect(areObjectsEqual(expected, { a: { b: [1, 2, 3] } }, {})).toBe(
      true
    );
  });

  it('matches nested array ellipsis', () => {
    const expected = { a: [1, '...', 4] };
    expect(areObjectsEqual(expected, { a: [1, 2, 3, 4] }, {})).toBe(
      true
    );
    expect(areObjectsEqual(expected, { a: [1, 4] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { a: [1, 2, 4] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { a: [1, 2, 3] }, {})).toBe(false);
  });

  it('matches deeply nested truncated string', () => {
    const expected = { a: { b: { c: 'prefix...' } } };
    expect(
      areObjectsEqual(expected, { a: { b: { c: 'prefix123' } } }, {})
    ).toBe(true);
    expect(
      areObjectsEqual(expected, { a: { b: { c: 'prefix' } } }, {})
    ).toBe(true);
    expect(
      areObjectsEqual(expected, { a: { b: { c: 'other' } } }, {})
    ).toBe(false);
  });

  it('matches nested object ellipsis', () => {
    const expected = { a: { '...': '...' } };
    expect(areObjectsEqual(expected, { a: { x: 1, y: 2 } }, {})).toBe(
      true
    );
    expect(areObjectsEqual(expected, { a: {} }, {})).toBe(true);
    expect(
      areObjectsEqual(expected, { a: { nested: { z: 5 } } }, {})
    ).toBe(true);
  });

  it('matches any object when expected is { ...: "..." }', () => {
    const expected = { value: { '...': '...' } };
    expect(areObjectsEqual(expected, { value: {} }, {})).toBe(true);
    expect(
      areObjectsEqual(expected, { value: { a: 1, b: 2 } }, {})
    ).toBe(true);
    expect(
      areObjectsEqual(expected, { value: { nested: { x: 1 } } }, {})
    ).toBe(true);
  });

  it('matches any sub-object when property is { ...: "..." }', () => {
    const expected = { a: 1, b: { '...': '...' } };
    expect(
      areObjectsEqual(expected, { a: 1, b: { x: 2, y: 3 } }, {})
    ).toBe(true);
    expect(areObjectsEqual(expected, { a: 1, b: {} }, {})).toBe(true);
    expect(
      areObjectsEqual(expected, { a: 1, b: { nested: { z: 5 } } }, {})
    ).toBe(true);
  });

  it('does not match non-objects when expected is { ...: "..." }', () => {
    const expected = { value: { '...': '...' } };
    expect(areObjectsEqual(expected, { value: 42 }, {})).toBe(false);
    expect(areObjectsEqual(expected, { value: 'string' }, {})).toBe(
      false
    );
    expect(areObjectsEqual(expected, { value: [1, 2, 3] }, {})).toBe(
      false
    );
    expect(areObjectsEqual(expected, { value: null }, {})).toBe(false);
  });

  it('matches when expected array is only ["..."] (matches any array)', () => {
    const expected = { arr: ['...'] };
    expect(areObjectsEqual(expected, { arr: [] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { arr: [1, 2, 3] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { arr: ['a', 'b', 'c'] }, {})).toBe(
      true
    );
  });

  it('matches when expected array has ellipsis as prefix', () => {
    const expected = { arr: ['...', 3, 4] };
    expect(areObjectsEqual(expected, { arr: [1, 2, 3, 4] }, {})).toBe(
      true
    );
    expect(areObjectsEqual(expected, { arr: [0, 3, 4] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { arr: [3, 4] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { arr: [1, 2, 3] }, {})).toBe(
      false
    );
  });

  it('matches when expected array has ellipsis as infix', () => {
    const expected = { arr: [1, '...', 4] };
    expect(areObjectsEqual(expected, { arr: [1, 2, 3, 4] }, {})).toBe(
      true
    );
    expect(areObjectsEqual(expected, { arr: [1, 4] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { arr: [1, 2, 4] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { arr: [1, 2, 3] }, {})).toBe(
      false
    );
  });

  it('matches when expected array has ellipsis as suffix', () => {
    const expected = { arr: [1, 2, '...'] };
    expect(areObjectsEqual(expected, { arr: [1, 2] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { arr: [1, 2, 3, 4] }, {})).toBe(
      true
    );
    expect(areObjectsEqual(expected, { arr: [1, 2, 3] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { arr: [1] }, {})).toBe(false);
  });

  it('matches when expected array has multiple ellipsis', () => {
    const expected = { arr: ['...', 2, '...', 4, '...'] };
    expect(areObjectsEqual(expected, { arr: [0, 2, 3, 4, 5] }, {})).toBe(
      true
    );
    expect(areObjectsEqual(expected, { arr: [2, 4] }, {})).toBe(true);
    expect(areObjectsEqual(expected, { arr: [0, 2, 4, 5] }, {})).toBe(
      true
    );
    expect(areObjectsEqual(expected, { arr: [0, 2, 3, 5] }, {})).toBe(
      false
    );
  });

  it('matches nested arrays with ellipsis', () => {
    const expected = { arr: [[1, '...'], '...'] };
    expect(
      areObjectsEqual(
        expected,
        {
          arr: [
            [1, 2, 3],
            [4, 5],
          ],
        },
        {},
        false
      )
    ).toBe(true);
    expect(
      areObjectsEqual(expected, { arr: [[1], [4, 5], [6]] }, {})
    ).toBe(true);
    expect(areObjectsEqual(expected, { arr: [[1, 2], [3]] }, {})).toBe(
      true
    );
    expect(
      areObjectsEqual(
        expected,
        {
          arr: [
            [2, 3],
            [4, 5],
          ],
        },
        {},
        false
      )
    ).toBe(false);
  });

  it('fails when actual does not match expected with ellipsis', () => {
    const expected = { arr: [1, '...', 4] };
    expect(areObjectsEqual(expected, { arr: [2, 3, 4] }, {})).toBe(
      false
    );
    expect(areObjectsEqual(expected, { arr: [1, 2, 3] }, {})).toBe(
      false
    );
    expect(areObjectsEqual(expected, { arr: [1, 2] }, {})).toBe(false);
  });

  it('matches when expected has omitted fields (global ...)', () => {
    const expected = {
      _id: '...',
      plot: 'A young man is accidentally sent 30 years into the past...',
      genres: ['Adventure', 'Comedy', 'Sci-Fi'],
      title: 'Back to the Future',
      '...': '...' // Use explicit ellipsis pattern instead of parameter
    };
    const actual = {
      _id: '507f1f77bcf86cd799439011',
      plot: 'A young man is accidentally sent 30 years into the past by his eccentric inventor friend...',
      genres: ['Adventure', 'Comedy', 'Sci-Fi'],
      director: 'Robert Zemeckis',
      title: 'Back to the Future',
    };
    expect(
      areObjectsEqual(
        expected,
        actual,
        { allowOmittedFieldsWithEllipsis: true }
      )
    ).toBe(true);
  });

  it('fails if actual has extra keys and no global ... in expected', () => {
    const expected = {
      _id: '...',
      plot: 'A young man is accidentally sent 30 years into the past...',
      genres: ['Adventure', 'Comedy', 'Sci-Fi'],
      title: 'Back to the Future',
    };
    const actual = {
      _id: '507f1f77bcf86cd799439011',
      plot: 'A young man is accidentally sent 30 years into the past by his eccentric inventor friend...',
      genres: ['Adventure', 'Comedy', 'Sci-Fi'],
      director: 'Robert Zemeckis', // extra key
      title: 'Back to the Future',
    };
    expect(
      areObjectsEqual(
        expected,
        actual,
        { allowOmittedFieldsWithEllipsis: false }
      )
    ).toBe(false);
  });

  it('matches when a value is truncated with ...', () => {
    const expected = {
      plot: 'A young man is accidentally sent 30 years into the past...',
    };
    const actual = {
      plot: 'A young man is accidentally sent 30 years into the past by his eccentric inventor friend...',
    };
    expect(
      areObjectsEqual(
        expected,
        actual,
        { allowOmittedFieldsWithEllipsis: true },
        false
      )
    ).toBe(true);
  });

  it('matches when expected has ... as a value for an array', () => {
    const expected = { genres: ['Adventure', '...'] };
    const actual = { genres: ['Adventure', 'Comedy', 'Sci-Fi'] };
    expect(
      areObjectsEqual(
        expected,
        actual,
        { allowOmittedFieldsWithEllipsis: true },
        false
      )
    ).toBe(true);
  });

  it('matches when expected has ... as a value for an object property', () => {
    const expected = { details: { director: '...' } };
    const actual = { details: { director: 'Robert Zemeckis', year: 1985 } };
    expect(
      areObjectsEqual(
        expected,
        actual,
        { allowOmittedFieldsWithEllipsis: true },
        false
      )
    ).toBe(true);
  });

  it('fails if a required key is missing and no global ...', () => {
    const expected = { a: 1, b: 2 };
    const actual = { a: 1 };
    expect(
      areObjectsEqual(
        expected,
        actual,
        { allowOmittedFieldsWithEllipsis: false },
        false
      )
    ).toBe(false);
  });

  it('matches if a required key is missing and global ... is present', () => {
    const expected = { a: 1, '...': '...' }; // Use explicit ellipsis pattern
    const actual = { a: 1, b: 2 };
    expect(
      areObjectsEqual(
        expected,
        actual,
        { allowOmittedFieldsWithEllipsis: true }
      )
    ).toBe(true);
  });

  describe('Representative MongoDB document test blob', () => {
    it('should match complex document with _id ellipsis, truncated plot, and omitted fields', () => {
      const expected = {
        _id: '...',
        plot: 'A young man is accidentally sent 30 years into the past...',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        '...': '...',
        title: 'Back to the Future',
      };

      const actual = {
        _id: '507f1f77bcf86cd799439011', // Any ObjectId value
        plot: 'A young man is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        runtime: 116,
        directors: ['Robert Zemeckis'],
        cast: ['Michael J. Fox', 'Christopher Lloyd', 'Lea Thompson'],
        year: 1985,
        imdb: { rating: 8.5, votes: 1234567 },
        title: 'Back to the Future',
        fullplot: 'Detailed full plot description...',
        awards: { wins: 4, nominations: 10 },
      };

      expect(areObjectsEqual(expected, actual, {})).toBe(true);
    });

    it('should match with different _id values', () => {
      const expected = {
        _id: '...',
        title: 'Back to the Future',
      };

      // Test with various _id types
      const actualWithStringId = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Back to the Future',
      };
      const actualWithObjectId = {
        _id: { $oid: '507f1f77bcf86cd799439011' },
        title: 'Back to the Future',
      };
      const actualWithNumber = { _id: 12345, title: 'Back to the Future' };

      expect(areObjectsEqual(expected, actualWithStringId, {})).toBe(
        true
      );
      expect(areObjectsEqual(expected, actualWithObjectId, {})).toBe(
        true
      );
      expect(areObjectsEqual(expected, actualWithNumber, {})).toBe(true);
    });

    it('should match truncated plot with any longer string', () => {
      const expected = {
        plot: 'A young man is accidentally sent 30 years into the past...',
      };

      const shortActual = {
        plot: 'A young man is accidentally sent 30 years into the past in a car.',
      };

      const longActual = {
        plot: 'A young man is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown. Now he must make sure his high-school-age parents unite in order to save his own existence.',
      };

      expect(areObjectsEqual(expected, shortActual, {})).toBe(true);
      expect(areObjectsEqual(expected, longActual, {})).toBe(true);
    });

    it('should fail if truncated plot does not match prefix', () => {
      const expected = {
        plot: 'A young man is accidentally sent 30 years into the past...',
      };

      const differentActual = {
        plot: 'A different story about time travel.',
      };

      expect(areObjectsEqual(expected, differentActual, {})).toBe(false);
    });

    it('should handle fields in different order with global ellipsis', () => {
      const expected = {
        _id: '...',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        '...': '...',
        title: 'Back to the Future',
      };

      const actualDifferentOrder = {
        title: 'Back to the Future',
        year: 1985,
        runtime: 116,
        _id: 'any-id-value',
        directors: ['Robert Zemeckis'],
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        plot: 'Full plot...',
      };

      expect(areObjectsEqual(expected, actualDifferentOrder, {})).toBe(
        true
      );
    });

    it('should match with minimal actual object containing only expected fields', () => {
      const expected = {
        _id: '...',
        plot: 'A young man is accidentally sent 30 years into the past...',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        '...': '...',
        title: 'Back to the Future',
      };

      const minimalActual = {
        _id: '507f1f77bcf86cd799439011',
        plot: 'A young man is accidentally sent 30 years into the past',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        title: 'Back to the Future',
      };

      expect(areObjectsEqual(expected, minimalActual, {})).toBe(true);
    });

    it('should allow missing fields when global ellipsis is present', () => {
      const expected = {
        _id: '...',
        plot: 'A young man is accidentally sent 30 years into the past...',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        '...': '...',
        title: 'Back to the Future',
      };

      const actualMissingTitle = {
        _id: '507f1f77bcf86cd799439011',
        plot: 'A young man is accidentally sent 30 years into the past in a DeLorean',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        year: 1985,
      };

      // Global ellipsis allows missing fields, even non-ellipsis ones
      expect(areObjectsEqual(expected, actualMissingTitle, {})).toBe(
        true
      );
    });

    it('should fail if required field is missing without global ellipsis', () => {
      const expected = {
        _id: '...',
        plot: 'A young man is accidentally sent 30 years into the past...',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        title: 'Back to the Future', // Required field without global ellipsis
      };

      const actualMissingTitle = {
        _id: '507f1f77bcf86cd799439011',
        plot: 'A young man is accidentally sent 30 years into the past in a DeLorean',
        genres: ['Adventure', 'Comedy', 'Sci-Fi'],
        year: 1985,
      };

      // Without global ellipsis, missing fields should cause failure
      expect(areObjectsEqual(expected, actualMissingTitle, {})).toBe(
        false
      );
    });

    it('should work with nested objects and arrays containing ellipsis', () => {
      const expected = {
        _id: '...',
        metadata: {
          ratings: {
            imdb: '...',
            '...': '...',
          },
          '...': '...',
        },
        cast: ['Michael J. Fox', '...'],
        '...': '...',
      };

      const actual = {
        _id: 'any-id',
        metadata: {
          ratings: {
            imdb: 8.5,
            rotten_tomatoes: 96,
            metacritic: 87,
          },
          budget: 19000000,
          box_office: 381109762,
        },
        cast: [
          'Michael J. Fox',
          'Christopher Lloyd',
          'Lea Thompson',
          'Crispin Glover',
        ],
        title: 'Back to the Future',
        year: 1985,
      };

      expect(areObjectsEqual(expected, actual, {})).toBe(true);
    });
  });
});
