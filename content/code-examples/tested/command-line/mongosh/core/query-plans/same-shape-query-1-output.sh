{
  queryPlanner: {
    namespace: 'sample_mflix.movies',
    parsedQuery: {
      year: {
        '$gt': 1990
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
