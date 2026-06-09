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
                      args: { path: 'title', value: 'park' }
                    },
                    boost: 0.75
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'york' }
                    },
                    boost: 0.75
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'dark' }
                    },
                    boost: 0.75
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'mark' }
                    },
                    boost: 0.75
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'yard' }
                    },
                    boost: 0.75
                  }
                },
                {
                  type: 'BoostQuery',
                  args: {
                    query: {
                      type: 'TermQuery',
                      args: { path: 'title', value: 'ark' }
                    },
                    boost: 0.6666666269302368
                  }
                }
              ],
              filter: [],
              minimumShouldMatch: 0
            }
          },
          metadata: {
            <hostname>.mongodb.netmongotVersion: '1.42.0',
            mongotHostName: '<hostname>.mongodb.net',
            indexName: 'default',
            totalLuceneDocs: 21349
          }
        },
        requiresSearchMetaCursor: false
      }
    },
    {
      '$_internalSearchIdLookup': {
        subPipeline: [
          { '$match': { _id: { '$eq': '_id placeholder' } } }
        ]
      }
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
    clusterTime: Timestamp({ t: 1758305729, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('IUnIrXR/VeUrj1cGgyEFlkoQKAM=', 0),
      keyId: Long('7551379485140975621')
    }
  },
  operationTime: Timestamp({ t: 1758305729, i: 1 })
}
