{
  queryPlanner: {
    namespace: 'sample_mflix.movies',
    winningPlan: {
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: {
          year: 1,
          rated: 1
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
    totalKeysExamined: 246,
    totalDocsExamined: 235,
    '...': '...'
  },
  '...': '...'
}
