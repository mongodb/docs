realm.write {
    // Instantiate a new unmanaged Forest object with to-many
    // relationship with multiple Realm objects
    val forest = Forest().apply {
        name = "Froggy Forest"
        frogsThatLiveHere = realmSetOf(
            Frog().apply { name = "Kermit" },
            Frog().apply { name = "Froggy Jay" }
        )
        nearbyPonds = realmListOf(
            Pond().apply { name = "Small Picnic Pond" },
            Pond().apply { name = "Big Pond" }
        )
    }
    // Copy all objects to the realm to return managed instances
    copyToRealm(forest)
}
