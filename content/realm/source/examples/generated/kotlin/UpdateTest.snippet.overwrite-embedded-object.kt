realm.write {
    val parentObject = query<Contact>("_id == $0", PRIMARY_KEY_VALUE).find().first()

    val newAddress = EmbeddedAddress().apply {
        propertyOwner = Contact().apply { name = "Michigan J. Frog" }
        street = "456 Lily Pad Ln"
        country = EmbeddedCountry().apply { name = "Canada" }
    }
    // Overwrite the embedded object with the new instance (deletes the existing object)
    parentObject.address = newAddress
}
