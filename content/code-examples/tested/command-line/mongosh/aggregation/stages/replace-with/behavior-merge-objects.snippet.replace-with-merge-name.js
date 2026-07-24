db.collection.aggregate([
   { $replaceWith: { $mergeObjects: [ { _id: "$_id", first: "", last: "" }, "$name" ] } }
])
