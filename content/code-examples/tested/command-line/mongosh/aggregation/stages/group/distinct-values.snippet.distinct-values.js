db.movies.aggregate( [ { $group : { _id : "$rated" } } ] )
