db.movies.insertMany([
  {
    "_id": 1,
    "genres": [ "Action", "Drama", "Thriller" ],
    "title": "atomic train",
    "awards": { wins: 1, nominations: 1 }
  },
  {
    "_id": 2,
    "genres": [ "Animation", "Adventure", "Family" ],
    "title": "how to train your dragon",
    "awards": { "wins": 32, "nominations": 51 },
  }
])
