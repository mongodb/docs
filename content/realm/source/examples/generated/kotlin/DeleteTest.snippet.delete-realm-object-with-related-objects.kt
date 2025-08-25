// Open a write transaction
realm.write {
    // Query for the parent frog object with ponds
    val parentObject = query<Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
    assertEquals(2, parentObject.favoritePonds.size)

    // Delete the frog and all references to ponds
    delete(parentObject)

    // Confirm pond objects are still in the realm
    val ponds = query<Pond>().find()
    assertEquals(2, ponds.size)
}
