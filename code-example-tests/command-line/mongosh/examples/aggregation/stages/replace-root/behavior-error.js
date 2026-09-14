// :snippet-start: replace-root-error-missing-name
db.collection.aggregate([
   { $replaceRoot: { newRoot: "$name" } }
])
// :snippet-end:
