{
  cursor: {
    id: Long('0'),
    ns: 'sample_mflix.$cmd.listCollections',
    firstBatch: [
      { name: 'movies', type: 'collection' },
      { name: 'theaters', type: 'collection' },
      { name: 'users', type: 'collection' },
      { name: 'embedded_movies', type: 'collection' },
      { name: 'sessions', type: 'collection' },
      { name: 'comments', type: 'collection' },
      { name: 'system.views', type: 'collection' }
    ]
  },
  ok: 1
}
