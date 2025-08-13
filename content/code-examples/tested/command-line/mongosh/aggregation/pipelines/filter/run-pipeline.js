db.persons.aggregate( [
   // Stage 1: Match documents of people who are engineers
   { $match: { "vocation": "ENGINEER" } },

   // Stage 2: Sort documents from youngest to oldest
   { $sort: { "dateofbirth": -1 } },

   // Stage 3: Limit the results to 3 documents
   { $limit: 3 },

   // Stage 4: Remove unneeded fields
   { $unset: [ "_id", "address"] }
] )