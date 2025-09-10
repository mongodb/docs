import type { RefRoleNode, TextNode } from '@/types/ast';
import { appendTrailingPunctuation } from '@/utils/append-trailing-punctuation';

describe('appendTrailingPunctuation()', () => {
  it('does not strip trailing periods from sentences ending with a link', () => {
    // See: https://jira.mongodb.org/browse/DOP-3327
    const data: [RefRoleNode, TextNode] = [
      {
        type: 'ref_role',
        position: {
          start: {
            line: {
              $numberInt: '65',
            },
          },
        },
        children: [
          {
            type: 'literal',
            position: {
              start: {
                line: {
                  $numberInt: '65',
                },
              },
            },
            children: [
              {
                type: 'text',
                position: {
                  start: {
                    line: {
                      $numberInt: '65',
                    },
                  },
                },
                value: 'mongosh',
              },
            ],
          },
        ],
        domain: 'mongodb',
        name: 'binary',
        target: 'bin.mongosh',
        flag: '~',
        url: 'https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh',
      },
      {
        type: 'text',
        position: {
          start: {
            line: {
              $numberInt: '65',
            },
          },
        },
        value: '.',
      },
    ];
    const result = appendTrailingPunctuation(data);
    expect(result).toEqual([
      {
        type: 'ref_role',
        position: {
          start: {
            line: {
              $numberInt: '65',
            },
          },
        },
        children: [
          {
            type: 'literal',
            position: {
              start: {
                line: {
                  $numberInt: '65',
                },
              },
            },
            children: [
              {
                type: 'text',
                position: {
                  start: {
                    line: {
                      $numberInt: '65',
                    },
                  },
                },
                value: 'mongosh',
              },
            ],
          },
          {
            type: 'text',
            position: {
              start: {
                line: {
                  $numberInt: '65',
                },
              },
            },
            value: '.',
          },
        ],
        domain: 'mongodb',
        name: 'binary',
        target: 'bin.mongosh',
        flag: '~',
        url: 'https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh',
      },
    ]);
  });
});
