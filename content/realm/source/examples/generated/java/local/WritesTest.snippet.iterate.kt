val frogs = realm.where(Frog::class.java)
    .equalTo("species", "bullfrog")
    .findAll()

// Use an iterator to rename the species of all bullfrogs
realm.executeTransaction {
    for (frog in frogs) {
        frog.species = "Lithobates catesbeiana"
    }
}

// Use a snapshot to rename the species of all bullfrogs
realm.executeTransaction {
    val frogsSnapshot = frogs.createSnapshot()
    for (i in frogsSnapshot.indices) {
        frogsSnapshot[i]!!.species = "Lithobates catesbeiana"
    }
}
