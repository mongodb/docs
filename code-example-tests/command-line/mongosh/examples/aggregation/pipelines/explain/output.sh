{
  explainVersion: '2',
  stages: [
    {
      '$cursor': {
        queryPlanner: {
          namespace: 'sample_mflix.movies',
          parsedQuery: { 'imdb.rating': { '$gt': 8.5 } },
          indexFilterSet: false,
          queryHash: 'E77F011A',
          planCacheShapeHash: 'E77F011A',
          planCacheKey: '9BDDF3DF',
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
                stage: 'IXSCAN',
                planNodeId: 1,
                keyPattern: { 'imdb.rating': 1, year: 1 },
                indexName: 'imdb.rating_1_year_1',
                isMultiKey: false,
                multiKeyPaths: { 'imdb.rating': [], year: [] },
                isUnique: false,
                isSparse: false,
                isPartial: false,
                indexVersion: 2,
                direction: 'forward',
                indexBounds: {
                  'imdb.rating': [ '(8.5, inf]' ],
                  year: [ '[MinKey, MaxKey]' ]
                }
              }
            },
            slotBasedPlan: {
              slots: '$$RESULT=s13 env: {  }',
              stages: '[3] project [s13 = newObj("_id", s9, "averageRating", s12)] \n' +
                '[3] project [s12 = \n' +
                '    if (s11 == 0ll) \n' +
                '    then null \n' +
                '    else (doubleDoubleSumFinalize(s10) / s11) \n' +
                '] \n' +
                '[3] group [s9] [s10 = aggDoubleDoubleSum(s6), s11 = sum(\n' +
                '    if ((typeMatch(s6, 1088) ?: true) || !(isNumber(s6))) \n' +
                '    then 0ll \n' +
                '    else 1ll \n' +
                ')] spillSlots[s7, s8] mergingExprs[aggMergeDoubleDoubleSums(s7), sum(s8)] \n' +
                '[3] project [s9 = (s3 ?: null)] \n' +
                '[3] project [s6 = traverseP(s5, lambda(l2.0) { getField(move(l2.0), "rating") }, 1)] \n' +
                '[1] project [s5 = getField(s4, "imdb")] \n' +
                '[1] project [s4 = newObj("imdb", newObj("rating", s2), "year", s3)] \n' +
                '[1] ixseek KS(2B1180000000000000F0FE) KS(33FFFFFFFFFFFFFFFFF0FE) none s1 none none [s2 = 0, s3 = 1] @"7cb046ce-7067-4ac3-b7eb-a77306f9371c" @"imdb.rating_1_year_1" true '
            }
          },
          rejectedPlans: [
            {
              isCached: false,
              stage: 'PROJECTION_DEFAULT',
              transformBy: { 'imdb.rating': 1, year: 1, _id: 0 },
              inputStage: {
                stage: 'FETCH',
                inputStage: {
                  stage: 'IXSCAN',
                  keyPattern: { 'imdb.rating': 1, rated: 1 },
                  indexName: 'imdb.rating_1_rated_1',
                  isMultiKey: false,
                  multiKeyPaths: { 'imdb.rating': [], rated: [] },
                  isUnique: false,
                  isSparse: false,
                  isPartial: false,
                  indexVersion: 2,
                  direction: 'forward',
                  indexBounds: {
                    'imdb.rating': [ '(8.5, inf]' ],
                    rated: [ '[MinKey, MaxKey]' ]
                  }
                }
              }
            }
          ]
        }
      }
    },
    { '$sort': { sortKey: { averageRating: -1 } } }
  ],
  queryShapeHash: '178A625410808BFE77B438E3A52504027AAF57B019DA5DFC296A8981C9F1EE50',
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
    aggregate: 'movies',
    pipeline: [
      { '$match': { 'imdb.rating': { '$gt': 8.5 } } },
      {
        '$group': { _id: '$year', averageRating: { '$avg': '$imdb.rating' } }
      },
      { '$sort': { averageRating: -1 } }
    ],
    cursor: {},
    '$db': 'sample_mflix'
  },
  ok: 1
}