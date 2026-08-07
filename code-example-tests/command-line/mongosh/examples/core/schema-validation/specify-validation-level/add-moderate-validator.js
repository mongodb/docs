// :snippet-start: add-moderate-validator
db.runCommand( {
   collMod: "movies",
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "title" ],
      properties: {
         title: {
            bsonType: "string",
            description: "title must be a string and is required"
         }
      }
   } },
   validationLevel: "moderate"
} )
// :snippet-end:
