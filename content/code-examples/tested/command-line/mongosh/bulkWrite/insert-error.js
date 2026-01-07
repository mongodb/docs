db.users.bulkWrite( [
   { insertOne: { 
      document: { 
         _id: ObjectId("67a1b2c3d4e5f6a7b8c9d0e9"),
         name: "Sansa Stark",
         email: "sansa.stark@example.com",
         password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
      } 
   } },
   // This insert operation with the same _id value as the one above will fail
   // { insertOne: { 
   //    document: { 
   //       _id: ObjectId("67a1b2c3d4e5f6a7b8c9d0e9"), // Duplicate _id value
   //       name: "Bran Stark",
   //       email: "bran.stark@example.com",
   //       password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
   //    } 
   // } },
   { updateOne: {
      filter: { name: "Catelyn Stark" },
      update: { $set: { email: "cat.stark@example.com" } }
   } },
   { deleteOne: { filter: { name: "Ned Stark" } } },
   { replaceOne: {
      filter: { name: "Robb Stark" },
      replacement: { 
         name: "Robb Stark",
         email: "robb.stark@example.com",
         password: "$2b$12$NewPasswordHashHere123456789012345678901234567890"
      }
   } }
],
{ ordered: false } 
)