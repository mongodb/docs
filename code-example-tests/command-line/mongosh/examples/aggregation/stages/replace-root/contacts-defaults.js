// :snippet-start: replace-root-defaults
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
// :snippet-end:
