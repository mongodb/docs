{
  explainVersion: '1',
  stages: [
    {
      '$_internalSearchMongotRemote': {
        mongotQuery: {
          index: 'default',
          range: {
            path: 'released',
            gt: ISODate('2015-01-01T00:00:00.000Z'),
            lt: ISODate('2015-12-31T00:00:00.000Z')
          },
          sort: { released: -1 }
        },
        explain: {
          query: {
            type: 'ConstantScoreQuery',
            args: {
              query: {
                type: 'IndexOrDocValuesQuery',
                args: {
                  query: [
                    {
                      type: 'PointRangeQuery',
                      args: {
                        path: 'released',
                        gte: ISODate('2015-01-01T00:00:00.001Z'),
                        lte: ISODate('2015-12-30T23:59:59.999Z')
                      }
                    },
                    {
                      type: 'SortedNumericDocValuesRangeQuery',
                      args: {}
                    }
                  ]
                }
              }
            }
          },
          collectors: {
            sort: {
              fieldInfos: { released: [ 'dateV2' ] },
              usesIndexSort: true
            }
          },
          metadata: {
            mongotVersion: '1.67.0',
            mongotHostName: '<hostname>.mongodb.net',
            indexName: 'default',
            lucene: { totalSegments: 1, totalDocs: 21349 }
          },
          featureFlags: [
            {
              featureFlag: 'mongot.featureFlag.numericV2Semantics',
              evaluationResult: true,
              decisiveField: 'Phase'
            }
          ]
        },
        mongotDocsRequested: Long('5'),
        requiresSearchMetaCursor: false
      }
    },
    {
      '$_internalSearchIdLookup': {
        limit: Long('5'),
        subPipeline: [
          { '$match': { _id: { '$eq': '_id placeholder' } } }
        ]
      }
    },
    { '$limit': Long('5') },
    { '$project': { title: true, released: true, _id: false } }
  ],
  queryShapeHash: 'CA4950A32339C9853C4A295D89E9523DE568624672C87C231135012D27896CAE',
  serverInfo: {
    host: '<hostname>.mongodb.net',
    port: 27017,
    version: '8.3.2',
    gitVersion: '89f54eb32e217d2f7bfcad50e5919f3033bb9611'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  command: {
    aggregate: 'movies',
    pipeline: [
      {
        '$search': {
          index: 'default',
          range: {
            path: 'released',
            gt: ISODate('2015-01-01T00:00:00.000Z'),
            lt: ISODate('2015-12-31T00:00:00.000Z')
          },
          sort: { released: -1 }
        }
      },
      { '$limit': 5 },
      { '$project': { _id: 0, title: 1, released: 1 } }
    ],
    cursor: {},
    '$db': 'sample_mflix'
  },
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1778545038, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('mExdEPAwssnzlpKaA1Rt+Ypv+cA=', 0),
      keyId: Long('7634583163557117960')
    }
  },
  operationTime: Timestamp({ t: 1778545038, i: 1 })
}