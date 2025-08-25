realm.write {
    val parentObject = query<Contact>("_id == $0", PRIMARY_KEY_VALUE).find().first()
    val embeddedChildObject = parentObject.address

    // Update a property through the embedded child object
    embeddedChildObject?.propertyOwner?.name = "Michigan J. Frog"
    // Update a property through the parent object
    parentObject.address?.country?.name = "Brazil"

    // Update multiple properties
    val embeddedAddress = query<EmbeddedAddress>("street == $0", "123 Pond St").find().first()
    embeddedAddress.apply {
        propertyOwner?.name = "Kermit Sr."
        street = "456 Lily Pad Ln"
        country?.name = "Canada"
    }
}
