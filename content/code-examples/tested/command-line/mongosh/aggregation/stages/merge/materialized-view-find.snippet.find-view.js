db.movieYearStats.find( { _id: { $lte: 2016 } } ).sort( { _id: 1 } )
