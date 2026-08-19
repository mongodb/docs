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
        '...': '...'
      },
      '...': '...'
    },
    '...': '...'
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 3809,
    totalKeysExamined: 3809,
    totalDocsExamined: 3809,
    '...': '...'
  },
  '...': '...'
}
