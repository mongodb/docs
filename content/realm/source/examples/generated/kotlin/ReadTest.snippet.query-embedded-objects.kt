// Use dot notation to access the embedded object properties as if it
// were in a regular nested object
val queryEmbeddedObjectProperty =
    realm.query<Contact>("address.street == '123 Pond St'").find().first()
