// :snippet-start: replace-root-merge-name
db.collection.aggregate([
   { $replaceRoot: { newRoot: { $mergeObjects: [ { _id: "$_id", first: "", last: "" }, "$name" ] } } }
])
// :snippet-end:
