db.runCommand(
   {
      update: "movies",
      updates: [
         { 
            q: { title: "The Great Train Robbery" },  
            u: [ 
                  { $set: { age: { $subtract: [ 2026, "$year" ] } } },
                  { $set: { era: { $switch: { 
                                       branches: [
                                             { case: { $lt: [ "$year", 1960 ] }, then: "Classic" },
                                             { case: { $lt: [ "$year", 1980 ] }, then: "Golden Age" },
                                             { case: { $lt: [ "$year", 2000 ] }, then: "Modern" },                                                   
                                             { case: { $gte: [ "$year", 2000 ] }, then: "Contemporary" }
                                       ],
                                       default: "Unknown" 
                  } } } } 
            ], 
            multi: false
         }
      ],
      ordered: false,
      writeConcern: { w: "majority", wtimeout: 5000 }
   }
)