realm.write {
    // Instantiate a new unmanaged Frog object with a RealmInstant property
    val frog = Frog().apply {
        name = "Kermit"
        // Set an initial value with RealmInstant.from() or RealmInstant.now()
        birthdate = RealmInstant.from(1_577_996_800, 0)
    }
    // Copy the object to the realm to return a managed instance
    copyToRealm(frog)
}
