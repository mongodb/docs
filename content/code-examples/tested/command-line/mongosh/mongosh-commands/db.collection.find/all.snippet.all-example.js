db.movies.find( { directors: { $all: ['John Murray Anderson','Pèl Fejès'] } }, { title: 1, directors: 1, year: 1 })
