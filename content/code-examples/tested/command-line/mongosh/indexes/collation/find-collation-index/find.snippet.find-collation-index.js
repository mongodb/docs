db.movies.find( 
    { title: "Les Misèrables" },
    { title: 1, year: 1 }
).collation( { locale: "fr" } )
