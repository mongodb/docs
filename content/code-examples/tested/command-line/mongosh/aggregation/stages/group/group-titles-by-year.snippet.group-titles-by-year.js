db.movies.aggregate([
   { $match: { year: { $lt: 1910 } } },
   { $group: { _id: "$year", titles: { $push: "$title" } } },
   { $sort: { _id: 1 } }
])
