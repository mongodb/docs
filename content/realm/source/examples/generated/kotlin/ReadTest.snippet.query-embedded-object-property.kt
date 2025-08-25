// Use dot notation to access the embedded object properties as if it
// were in a regular nested object
val filterEmbeddedObjectProperty =
    realm.query<Contact>("address.street == '123 Pond St'")

// You can also access properties nested within the embedded object
val queryNestedProperty = realm.query<Contact>()
    .query("address.propertyOwner.name == $0", "Mr. Frog")
