// Find frogs who have forests with favorite ponds
val frogs = realm.query<Frog>().find()
val frogsWithFavoritePonds = frogs.query("favoritePondsByForest.@count > $0", 1).find()
val thisFrog = frogsWithFavoritePonds.first()

// Iterate through the map and log each key-value pair
for (forestName in thisFrog.favoritePondsByForest.keys) {
    val pondName = thisFrog.favoritePondsByForest[forestName]
    Log.v("Forest: $forestName, Pond: $pondName")
}

// Check if the dictionary contains a key
if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
    Log.v("${thisFrog.name}'s favorite pond in Hundred Acre Wood is ${thisFrog.favoritePondsByForest["Hundred Acre Wood"]}")
}
// Check if the dictionary contains a value
if (thisFrog.favoritePondsByForest.containsValue("Picnic Pond")) {
    Log.v("${thisFrog.name} lists Picnic Pond as a favorite pond")
}
