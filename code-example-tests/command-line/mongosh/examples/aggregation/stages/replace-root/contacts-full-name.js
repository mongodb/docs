// :snippet-start: replace-root-full-name
db.contacts.aggregate( [
   {
      $replaceRoot: {
         newRoot: {
            full_name: {
               $concat : [ "$first_name", " ", "$last_name" ]
            }
         }
      }
   }
] )
// :snippet-end:
