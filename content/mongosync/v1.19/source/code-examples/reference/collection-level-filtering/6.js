use library
db.books.aggregate( [
   { $group : { _id : "$author", titles: { $push: "$title" } } },
   { $out : "authors" }
] )
