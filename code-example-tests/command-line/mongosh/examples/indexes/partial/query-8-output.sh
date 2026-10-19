{
  queryPlanner: {
    namespace: 'sample_mflix.movies',
    winningPlan: {
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: {
          year: 1
        },
        indexName: 'year_gt_2000_partial',
        isPartial: true,
        '...': '...'
      },
      '...': '...'
    },
    '...': '...'
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 713,
    totalKeysExamined: 713,
    totalDocsExamined: 713,
    '...': '...'
  },
  '...': '...'
}