// Find frogs who have a favorite pond
val allFrogs = query<Frog>().find()
val frogsWithFavoritePond = allFrogs.query("favoritePond.@count == $0", 1).find()

// Iterate through the results
for (frog in frogsWithFavoritePond) {
    Log.v("${frog.name} likes ${frog.favoritePond?.name}")
}
