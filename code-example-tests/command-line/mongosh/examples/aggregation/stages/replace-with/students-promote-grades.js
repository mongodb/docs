// :snippet-start: replace-with-promote-grades
db.students.aggregate( [
   { $unwind: "$grades" },
   { $match: { "grades.grade" : { $gte: 90 } } },
   { $replaceWith: "$grades" }
] )
// :snippet-end:
