// Find frogs who have forests with favorite ponds
val thisFrog = realm.query<Frog>("favoritePondsByForest.@count > 1").find().first()
// Set an optional value for a key to null if the key exists
if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
    realm.write {
        val mutableFrog = findLatest(thisFrog)
        if (mutableFrog != null) {
            mutableFrog.favoritePondsByForest["Hundred Acre Wood"] = null
        }
    }
}
realm.write {
    // Remove a key and its value
    findLatest(thisFrog)?.favoritePondsByForest?.remove("Lothlorien")
    // Remove all keys and values
    findLatest(thisFrog)?.favoritePondsByForest?.clear()
    assertTrue(thisFrogUpdated.favoritePondsByForest.isEmpty())
}
