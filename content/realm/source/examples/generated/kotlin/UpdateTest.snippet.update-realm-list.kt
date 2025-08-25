realm.write {
    // Get the live object
    val realmList = query<Frog>("name = $0", "Kermit").first().find()!!.favoritePonds
    realmList[0].name = "Picnic Pond"
    realmList.set(1, Pond().apply { name = "Big Pond" })
}
