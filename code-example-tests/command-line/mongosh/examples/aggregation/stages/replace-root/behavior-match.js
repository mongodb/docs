// :snippet-start: replace-root-match-name
db.collection.aggregate([
   { $match: { name : { $exists: true, $not: { $type: "array" }, $type: "object" } } },
   { $replaceRoot: { newRoot: "$name" } }
])
// :snippet-end:
