db.contacts.aggregate( [
   { $replaceRoot:
      { newRoot:
         { $mergeObjects:
             [
                { _id: "", name: "", email: "", cell: "", home: "" },
                "$$ROOT"
             ]
          }
      }
   }
] )
