db.movies.distinct( "imdb.rating", { title: { $regex: /^Toy Story/ } } )
