// Find frogs who have forests with favorite ponds
val thisFrog = realm.query<RealmDictionary_Frog>("favoritePondsByForest.@count > 1").find().first()
// Update the value for a key if it exists
if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
    realm.write {
        findLatest(thisFrog)?.favoritePondsByForest?.set("Lothlorien", "Lily Pad Pond")
    }
}
// Add a new key-value pair
realm.write {
    findLatest(thisFrog)?.favoritePondsByForest?.put("Sherwood Forest", "Miller Pond")
}
