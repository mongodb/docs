// :snippet-start: delete-with-write-concern
db.movies.deleteMany(
    { "rated": "G", "year": { $lt: 1950 } },
    { writeConcern: { w: "majority", wtimeout: 100 } }
)
// :snippet-end:
