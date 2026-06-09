{
  explainVersion: '1',
  stages: [
    {
      '$_internalSearchMongotRemote': {
        mongotQuery: {
          text: { path: 'title', query: 'prince' },
          highlight: { path: 'title', maxNumPassages: 1, maxCharsToExamine: 40 }
        },
        explain: {
          query: {
            type: 'TermQuery',
            args: { path: 'title', value: 'prince' },
            stats: {
              context: {
                millisElapsed: 9.880819,
                invocationCounts: { createWeight: Long('1'), createScorer: Long('6') }
              },
              match: {
                millisElapsed: 3.566358,
                invocationCounts: { nextDoc: Long('28') }
              },
              score: {
                millisElapsed: 2.762687,
                invocationCounts: { score: Long('25') }
              }
            }
          },
          collectStats: {
            allCollectorStats: {
              millisElapsed: 3.238152,
              invocationCounts: {
                collect: Long('25'),
                competitiveIterator: Long('3'),
                setScorer: Long('3')
              }
            },
            facet: { collectorStats: { millisElapsed: 0 } }
          },
          highlight: {
            resolvedHighlightPaths: [ '$type:string/title' ],
            stats: {
              millisElapsed: 157.543967,
              invocationCounts: {
                executeHighlight: Long('1'),
                setupHighlight: Long('1')
              }
            }
          },
          resultMaterialization: {
            stats: {
              millisElapsed: 3.781115,
              invocationCounts: { retrieveAndSerialize: Long('1') }
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
            majorFaults: Long('42'),
            minorFaults: Long('167'),
            userTimeMs: Long('50'),
            systemTimeMs: Long('0'),
            maxReportingThreads: 1,
            numBatches: 1
          }
        },
        requiresSearchMetaCursor: false,
        internalMongotBatchSizeHistory: [ Long('108') ]
      },
      nReturned: Long('25'),
      executionTimeMillisEstimate: Long('0')
    },
    {
      '$_internalSearchIdLookup': {
        subPipeline: [
          { '$match': { _id: { '$eq': '_id placeholder' } } }
        ],
        totalDocsExamined: Long('25'),
        totalKeysExamined: Long('25'),
        numDocsFilteredByIdLookup: Long('0')
      },
      nReturned: Long('25'),
      executionTimeMillisEstimate: Long('1')
    },
    {
      '$project': {
        description: true,
        highlights: { '$meta': 'searchHighlights' },
        _id: false
      },
      nReturned: Long('25'),
      executionTimeMillisEstimate: Long('1')
    }
  ],
  queryShapeHash: 'D08444272924C1E04A6E99D0CD4BF82FD929893862B3356F79EC18BBD1F0EF0C',
  serverInfo: {
    host: '<hostname>.mongodb.net',
    port: 27017,
    version: '8.2.0',
    gitVersion: '13e629eeccd63f00d17568fc4c12b7530fa34b54'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  command: {
    aggregate: 'movies',
    pipeline: [
      {
        '$search': {
          text: { path: 'title', query: 'prince' },
          highlight: { path: 'title', maxNumPassages: 1, maxCharsToExamine: 40 }
        }
      },
      {
        '$project': {
          description: 1,
          _id: 0,
          highlights: { '$meta': 'searchHighlights' }
        }
      }
    ],
    cursor: {},
    '$db': 'sample_mflix'
  },
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1758302099, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('pUGxwCVnDOBIObmhURJQ1a1UwC8=', 0),
      keyId: Long('7551379485140975621')
    }
  },
  operationTime: Timestamp({ t: 1758302099, i: 1 })
}