// Open a write transaction
realm.write {
    // Instantiate a new unmanaged Frog object
    val unmanagedFrog = Frog().apply {
        name = "Kermit"
        age = 42
        owner = "Jim Henson"
    }
    assertFalse(unmanagedFrog.isManaged())

    // Copy the object to realm to return a managed instance
    val managedFrog = copyToRealm(unmanagedFrog)
    assertTrue(managedFrog.isManaged())

    // Work with the managed object ...
}
