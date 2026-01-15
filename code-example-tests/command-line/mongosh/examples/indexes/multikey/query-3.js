db.movies.find(
   { genres: 'Drama' },
   { _id: 0, genres: 1 }
).limit(5)