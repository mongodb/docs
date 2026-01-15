db.users.insertMany( [
   // This document does NOT have a password field, so it's NOT indexed
   // The unique constraint does not apply to it
   { name: "Jon Snow", email: "jon1@example.com" },
   
   // This document has a password field, so it IS indexed
   // The unique constraint applies to it
   { name: "Sansa Stark", email: "sansa@example.com", password: "password123" },
   
   // This document does NOT have a password field, so it's NOT indexed
   // We can insert it even though it has the same name as the first document
   // This demonstrates that the unique constraint only applies to indexed documents
   { name: "Jon Snow", email: "jon2@example.com" }
] )