// :snippet-start: replace-with-match-name
db.collection.aggregate([
   { $match: { name : { $exists: true, $not: { $type: "array" }, $type: "object" } } },
   { $replaceWith: "$name" }
])
// :snippet-end:
