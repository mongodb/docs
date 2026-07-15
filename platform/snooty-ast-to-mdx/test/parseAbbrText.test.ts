import { parseAbbrText } from '../src/core/convertSnootyAstToMdast/parseAbbrText';

describe('parseAbbrText', () => {
  it('splits "term (expansion)" into term and tooltip', () => {
    expect(parseAbbrText('AWS (Amazon Web Services)')).toEqual({
      term: 'AWS',
      tooltip: 'Amazon Web Services',
    });
  });

  it('handles expansions that themselves contain parentheses', () => {
    expect(parseAbbrText('MQL (MongoDB Query Language (v2))')).toEqual({
      term: 'MQL',
      tooltip: 'MongoDB Query Language (v2)',
    });
  });

  it('falls back to the full text as the term when there is no expansion', () => {
    expect(parseAbbrText('MQL')).toEqual({ term: 'MQL' });
  });
});
