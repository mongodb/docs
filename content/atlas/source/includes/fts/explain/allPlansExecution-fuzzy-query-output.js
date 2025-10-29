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
                      millisElapsed: 0.209279,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('18')
                      }
                    },
                    match: {
                      millisElapsed: 0.028079,
                      invocationCounts: { nextDoc: Long('22') }
                    },
                    score: {
                      millisElapsed: 0.01706,
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
                      millisElapsed: 0.136254,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('14')
                      }
                    },
                    match: {
                      millisElapsed: 0.008556,
                      invocationCounts: { nextDoc: Long('10') }
                    },
                    score: {
                      millisElapsed: 0.006096,
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
                      millisElapsed: 0.303568,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('18')
                      }
                    },
                    match: {
                      millisElapsed: 0.374856,
                      invocationCounts: { nextDoc: Long('62') }
                    },
                    score: {
                      millisElapsed: 0.892383,
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
                      millisElapsed: 8.379562,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('10')
                      }
                    },
                    match: {
                      millisElapsed: 2.073272,
                      invocationCounts: { nextDoc: Long('6') }
                    },
                    score: {
                      millisElapsed: 0.004063,
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
                      millisElapsed: 0.679029,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('18')
                      }
                    },
                    match: {
                      millisElapsed: 5.500198,
                      invocationCounts: { nextDoc: Long('172') }
                    },
                    score: {
                      millisElapsed: 2.465502,
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
                      millisElapsed: 0.221919,
                      invocationCounts: {
                        createWeight: Long('2'),
                        createScorer: Long('18')
                      }
                    },
                    match: {
                      millisElapsed: 0.116139,
                      invocationCounts: { nextDoc: Long('60') }
                    },
                    score: {
                      millisElapsed: 0.056817,
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
                millisElapsed: 25.303419,
                invocationCounts: { createWeight: Long('2'), createScorer: Long('12') }
              },
              match: {
                millisElapsed: 10.533183,
                invocationCounts: { nextDoc: Long('308') }
              },
              score: {
                millisElapsed: 5.501189,
                invocationCounts: { score: Long('302') }
              }
            }
          },
          collectStats: {
            allCollectorStats: {
              millisElapsed: 6.735626,
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
              millisElapsed: 176.613905,
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
            majorFaults: Long('99'),
            minorFaults: Long('192'),
            userTimeMs: Long('80'),
            systemTimeMs: Long('10'),
            maxReportingThreads: 1,
            numBatches: 2
          }
        },
        requiresSearchMetaCursor: false,
        internalMongotBatchSizeHistory: [ Long('108'), Long('162') ]
      },
      nReturned: Long('151'),
      executionTimeMillisEstimate: Long('83')
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
      executionTimeMillisEstimate: Long('88')
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
    clusterTime: Timestamp({ t: 1758295936, i: 19 }),
    signature: {
      hash: Binary.createFromBase64('+CanjrL9jdXPTLa2sUaNPtImkBc=', 0),
      keyId: Long('7551379485140975621')
    }
  },
  operationTime: Timestamp({ t: 1758295936, i: 19 })
}