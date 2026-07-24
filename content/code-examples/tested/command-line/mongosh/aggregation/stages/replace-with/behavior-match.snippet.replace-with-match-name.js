db.collection.aggregate([
   { $match: { name : { $exists: true, $not: { $type: "array" }, $type: "object" } } },
   { $replaceWith: "$name" }
])
