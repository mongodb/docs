db.movies.deleteOne(
   { $expr: { $lt: ["$year", "$$cutoffYear"] } },
   {
      let: { cutoffYear: 1910 },
      maxTimeMS: 3000
   }
)
