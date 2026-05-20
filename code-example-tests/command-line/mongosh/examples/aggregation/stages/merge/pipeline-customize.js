// :snippet-start: pipeline-customize
db.comments.aggregate([
   { $match: { date: { $gte: new Date("1970-01-15"),
     $lt: new Date("1970-01-16") } } },
   { $group: { _id: { $dateToString: { format: "%Y-%m",
     date: "$date" } }, count: { $sum: 1 } } },
   { $merge: {
         into: "monthlyCommentTotals",
         on: "_id",
         whenMatched: [
            { $addFields: {
               count: { $add: [ "$count", "$$new.count" ] }
            } }
         ],
         whenNotMatched: "insert"
   } }
])
// :snippet-end:
