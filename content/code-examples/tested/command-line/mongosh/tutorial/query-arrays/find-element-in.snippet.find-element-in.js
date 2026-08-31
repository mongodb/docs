db.movies.find( { genres: { $in: [ "Documentary", "History" ] } } ).limit(5)
