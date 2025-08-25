// Open a write transaction
realm.write {
    // Create a parent object with one embedded address
    val contact = RealmObject_Contact().apply {
        name = "Kermit"
        address = ExampleEmbeddedObject_EmbeddedAddress().apply {
            street = "123 Pond St"
            city = "Big Forest"
            state = "MA"
            postalCode = "12345"
            propertyOwner = RealmObject_Contact().apply {
                name = "Mr. Frog"
            }
        }
    }
    // Copy the object to realm to return a managed instance
    copyToRealm(contact)

    // Create a parent object with multiple embedded addresses
    val localOffice = ExampleEmbeddedObject_EmbeddedAddress().apply {
        street = "456 Lily Pad Ln"
        city = "Small Village"
        state = "MA"
        postalCode = "12345"
        propertyOwner = RealmObject_Contact().apply {
            name = "Michigan J. Frog"
        }
    }
    val remoteOffice = ExampleEmbeddedObject_EmbeddedAddress().apply {
        street = "789 Leaping Frog Ave"
        city = "Big City"
        state = "MA"
        postalCode = "12345"
        propertyOwner = RealmObject_Contact().apply {
            name = "Mr. Toad"
        }
    }
    val business = RealmObject_Business().apply {
        name = "Big Frog Corp."
        addresses = realmListOf(localOffice, remoteOffice)
    }
    // Copy the object to realm to return a managed instance
    copyToRealm(business)
}
