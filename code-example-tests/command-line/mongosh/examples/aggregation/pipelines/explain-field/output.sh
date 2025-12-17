{
  explainVersion: '2',
  stages: [
    {
      '$cursor': {
        queryPlanner: {
          namespace: 'sample_mflix.comments',
          parsedQuery: { date: { '$gte': ISODate('2015-01-01T00:00:00.000Z') } },
          indexFilterSet: false,
          queryHash: '23FBEC4C',
          planCacheShapeHash: '23FBEC4C',
          planCacheKey: 'C989B0E7',
          optimizationTimeMillis: 0,
          maxIndexedOrSolutionsReached: false,
          maxIndexedAndSolutionsReached: false,
          maxScansToExplodeReached: false,
          prunedSimilarIndexes: false,
          winningPlan: {
            isCached: false,
            queryPlan: {
              stage: 'GROUP',
              planNodeId: 3,
              inputStage: {
                stage: 'COLLSCAN',
                planNodeId: 1,
                filter: {
                  date: { '$gte': ISODate('2015-01-01T00:00:00.000Z') }
                },
                direction: 'forward'
              }
            },
            slotBasedPlan: {
              slots: '$$RESULT=s9 env: {  }',
              stages: '[3] project [s9 = newObj("_id", s6, "commentCount", s8)] \n' +
                '[3] project [s8 = (convert ( s7, int32) ?: s7)] \n' +
                '[3] group [s6] [s7 = count()] spillSlots[s5] mergingExprs[sum(s5)] \n' +
                '[3] project [s6 = (s3 ?: null)] \n' +
                '[1] filter {traverseF(s4, lambda(l2.0) { ((move(l2.0) >= Date(1420070400000)) ?: false) }, false)} \n' +
                '[1] scan s1 s2 none none none none none none [s3 = movie_id, s4 = date] @"040847fd-cb2e-4b01-8511-83bdeb4f9e58" true false '
            }
          },
          rejectedPlans: []
        },
        executionStats: {
          executionSuccess: true,
          nReturned: 697,
          executionTimeMillis: 31,
          totalKeysExamined: 0,
          totalDocsExamined: 41079,
          executionStages: {
            stage: 'project',
            planNodeId: 3,
            nReturned: 697,
            executionTimeMillisEstimate: 28,
            opens: 1,
            closes: 1,
            saveState: 8,
            restoreState: 7,
            isEOF: 1,
            projections: { '9': 'newObj("_id", s6, "commentCount", s8) ' },
            inputStage: {
              stage: 'project',
              planNodeId: 3,
              nReturned: 697,
              executionTimeMillisEstimate: 28,
              opens: 1,
              closes: 1,
              saveState: 8,
              restoreState: 7,
              isEOF: 1,
              projections: { '8': '(convert ( s7, int32) ?: s7) ' },
              inputStage: {
                stage: 'group',
                planNodeId: 3,
                nReturned: 697,
                executionTimeMillisEstimate: 28,
                opens: 1,
                closes: 1,
                saveState: 8,
                restoreState: 7,
                isEOF: 1,
                groupBySlots: [ Long('6') ],
                expressions: { '7': 'count() ', initExprs: { '7': null } },
                mergingExprs: { '5': 'sum(s5) ' },
                usedDisk: false,
                spills: 0,
                spilledBytes: 0,
                spilledRecords: 0,
                spilledDataStorageSize: 0,
                inputStage: {
                  stage: 'project',
                  planNodeId: 3,
                  nReturned: 2303,
                  executionTimeMillisEstimate: 28,
                  opens: 1,
                  closes: 1,
                  saveState: 8,
                  restoreState: 7,
                  isEOF: 1,
                  projections: { '6': '(s3 ?: null) ' },
                  inputStage: {
                    stage: 'filter',
                    planNodeId: 1,
                    nReturned: 2303,
                    executionTimeMillisEstimate: 28,
                    opens: 1,
                    closes: 1,
                    saveState: 8,
                    restoreState: 7,
                    isEOF: 1,
                    numTested: 41079,
                    filter: 'traverseF(s4, lambda(l2.0) { ((move(l2.0) >= Date(1420070400000)) ?: false) }, false) ',
                    inputStage: {
                      stage: 'scan',
                      planNodeId: 1,
                      nReturned: 41079,
                      executionTimeMillisEstimate: 28,
                      opens: 1,
                      closes: 1,
                      saveState: 8,
                      restoreState: 7,
                      isEOF: 1,
                      numReads: 41079,
                      recordSlot: 1,
                      recordIdSlot: 2,
                      scanFieldNames: [ 'movie_id', 'date' ],
                      scanFieldSlots: [ Long('3'), Long('4') ]
                    }
                  }
                }
              }
            }
          },
          allPlansExecution: []
        }
      },
      nReturned: Long('697'),
      executionTimeMillisEstimate: Long('31')
    },
    {
      '$sort': { sortKey: { commentCount: -1 } },
      totalDataSizeSortedBytesEstimate: Long('170765'),
      usedDisk: false,
      spills: Long('0'),
      spilledDataStorageSize: Long('0'),
      nReturned: Long('697'),
      executionTimeMillisEstimate: Long('31')
    }
  ],
  queryShapeHash: '3B9C080A707E09FD7D9FA73A8B8F0196A9F6A1CB02D88E1750B16D5159843EA6',
  serverInfo: {
    host: 'M-LMQ4GNXY27',
    port: 27017,
    version: '8.2.2',
    gitVersion: '594f839ceec1f4385be9a690131412d67b249a0a'
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
    aggregate: 'comments',
    pipeline: [
      {
        '$match': { date: { '$gte': ISODate('2015-01-01T00:00:00.000Z') } }
      },
      { '$group': { _id: '$movie_id', commentCount: { '$sum': 1 } } },
      { '$sort': { commentCount: -1 } }
    ],
    cursor: {},
    '$db': 'sample_mflix'
  },
  ok: 1
}