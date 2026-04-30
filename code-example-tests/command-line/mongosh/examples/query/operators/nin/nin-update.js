(
  // :snippet-start: nin-update
  db.movies.updateMany(
     { genres: { $nin: [ "Drama" ] } },
     { $set: { exclude: true } }
  )
  // :snippet-end:
  ,
  db.movies.findOne(
     { exclude: true },
     { _id: 0, exclude: 1 }
  )
)
