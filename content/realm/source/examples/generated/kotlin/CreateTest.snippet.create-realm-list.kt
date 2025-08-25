realm.write {
    // Instantiate a new unmanaged Frog object with a RealmList property
    val frog = Frog().apply {
        name = "Kermit"
        // Set values for each unmanaged list
        favoritePonds.addAll(realmListOf(
            Pond().apply { name = "Picnic Pond" },
            Pond().apply { name = "Big Pond" }
        ))
        favoriteForests.add(EmbeddedForest().apply { name = "Hundred Acre Wood" })
        favoriteWeather = realmListOf("rain", "snow")
    }
    // Copy all objects to the realm to return managed instances
    copyToRealm(frog)
}
