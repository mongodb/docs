db.movies.aggregate( [
   // Stage 1: Match documents with the Drama genre
   { $match: { genres: "Drama" } },

   // Stage 2: Sort documents from oldest to newest
   { $sort: { year: 1 } },

   // Stage 3: Limit the results to 3 documents
   { $limit: 3 },

   // Stage 4: Project only the fields needed for the result
   { $project: { _id: 0, title: 1, year: 1, directors: 1, runtime: 1 } }
] )
