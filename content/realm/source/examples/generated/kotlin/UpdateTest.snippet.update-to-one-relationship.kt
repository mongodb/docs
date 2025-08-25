realm.write {
    val kermit = query<Frog>("name == $0", "Kermit").find().first()
    // Update a property on the related object
    kermit.favoritePond?.name = "Big Pond"

    // Assign a new related object
    val newBestFriend = Frog().apply { name = "Froggy Jr." }
    kermit.bestFriend = newBestFriend
}
