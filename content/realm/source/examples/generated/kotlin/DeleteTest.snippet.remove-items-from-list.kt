// Open a write transaction
realm.write {
    // Query for the parent forest object
    val forest = query<Forest>("name == $0", "Hundred Acre Wood").find().first()
    val forestPonds = forest.nearbyPonds
    assertEquals(5, forestPonds.size)

    // Remove the first pond in the list
    val removeFirstPond = forestPonds.first()
    forestPonds.remove(removeFirstPond)
    assertEquals(4, forestPonds.size)

    // Remove the pond at index 2 in the list
    forestPonds.removeAt(2)
    assertEquals(3, forestPonds.size)

    // Remove the remaining three ponds in the list
    forestPonds.removeAll(forestPonds)
    assertEquals(0, forestPonds.size)
}
