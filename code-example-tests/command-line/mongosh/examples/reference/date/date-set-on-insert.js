// :snippet-start: date-set-on-insert
db.movies.updateOne(
   { title: "Upsert Demo Film 2099" },
   {
     $set: { genre: "Drama" },
     $setOnInsert: { dateAdded: new Date() }
   },
   { upsert: true }
)
// :snippet-end:
