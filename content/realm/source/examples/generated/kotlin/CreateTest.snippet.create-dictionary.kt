realm.write {
    val frog = Frog().apply {
        name = "Kermit"
        // Set initial key-values to each unmanaged dictionary
        favoriteFriendsByPond = realmDictionaryOf(
            "Picnic Pond" to Frog().apply { name = "Froggy Jay" },
            "Big Pond" to Frog().apply { name = "Mr. Toad" }
        )
        favoriteTreesInForest["Maple"] = EmbeddedForest().apply {
            name = "Hundred Acre Wood"
        }
        favoritePondsByForest.putAll(
            mapOf(
                "Silver Pond" to "Big Forest",
                "Big Lake" to "Elm Wood",
                "Trout Pond" to "Sunny Wood"
            )
        )
    }
    // Copy all objects to the realm to return managed instances
    copyToRealm(frog)
}
