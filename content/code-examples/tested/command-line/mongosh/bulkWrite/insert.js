db.users.bulkWrite( [
   { insertOne: { 
      document: { 
         _id: ObjectId("67a1b2c3d4e5f6a7b8c9d0e2"),
         name: "Daenerys Targaryen",
         email: "daenerys.t@example.com",
         password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
      } 
   } },
   { insertOne: { 
      document: { 
         _id: ObjectId("67a1b2c3d4e5f6a7b8c9d0e3"),
         name: "Jaime Lannister",
         email: "jaime.l@example.com",
         password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
      } 
   } },
   { updateOne: {
      filter: { name: "Ned Stark" },
      update: { $set: { email: "ned.stark.updated@example.com" } }
   } },
   { deleteOne: { filter: { name: "Daenerys Targaryen" } } },
   { replaceOne: {
      filter: { name: "Jaime Lannister" },
      replacement: { 
         name: "Jaime Lannister",
         email: "jaime.lannister.new@example.com",
         password: "$2b$12$NewPasswordHashHere123456789012345678901234567890"
      }
   } }
] )