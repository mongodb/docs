// :snippet-start: insert-only
db.movies.aggregate( [
   { $match: { metacritic: 100, rated: { $ne: null },
     year: { $gte: 1963 } } },
   { $group: { _id: "$year",
     titles: { $push: "$title" } } },
   { $project: { _id: 0, year: "$_id", titles: 1 } },
   { $merge : { into: "movieArchive", on: "year",
     whenMatched: "fail" } }
] )
// :snippet-end:
// :remove-start:
,

db.movieArchive.find().sort( { year: 1 } )
// :remove-end:
