db.movies.updateMany(
   { rated: { $in: ["G", "TV-G"] } },
   { $set: { familyFriendly: true } }
)
