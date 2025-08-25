// Open a write transaction
realm.write {
    // Query for the parent frog object
    val myFrog = query<RealmSet_Frog>("name == $0", "Kermit").find().first()
    val snackSet = myFrog.favoriteSnacks
    assertEquals(3, snackSet.size)

    // Remove one snack from the set
    snackSet.remove(snackSet.first { it.name == "Flies" })
    assertEquals(2, snackSet.size)

    // Remove the remaining two snacks from the set
    val allSnacks = findLatest(myFrog)!!.favoriteSnacks
    snackSet.removeAll(allSnacks)
    assertEquals(0, snackSet.size)
}
