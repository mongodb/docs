{
  explainVersion: '1',
  stages: [
    {
      '$_internalSearchMongotRemote': {
        mongotQuery: {
          text: {
            path: 'title',
            query: 'yark',
            fuzzy: { maxEdits: 1, maxExpansions: 100 }
          }
        },
        explain: {
          query: {
            type: 'BooleanQuery',
            args: {
              must: [],
              mustNot: [],
              should: [
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'mark' },
                      stats: {
                        context: { millisElapsed: 0 },
                        match: { millisElapsed: 0 },
                        score: { millisElapsed: 0 }
                      }
                    },
                    boost: 0.75
                  },
                  stats: {
                    context: {
                      millisElapsed: 0.164466,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('18')
                      }
                    },
                    match: {
                      millisElapsed: 0.055889,
                      invocationCounts: { nextDoc: Long('22') }
                    },
                    score: {
                      millisElapsed: 0.01638,
                      invocationCounts: { score: Long('16') }
                    }
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'yard' },
                      stats: {
                        context: { millisElapsed: 0 },
                        match: { millisElapsed: 0 },
                        score: { millisElapsed: 0 }
                      }
                    },
                    boost: 0.75
                  },
                  stats: {
                    context: {
                      millisElapsed: 0.109841,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('14')
                      }
                    },
                    match: {
                      millisElapsed: 0.009747,
                      invocationCounts: { nextDoc: Long('10') }
                    },
                    score: {
                      millisElapsed: 0.005449,
                      invocationCounts: { score: Long('6') }
                    }
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'york' },
                      stats: {
                        context: { millisElapsed: 0 },
                        match: { millisElapsed: 0 },
                        score: { millisElapsed: 0 }
                      }
                    },
                    boost: 0.75
                  },
                  stats: {
                    context: {
                      millisElapsed: 0.140144,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('18')
                      }
                    },
                    match: {
                      millisElapsed: 0.058885,
                      invocationCounts: { nextDoc: Long('62') }
                    },
                    score: {
                      millisElapsed: 0.877508,
                      invocationCounts: { score: Long('56') }
                    }
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'ark' },
                      stats: {
                        context: { millisElapsed: 0 },
                        match: { millisElapsed: 0 },
                        score: { millisElapsed: 0 }
                      }
                    },
                    boost: 0.6666666269302368
                  },
                  stats: {
                    context: {
                      millisElapsed: 0.26056,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('10')
                      }
                    },
                    match: {
                      millisElapsed: 1.028141,
                      invocationCounts: { nextDoc: Long('6') }
                    },
                    score: {
                      millisElapsed: 0.004226,
                      invocationCounts: { score: Long('4') }
                    }
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'dark' },
                      stats: {
                        context: { millisElapsed: 0 },
                        match: { millisElapsed: 0 },
                        score: { millisElapsed: 0 }
                      }
                    },
                    boost: 0.75
                  },
                  stats: {
                    context: {
                      millisElapsed: 0.3029,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('18')
                      }
                    },
                    match: {
                      millisElapsed: 2.294511,
                      invocationCounts: { nextDoc: Long('172') }
                    },
                    score: {
                      millisElapsed: 1.806661,
                      invocationCounts: { score: Long('166') }
                    }
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'park' },
                      stats: {
                        context: { millisElapsed: 0 },
                        match: { millisElapsed: 0 },
                        score: { millisElapsed: 0 }
                      }
                    },
                    boost: 0.75
                  },
                  stats: {
                    context: {
                      millisElapsed: 0.154143,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('18')
                      }
                    },
                    match: {
                      millisElapsed: 0.052283,
                      invocationCounts: { nextDoc: Long('60') }
                    },
                    score: {
                      millisElapsed: 0.050278,
                      invocationCounts: { score: Long('54') }
                    }
                  }
                }
              ],
              filter: [],
              minimumShouldMatch: 0
            },
            stats: {
              context: {
                millisElapsed: 2.024454,
                invocationCounts: { createWeight: Long('2'), createScorer: Long('12') }
              },
              match: {
                millisElapsed: 4.020593,
                invocationCounts: { nextDoc: Long('308') }
              },
              score: {
                millisElapsed: 3.181962,
                invocationCounts: { score: Long('302') }
              }
            }
          },
          collectStats: {
            allCollectorStats: {
              millisElapsed: 4.062801,
              invocationCounts: {
                collect: Long('302'),
                competitiveIterator: Long('6'),
                setScorer: Long('6')
              }
            },
            facet: { collectorStats: { millisElapsed: 0 } }
          },
          resultMaterialization: {
            stats: {
              millisElapsed: 127.205476,
              invocationCounts: { retrieveAndSerialize: Long('2') }
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
            majorFaults: Long('100'),
            minorFaults: Long('31'),
            userTimeMs: Long('20'),
            systemTimeMs: Long('10'),
            maxReportingThreads: 1,
            numBatches: 2
          }
        },
        requiresSearchMetaCursor: false,
        internalMongotBatchSizeHistory: [ Long('108'), Long('162') ]
      },
      nReturned: Long('151'),
      executionTimeMillisEstimate: Long('57')
    },
    {
      '$_internalSearchIdLookup': {
        subPipeline: [
          { '$match': { _id: { '$eq': '_id placeholder' } } }
        ],
        totalDocsExamined: Long('151'),
        totalKeysExamined: Long('151'),
        numDocsFilteredByIdLookup: Long('0')
      },
      nReturned: Long('151'),
      executionTimeMillisEstimate: Long('64')
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
          text: {
            path: 'title',
            query: 'yark',
            fuzzy: { maxEdits: 1, maxExpansions: 100 }
          }
        }
      }
    ],
    cursor: {},
    '$db': 'sample_mflix'
  },
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1758302299, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('pCKOPlBY/K4IObOkqDlOSnbRqw0=', 0),
      keyId: Long('7551379485140975621')
    }
  },
  operationTime: Timestamp({ t: 1758302299, i: 1 })
}
