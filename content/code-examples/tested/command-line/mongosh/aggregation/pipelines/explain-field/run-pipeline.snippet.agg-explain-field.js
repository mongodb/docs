db.comments.aggregate(
     [
        { $match: { date: { $gte: ISODate("2015-01-01") } } },
        { $group: { _id: "$movie_id", commentCount: { $sum: 1 } } },
        { $sort: { commentCount: -1 } }
     ],
     { explain: true }
)
