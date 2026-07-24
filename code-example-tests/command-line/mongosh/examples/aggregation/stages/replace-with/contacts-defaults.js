// :snippet-start: replace-with-defaults
db.contacts.aggregate( [
   { $replaceWith:
      { $mergeObjects:
         [
            { _id: "", name: "", email: "", cell: "", home: "" },
            "$$ROOT"
         ]
      }
   }
] )
// :snippet-end:
