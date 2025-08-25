realm.write {
    // Instantiate a parent object with multiple embedded addresses
    val localOffice = EmbeddedAddress().apply {
        propertyOwner = Contact().apply { name = "Michigan J. Frog" }
        street = "456 Lily Pad Ln"
        country = EmbeddedCountry().apply { name = "United States" }
    }
    val remoteOffice = EmbeddedAddress().apply {
        propertyOwner = Contact().apply { name = "Mr. Toad" }
        street = "789 Leaping Frog Ave"
        country = EmbeddedCountry().apply { name = "Ireland" }
    }
    val business = Business().apply {
        name = "Big Frog Corp."
        addresses = realmListOf(localOffice, remoteOffice)
    }
    // Copy all objects to the realm to return managed instances
    copyToRealm(business)
}
