db.movies.find( { "awards.nominations": { $gt: 5 } }, { title: 1 } )
