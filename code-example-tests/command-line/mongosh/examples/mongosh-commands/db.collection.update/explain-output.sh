{
  command: {
    update: 'movies',
    updates: [
      {
        q: { title: 'The Godfather', year: { '$gte': 1970 } },
        u: { '$set': { test_hint_field: true } },
        hint: { year: 1 }
      }
    ],
    ordered: true,
    '$db': 'sample_mflix'
  },
  '...': '...'
}