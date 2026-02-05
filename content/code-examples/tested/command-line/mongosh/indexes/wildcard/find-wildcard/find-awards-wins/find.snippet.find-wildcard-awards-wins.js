db.movies.find( { "awards.wins": { $gt: 1 } }, { title: 1 } )
