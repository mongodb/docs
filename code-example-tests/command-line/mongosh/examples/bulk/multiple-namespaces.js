db.adminCommand( {
   bulkWrite: 1,

   // The ops array contains the insert, update, and delete
   // operations.
   ops: [

      // Specify the namespace ID indexes immediately after
      // the insert, update, and delete. For example, "insert: 0"
      // specifies the 0 namespace ID index, which is the "sample_mflix.users"
      // namespace. And, "insert: 1" specifies "sample_mflix.theaters".

      // Insert users.
      // Namespace ID is 0 for "sample_mflix.users", which
      // is specified as "insert: 0".
      { insert: 0, document: {
         _id: ObjectId("67a1b2c3d4e5f6a7b8c9d0e7"),
         name: "Sansa Stark",
         email: "sansa.stark@example.com",
         password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
      } },
      { insert: 0, document: {
         _id: ObjectId("67a1b2c3d4e5f6a7b8c9d0e8"),
         name: "Bran Stark",
         email: "bran.stark@example.com",
         password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
      } },

      // Update the email for a user.
      { update: 0, filter: { name: "Ned Stark" },
        updateMods: { $set: { email: "lord.stark@example.com" } } },

      // Delete users with a specific email pattern.
      { delete: 0, filter: { email: { $regex: "bran.stark" } } },

      // Update theaters.
      // Namespace ID is 1 for "sample_mflix.theaters".
      { update: 1, filter: { theaterId: 1000 },
        updateMods: { $set: { "location.address.city": "Minneapolis" } } },

      // Delete a theater with a specific _id.
      { delete: 1, filter: { _id: ObjectId("59a47286cfa9a3a73e51e72c") } },

      // Delete theaters in a specific state.
      { delete: 1, filter: { "location.address.state": "VT" }, multi: true }
   ],

   // Namespaces
   nsInfo: [
      { ns: "sample_mflix.users" }, // Namespace ID index is 0.
      { ns: "sample_mflix.theaters" }  // Namespace ID index is 1.
   ]
} )