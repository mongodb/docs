// :snippet-start: null-missing-values
db.aggregate( [
   {
      $documents: [
         { playerId: "PlayerA", gameId: "G1", score: 1 },
         { playerId: "PlayerB", gameId: "G1", score: 2 },
         { playerId: "PlayerC", gameId: "G1", score: 3 },
         { playerId: "PlayerD", gameId: "G1"},
         { playerId: "PlayerE", gameId: "G1", score: null }
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
                     sortBy: { "score": 1 }
                  }
            }
      }
   }
] )
// :snippet-end:
