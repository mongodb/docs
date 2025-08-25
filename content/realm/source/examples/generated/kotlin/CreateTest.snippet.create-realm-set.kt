realm.write {
    // Instantiate a new unmanaged Frog object with RealmSet properties
    val frog = Frog().apply {
        name = "Kermit"
        // Set initial values to each unmanaged set
        favoriteSnacks.addAll(setOf(
            Snack().apply { name = "flies" },
            Snack().apply { name = "crickets" },
            Snack().apply { name = "worms" }
        ))
        favoriteWeather.add("rain")
    }
    // Copy all objects to the realm to return managed instances
    copyToRealm(frog)
}
