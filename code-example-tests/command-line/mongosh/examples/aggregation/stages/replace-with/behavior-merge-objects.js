// :snippet-start: replace-with-merge-name
db.collection.aggregate([
   { $replaceWith: { $mergeObjects: [ { _id: "$_id", first: "", last: "" }, "$name" ] } }
])
// :snippet-end:
