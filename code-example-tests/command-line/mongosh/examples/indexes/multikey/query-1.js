db.movies.find(
   { genres: 'Drama' },
   { _id: 0, title: 1 }
).sort({ genres: 1 }).limit(5)