realm.write {
    val forest = query<Forest>().find().first()
    // Update a property on a related object in the set
    forest.frogsThatLiveHere.first().name = "Kermit Sr."
    // Add a new related object to the list
    forest.frogsThatLiveHere.add(Frog().apply { name = "Froggy Jr." })
}
