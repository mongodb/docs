db.runCommand(
   {
      update: "movies",
      updates: [
         { 
            q: { year: 1924 }, 
            u: { $inc: { num_mflix_comments: 1 }, $set: { classic: true, era: "silent" } }, 
            multi: true 
         }
      ],
      ordered: false,
      writeConcern: { w: "majority", wtimeout: 5000 }
   }
)