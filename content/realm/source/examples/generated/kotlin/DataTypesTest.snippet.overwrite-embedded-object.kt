// Overwrite the embedded object in a write transaction
realm.write {
    // Fetch the parent object
    val parentObject: Contact =
        realm.query<Contact>("name == 'Nick Riviera'").find().first()

    // Overwrite the embedded object (deletes the existing object)
    parentObject.address = EmbeddedAddress().apply {
        street = "202 Coconut Court"
        city = "Los Angeles"
        state = "CA"
        postalCode = "90210"
    }
}
