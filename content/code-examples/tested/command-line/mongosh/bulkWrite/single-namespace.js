db.adminCommand( {
   bulkWrite: 1,

   // The ops array contains the insert, update, and delete
   // operations.
   ops: [

      // Specify the namespace ID index immediately after
      // the insert, update, and delete text.
      // For example, "insert: 0" specifies the 0 namespace ID index,
      // which is the "sample_mflix.users" namespace in nsInfo at the end
      // of the example.

      // Insert a user.
      { insert: 0, document: {
         _id: ObjectId("67a1b2c3d4e5f6a7b8c9d0e1"),
         name: "Tyrion Lannister",
         email: "tyrion.lannister@example.com",
         password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
      } },

      // Update the email for a user named Ned Stark.
      { update: 0, filter: { name: "Ned Stark" },
        updateMods: { $set: { email: "ned.stark.updated@example.com" } } },

      // Delete a user with a specific _id.
      { delete: 0, filter: { _id: ObjectId("67a1b2c3d4e5f6a7b8c9d0e1") } }
   ],

   // The nsInfo array contains the namespace to apply the
   // previous operations to.
   nsInfo: [
      { ns: "sample_mflix.users" }  // Namespace ID index is 0.
   ]
} )