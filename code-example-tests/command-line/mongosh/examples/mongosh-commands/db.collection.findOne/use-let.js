// :snippet-start: use-let
db.movies.findOne(
   { $expr: { $eq: [ "$title", "$$targetTitle" ] } },
   { _id: 0, title: 1, year: 1 },
   { let : { targetTitle: "The Godfather" } }
)
// :snippet-end:
