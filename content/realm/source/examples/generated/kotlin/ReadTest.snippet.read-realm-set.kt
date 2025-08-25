// Find frogs with flies and crickets as a favorite snack
val filterBySnackSet = query<RealmSet_Frog>("favoriteSnacks.name CONTAINS $0 AND favoriteSnacks.name CONTAINS $1", "Flies", "Crickets")
val potentialFrogs = filterBySnackSet.find()

// Check if the set contains a value
val frogsThatLikeWorms = potentialFrogs.filter { frog ->
    val requiredSnacks = query<RealmSet_Snack>("name == $0", "Worms")
    frog.favoriteSnacks.contains(requiredSnacks.find().first())
}
for (frog in frogsThatLikeWorms) {
    Log.v("${frog.name} likes both Flies, Worms, and Crickets")
}
