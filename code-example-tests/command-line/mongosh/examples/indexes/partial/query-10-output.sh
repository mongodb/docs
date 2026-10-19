{
  queryPlanner: {
    namespace: 'sample_mflix.movies',
    winningPlan: {
      stage: 'COLLSCAN',
      '...': '...'
    },
    '...': '...'
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 15902,
    totalKeysExamined: 0,
    totalDocsExamined: 21349,
    executionStages: {
      stage: 'COLLSCAN',
      '...': '...'
    },
    '...': '...'
  },
  '...': '...'
}