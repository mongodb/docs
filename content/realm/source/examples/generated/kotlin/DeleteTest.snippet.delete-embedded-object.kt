// Delete an embedded object directly
realm.write {
    val addressToDelete = query<EmbeddedAddress>("street == $0", "456 Lily Pad Ln").find().first()
    // Delete the embedded object (nullifies the parent property)
    delete(addressToDelete)
}
// Delete an embedded object through the parent
realm.write {
    val propertyToClear = query<Contact>("name == $0", "Kermit").find().first()
    // Clear the parent property (deletes the embedded object instance)
    propertyToClear.address = null
}
