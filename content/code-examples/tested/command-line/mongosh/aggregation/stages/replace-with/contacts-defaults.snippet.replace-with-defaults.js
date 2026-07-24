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
