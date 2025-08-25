realm.write {
    val frog = query<Frog>().find().first()
    val snackSet = frog.favoriteSnacks

    // Create two more Snack objects
    val cricketsSnack = copyToRealm(
        Snack().apply {
            name = "crickets"
        }
    )
    val wormsSnack = copyToRealm(
        Snack().apply {
            name = "worms"
        }
    )

    // Add multiple items to the RealmSet using the addAll() method
    snackSet.addAll(setOf(cricketsSnack, wormsSnack))
}
