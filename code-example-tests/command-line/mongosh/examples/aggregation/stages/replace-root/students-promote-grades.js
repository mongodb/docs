// :snippet-start: replace-root-promote-grades
db.students.aggregate( [
   { $unwind: "$grades" },
   { $match: { "grades.grade" : { $gte: 90 } } },
   { $replaceRoot: { newRoot: "$grades" } }
] )
// :snippet-end:
