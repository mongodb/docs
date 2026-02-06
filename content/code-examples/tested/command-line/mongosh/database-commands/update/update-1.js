db.runCommand(
   {
      update: "movies",
      updates: [
         {
            q: { title: "The Godfather" }, u: { $set: { year: 1972 }, $inc: { num_mflix_comments: 1 } }
         }
      ],
      ordered: false,
      writeConcern: { w: "majority", wtimeout: 5000 }
   }
)