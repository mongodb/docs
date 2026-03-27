// :snippet-start: in-update
db.movies.updateMany(
   { rated: { $in: ["G", "TV-G"] } },
   { $set: { familyFriendly: true } }
)
// :snippet-end:
