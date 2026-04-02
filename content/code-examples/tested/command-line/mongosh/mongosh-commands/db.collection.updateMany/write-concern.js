db.movies.updateMany(
    { title: "The Godfather" },
    { $inc: { num_mflix_comments: 10 }, $set: { trending: true } },
    { w: "majority", wtimeout: 100 }
)
