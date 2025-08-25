realm.writeBlocking {
    // Fetch the managed object you want to copy
    val managedPond = query<Pond>("name == $0", "Big Pond").find().first()
    assertTrue(managedPond.isManaged())

    // Create an unmanaged copy of the object
    val unmanagedPond = copyFromRealm(managedPond)
    assertFalse(unmanagedPond.isManaged())
    Log.v("Unmanaged pond name: ${unmanagedPond.name}")

    // Confirm the unmanaged copy contains all elements
    // in the copied object's RealmList
    val unmanagedFrogs = unmanagedPond.frogsThatLiveHere
    assertFalse(unmanagedFrogs[0].isManaged())
    assertFalse(unmanagedFrogs[1].isManaged())
    assertEquals(2, unmanagedFrogs.size)
    Log.v("Unmanaged frogs: ${unmanagedFrogs[0].name}, ${unmanagedFrogs[1].name}")
}
