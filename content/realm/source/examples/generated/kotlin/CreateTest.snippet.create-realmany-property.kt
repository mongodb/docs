realm.write {
    // Instantiate a new unmanaged Frog object with a RealmAny property
    val frog = Frog().apply {
        name = "Kermit"
        // Set initial values with RealmAny.create()
        favoriteThings = realmListOf(
            RealmAny.create(42),
            RealmAny.create("rainbows"),
            RealmAny.create(Frog().apply {
                name = "Kermit Jr."
            })
        )
    }
    // Copy the object to the realm to return a managed instance
    copyToRealm(frog)
}
