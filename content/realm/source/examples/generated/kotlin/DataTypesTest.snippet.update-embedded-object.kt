// Modify embedded object properties in a write transaction
realm.write {
    // Fetch the objects
    val addressToUpdate = findLatest(address) ?: error("Cannot find latest version of embedded object")
    val contactToUpdate = findLatest(contact) ?: error("Cannot find latest version of parent object")

    // Update a single embedded object property directly
    addressToUpdate.street = "100 10th St N"

    // Update multiple properties
    addressToUpdate.apply {
        street = "202 Coconut Court"
        city = "Los Angeles"
        state = "CA"
        postalCode = "90210"
    }

    // Update property through the parent object
    contactToUpdate.address?.state = "NY"
}
