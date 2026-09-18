// :snippet-start: coll-stats-scale
db.runCommand( { collStats : "movies", scale: 1024 } )
// :snippet-end:
