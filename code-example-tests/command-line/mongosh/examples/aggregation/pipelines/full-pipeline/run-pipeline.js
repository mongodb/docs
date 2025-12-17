// :snippet-start: full-pipeline
db.movies.aggregate(
  [
    // :snippet-start: match-stage
    {
        $match : {
            "directors" : { $exists: true, $ne: null, $not: {$size: 0} }
        }
    },
    // :snippet-end: 
    // :snippet-start: unwind-stage
    {
        $unwind : "$directors"
    },
    // :snippet-end:
    // :snippet-start: group-stage
    {
        $group : {
        _id : "$directors",
        movieCount : {
            $sum: 1
            }
        }
    },
    // :snippet-end:
    // :snippet-start: sort-stage
    {
        $sort : {
            movieCount : -1
        }
    },
    // :snippet-end:
    // :snippet-start: limit-stage
    {
        $limit : 3
    }
    // :snippet-end:
  ]
)
// :snippet-end: