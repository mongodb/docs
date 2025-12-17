db.movies.aggregate(
  [
    {
        $match : {
            "directors" : { $exists: true, $ne: null, $not: {$size: 0} }
        }
    },
    {
        $unwind : "$directors"
    },
    {
        $group : {
        _id : "$directors",
        movieCount : {
            $sum: 1
            }
        }
    },
    {
        $sort : {
            movieCount : -1
        }
    },
    {
        $limit : 3
    }
  ]
)
