db.users.insertMany( [
   // This document has a password field, so the index includes it and
   // the unique constraint applies to its email address
   { name: "Jon Snow", email: "jon@example.com", password: "example123" },

   // This document does not have a password field, so the index does not
   // include it. You can insert it even though it has the same email
   // address as the first document
   { name: "Jon Snow", email: "jon@example.com" }
] )