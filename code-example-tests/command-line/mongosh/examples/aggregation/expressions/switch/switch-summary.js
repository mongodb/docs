// :snippet-start: switch-summary
db.movies.aggregate( [
   { $match: { runtime: { $gt: 800 } } },
   {
      $project:
        {
          _id: 0,
          title: 1,
          summary:
            {
              $switch:
                {
                  branches: [
                    {
                      case: { $gte: [ "$imdb.rating", 9 ] },
                      then: "Doing great!"
                    },
                    {
                      case: { $and: [ { $gte: [ "$imdb.rating", 8 ] },
                                       { $lt: [ "$imdb.rating", 9 ] } ] },
                      then: "Doing pretty well."
                    },
                    {
                      case: { $lt: [ "$imdb.rating", 8 ] },
                      then: "Needs improvement."
                    }
                  ],
                  default: "No rating found."
                }
            }
        }
   },
   { $sort: { title: 1 } }
] )
// :snippet-end:
