// :snippet-start: find-compound-index-year-partial 
db.movies.find( { year: 2012, title: "Les Misèrables" }, { year: 1, title: 1 } )
// :snippet-end:
