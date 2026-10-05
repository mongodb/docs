db.aggregate( [
   {
      $documents: [
         { playerId: "PlayerA", gameId: "G1", score: 1 },
         { playerId: "PlayerB", gameId: "G1", score: "2" },
         { playerId: "PlayerC", gameId: "G1", score: "" }
      ]
   },
   {
      $group:
         {
            _id: "$gameId",
            playerId:
               {
                  $top:
                  {
                     output: [ "$playerId", "$score" ],
                     sortBy: { "score": -1 }
                  }
               }
         }
   }
] )
