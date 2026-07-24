// :snippet-start: replace-with-ifnull-name
db.collection.aggregate([
   { $replaceWith: { $ifNull: [ "$name", { _id: "$_id", missingName: true} ] } }
])
// :snippet-end:
