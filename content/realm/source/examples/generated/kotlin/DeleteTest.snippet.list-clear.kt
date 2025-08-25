// Open a write transaction
realm.write {
    val forest = query<Forest>("name == $0", "Hundred Acre Wood").find().first()
    val forestPonds = forest.nearbyPonds
    assertEquals(5, forestPonds.size)

    // Clear all ponds from the list
    forestPonds.clear()
    assertEquals(0, forestPonds.size)
}
