db.theaters.aggregate( 
    [
       { $match: { "location.address.state": "NY" } },
       { $group: { _id: "$location.address.city", theaterCount: { $sum: 1 } } },
       { $sort: { theaterCount: -1 } },
       { $limit: 2 }
    ],
    { cursor: { batchSize: 0 } }
)
