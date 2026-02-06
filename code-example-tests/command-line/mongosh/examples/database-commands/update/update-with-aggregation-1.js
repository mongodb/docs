db.runCommand(
   {
      update: "users",
      updates: [
         { 
            q: { name: "Robert Baratheon" },  
            u: [ 
               { $set: { full_info: { $concat: [ "$name", " - ", "$email" ] } } },
               { $set: { status: "active" } }
            ], 
            multi: false
         }
      ],
      ordered: false,
      writeConcern: { w: "majority", wtimeout: 5000 }
   }
)