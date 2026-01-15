db.movies.find(
   { title: 'The Ace of Hearts', genres: 'Drama' },
   { _id: 0, title: 1 }
)
