{
  queryPlanner: {
    namespace: 'sample_mflix.movies',
    winningPlan: {
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: {
          rated: 1,
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
    nReturned: 235,
    totalKeysExamined: 235,
    totalDocsExamined: 235,
    '...': '...'
  },
  '...': '...'
}
