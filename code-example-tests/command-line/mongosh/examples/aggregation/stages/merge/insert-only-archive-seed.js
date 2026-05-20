// :snippet-start: insert-only-archive-seed
db.movieArchive.insertMany( [
   { _id : ObjectId("5cd8c68261baa09e9f3622be"),
     "titles" : [ "The Wizard of Oz" ], "year" : 1939 },
   { _id : ObjectId("5cd8c68261baa09e9f3622bf"),
     "titles" : [ "Lawrence of Arabia" ], "year" : 1962 }
] )
// :snippet-end:
