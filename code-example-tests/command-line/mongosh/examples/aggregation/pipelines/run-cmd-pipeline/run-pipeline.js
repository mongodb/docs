// :snippet-start: run-cmd-pipeline
db.runCommand( {
    aggregate: "movies", 
    pipeline: [
       { $project: { genres: 1 } },
       { $unwind: "$genres" },
       { $group: { _id: "$genres", count: { $sum : 1 } } }
    ],
    cursor: { }
} )
// :snippet-end: