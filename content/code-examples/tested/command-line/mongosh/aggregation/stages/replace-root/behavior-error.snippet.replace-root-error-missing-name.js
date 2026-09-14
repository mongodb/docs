db.collection.aggregate([
   { $replaceRoot: { newRoot: "$name" } }
])
