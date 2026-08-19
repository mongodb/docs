{
  queryPlanner: {
    namespace: 'sample_mflix.movies',
    parsedQuery: {
      year: {
        '$gt': 2010
      }
    },
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
  '...': '...'
}