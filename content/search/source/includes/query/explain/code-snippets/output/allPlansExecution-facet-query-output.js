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
          query: {
            type: 'LongDistanceFeatureQuery',
            args: {},
            stats: {
              context: {
                millisElapsed: 4.141763,
                invocationCounts: { createWeight: Long('1'), createScorer: Long('6') }
              },
              match: {
                millisElapsed: 24.986327,
                invocationCounts: { nextDoc: Long('20881') }
              },
              score: {
                millisElapsed: 33.324657,
                invocationCounts: { score: Long('20878') }
              }
            }
          },
          collectStats: {
            allCollectorStats: {
              millisElapsed: 72.243101,
              invocationCounts: {
                collect: Long('20878'),
                competitiveIterator: Long('3'),
                setScorer: Long('3')
              }
            },
            facet: {
              collectorStats: {
                millisElapsed: 10.424621,
                invocationCounts: { collect: Long('20878'), setScorer: Long('3') }
              },
              createCountsStats: {
                millisElapsed: 60.095261,
                invocationCounts: { generateFacetCounts: Long('2') }
              },
              stringFacetCardinalities: { genresFacet: { queried: 10, total: 25 } }
            }
          },
          resultMaterialization: {
            stats: {
              millisElapsed: 13.764287,
              invocationCounts: { retrieveAndSerialize: Long('1') }
            }
          },
          metadata: {
            <hostname>.mongodb.netmongotVersion: '1.42.0',
            mongotHostName: '<hostname>.mongodb.net',
            indexName: 'default',
            totalLuceneDocs: 21349
          },
          resourceUsage: {
            majorFaults: Long('10'),
            minorFaults: Long('13'),
            userTimeMs: Long('20'),
            systemTimeMs: Long('0'),
            maxReportingThreads: 1,
            numBatches: 1
          }
        },
        requiresSearchMetaCursor: true
      },
      nReturned: Long('1'),
      executionTimeMillisEstimate: Long('336')
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
    clusterTime: Timestamp({ t: 1758304279, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('DI9+ZTogU1QxHCWId6QLcA4R4tQ=', 0),
      keyId: Long('7551379485140975621')
    }
  },
  operationTime: Timestamp({ t: 1758304279, i: 1 })
}