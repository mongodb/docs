{
  explainVersion: '1',
  stages: [
    {
      '$_internalSearchMongotRemote': {
        mongotQuery: {
          autocomplete: {
            path: 'title',
            query: 'pre',
            fuzzy: { maxEdits: 1, prefixLength: 1, maxExpansions: 256 }
          }
        },
        explain: {
          query: {
            type: 'BooleanQuery',
            args: {
              must: [
                {
                  type: 'MultiTermQueryConstantScoreBlendedWrapper',
                  args: {
                    queries: [
                      {
                        type: 'DefaultQuery',
                        args: { queryType: 'AutomatonQuery' },
                        stats: {
                          context: { millisElapsed: 0 },
                          match: { millisElapsed: 0 },
                          score: { millisElapsed: 0 }
                        }
                      }
                    ]
                  },
                  stats: {
                    context: {
                      millisElapsed: 12.517877,
                      invocationCounts: {
                        createWeight: Long('4'),
                        createScorer: Long('48')
                      }
                    },
                    match: {
                      millisElapsed: 0.970794,
                      invocationCounts: { nextDoc: Long('2436') }
                    },
                    score: {
                      millisElapsed: 0.638731,
                      invocationCounts: { score: Long('2420') }
                    }
                  }
                }
              ],
              mustNot: [],
              should: [
                {
                  type: 'TermQuery',
                  args: { path: 'title', value: 'pre' },
                  stats: {
                    context: {
                      millisElapsed: 1.481341,
                      invocationCounts: {
                        createWeight: Long('4'),
                        createScorer: Long('16')
                      }
                    },
                    match: { millisElapsed: 0 },
                    score: { millisElapsed: 0 }
                  }
                }
              ],
              filter: [],
              minimumShouldMatch: 0
            },
            stats: {
              context: {
                millisElapsed: 15.118651,
                invocationCounts: { createWeight: Long('4'), createScorer: Long('32') }
              },
              match: {
                millisElapsed: 1.923822,
                invocationCounts: { nextDoc: Long('2436') }
              },
              score: {
                millisElapsed: 1.954216,
                invocationCounts: { score: Long('2420') }
              }
            }
          },
          collectStats: {
            allCollectorStats: {
              millisElapsed: 4.189904,
              invocationCounts: {
                collect: Long('2420'),
                competitiveIterator: Long('16'),
                setScorer: Long('16')
              }
            },
            facet: { collectorStats: { millisElapsed: 0 } }
          },
          resultMaterialization: {
            stats: {
              millisElapsed: 21.876621,
              invocationCounts: { retrieveAndSerialize: Long('4') }
            }
          },
          metadata: {
            <hostname>.mongodb.netmongotVersion: '1.42.0',
            mongotHostName: '<hostname>.mongodb.net',
            indexName: 'default',
            cursorOptions: { batchSize: 108, requiresSearchSequenceToken: false },
            totalLuceneDocs: 21349
          },
          resourceUsage: {
            majorFaults: Long('2'),
            minorFaults: Long('242'),
            userTimeMs: Long('40'),
            systemTimeMs: Long('0'),
            maxReportingThreads: 1,
            numBatches: 4
          }
        },
        requiresSearchMetaCursor: false,
        internalMongotBatchSizeHistory: [ Long('108'), Long('162'), Long('243'), Long('365') ]
      },
      nReturned: Long('605'),
      executionTimeMillisEstimate: Long('44')
    },
    {
      '$_internalSearchIdLookup': {
        subPipeline: [
          { '$match': { _id: { '$eq': '_id placeholder' } } }
        ],
        totalDocsExamined: Long('605'),
        totalKeysExamined: Long('605'),
        numDocsFilteredByIdLookup: Long('0')
      },
      nReturned: Long('605'),
      executionTimeMillisEstimate: Long('91')
    }
  ],
  queryShapeHash: '6FD3791F785FA329D4ECD1171E0E5AF6772C18F5F0A7A50FC416D080A93C8CB7',
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
        '$search': {
          autocomplete: {
            path: 'title',
            query: 'pre',
            fuzzy: { maxEdits: 1, prefixLength: 1, maxExpansions: 256 }
          }
        }
      }
    ],
    cursor: {},
    '$db': 'sample_mflix'
  },
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1758306209, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('MIipFR5NAfl728L6h4ueQeZBLGM=', 0),
      keyId: Long('7551379485140975621')
    }
  },
  operationTime: Timestamp({ t: 1758306209, i: 1 })
}
