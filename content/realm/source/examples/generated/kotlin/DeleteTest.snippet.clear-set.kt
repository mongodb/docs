realm.write {
    val myFrog = realm.query<RealmSet_Frog>("name == $0", "Kermit").find().first()
    val snackSet = findLatest(myFrog)!!.favoriteSnacks
    assertEquals(3, snackSet.size)

    // Clear all snacks from the set
    snackSet.clear()
    assertEquals(0, snackSet.size)
}
