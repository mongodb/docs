db.runCommand(
   {
      update: "movies",
      updates: [
         // Update highly-rated Horror movies from 2015
         { 
            q: { year: 2015, genres: "Horror", "imdb.rating": { $gte: 7 } }, 
            u: { $set: { featured: true } },
            multi: true
         },
         // Update short Drama/Romance movies from 2012
         { 
            q: { year: 2012, genres: { $all: ["Drama", "Romance"] }, runtime: { $lt: 90 } }, 
            u: { $set: { category: "melodrama" } },
            multi: true
         },
         // Upsert a new movie from 2026
         { 
            q: { title: "A New Movie", year: 2026 }, 
            u: { 
               $set: { 
                  genres: ["Sci-Fi", "Adventure"],
                  runtime: 142,
                  "imdb.rating": 8.5,
                  featured: true
               }
            },
            upsert: true
         }
      ],
      ordered: false,
      writeConcern: { w: "majority", wtimeout: 5000 }
   }
)