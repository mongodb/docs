db.collection.aggregate([
   { $replaceWith: { $ifNull: [ "$name", { _id: "$_id", missingName: true} ] } }
])
