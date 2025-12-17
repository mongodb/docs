// :snippet-start: p-u-g-agg
db.movies.aggregate( 
	[
       { $project: { genres: 1 } },
       { $unwind: "$genres" },
       { $group: { _id: "$genres", count: { $sum: 1 } } }
    ]
)
// :snippet-end: 
