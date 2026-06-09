{
  explainVersion: '1',
  stages: [
    {
      '$searchMeta': {
        mongotQuery: {
          facet: {
            operator: {
              near: {
                path: 'released',
                origin: ISODate('1921-11-01T00:00:00.000Z'),
                pivot: 7776000000
              }
            },
            facets: {
              genresFacet: { type: 'string', path: 'genres' },
              yearFacet: {
                type: 'number',
                path: 'year',
                boundaries: [ 1910, 1920, 1930, 1940 ]
              }
            }
          }
        },
        explain: {
          query: { type: 'LongDistanceFeatureQuery', args: {} },
          collectStats: {
            facet: {
              stringFacetCardinalities: { genresFacet: { queried: 10, total: 25 } }
            }
          },
          metadata: {
            <hostname>.mongodb.netmongotVersion: '1.42.0',
            mongotHostName: '<hostname>.mongodb.net',
            indexName: 'default',
            totalLuceneDocs: 21349
          }
        },
        requiresSearchMetaCursor: true
      }
    }
  ],
  queryShapeHash: '582DB864C9BCFB96896CF1A3079CF70FAC10A9A1E19E8D66DF20A2BB40424FB5',
  serverInfo: {
    host: '<hostname>.mongodb.net',
    port: 27017,
    version: '8.2.0',
    gitVersion: '13e629eeccd63f00d17568fc4c12b7530fa34b54'
  },
  serverParameters: {
    ...
  },
  command: {
    aggregate: 'movies',
    pipeline: [
      {
        '$searchMeta': {
          facet: {
            operator: {
              near: {
                path: 'released',
                origin: ISODate('1921-11-01T00:00:00.000Z'),
                pivot: 7776000000
              }
            },
            facets: {
              genresFacet: { type: 'string', path: 'genres' },
              yearFacet: {
                type: 'number',
                path: 'year',
                boundaries: [ 1910, 1920, 1930, 1940 ]
              }
            }
          }
        }
      }
    ],
    cursor: {},
    '$db': 'sample_mflix'
  },
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1758305859, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('8Zm16MEkzHnPpP9uLJK1YlT7a3o=', 0),
      keyId: Long('7551379485140975621')
    }
  },
  operationTime: Timestamp({ t: 1758305859, i: 1 })
}