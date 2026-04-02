db.movies.updateMany(
   { 
      year: { $gt: 2020 }, 
      directors: "Christopher Nolan" 
   },
   { $set: { "upcomingRelease": true } },
   { upsert: true }
)
