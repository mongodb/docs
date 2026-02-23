{
    winningPlan: {
      isCached: false,
      stage: 'UPDATE',
      inputStage: {
        stage: 'FETCH',
        filter: { num_mflix_comments: { '$lte': 5 } },
        inputStage: {
          stage: 'IXSCAN',
          keyPattern: { year: 1 },
          indexName: 'year_1',
          isMultiKey: false,
          multiKeyPaths: { year: [] },
          isUnique: false,
          isSparse: false,
          isPartial: false,
          indexVersion: 2,
          direction: 'forward',
          indexBounds: { year: [ '[2000, inf]' ] }
        }
      }
    },
   '...': '...'
}
