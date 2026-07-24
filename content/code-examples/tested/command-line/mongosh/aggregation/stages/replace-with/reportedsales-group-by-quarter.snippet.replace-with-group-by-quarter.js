db.reportedsales.aggregate( [
   { $addFields: { obj:  { k: "$region", v: "$qty" } } },
   { $group: { _id: "$quarter", items: { $push: "$obj" } } },
   { $project: { items2: { $concatArrays: [ [ { "k": "_id", "v": "$_id" } ], "$items" ] } } },
   { $replaceWith: { $arrayToObject: "$items2" } }
] )
