db.runCommand( {
    aggregate: "movies",
    pipeline: [
       { $match: {
            $expr: { 
               $and: [
                  { $gte: [ "$imdb.rating", "$$minRating" ] },
                  { $gte: [ "$runtime", "$$minRuntime" ] }
               ]
            }
       } },
       { $project: { 
            title: 1, 
            year: 1, 
            "imdb.rating": 1, 
            runtime: 1 
       } },
       { $sort: { "imdb.rating": -1 } },
       { $limit: 3 }
     ],
     cursor: {},
     let: { minRating: 8.5, minRuntime: 120 }
} )
