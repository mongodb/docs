// :snippet-start: exists-and-not-equal
db.movies.find( { rated: { $exists: true, $nin: [ "R", "PG-13" ] } } ).limit(5)
// :snippet-end:
