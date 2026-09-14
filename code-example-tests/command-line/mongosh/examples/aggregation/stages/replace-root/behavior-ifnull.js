// :snippet-start: replace-root-ifnull-name
db.collection.aggregate([
   { $replaceRoot: { newRoot: { $ifNull: [ "$name", { _id: "$_id", missingName: true} ] } } }
])
// :snippet-end:
