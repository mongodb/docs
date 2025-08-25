// Find frogs with a favorite pond
val allFrogs = query<Frog>().find()
val frogsWithFavoritePond = allFrogs.query("favoritePonds.@size > $0", 0).find()

// Check if the list contains a value
for (frog in frogsWithFavoritePond) {
    val likesBigPond = frog.favoritePonds.any { pond -> pond.name == "Big Pond" }
    if (likesBigPond) {
        Log.v("${frog.name} likes Big Pond")
    } else {
        Log.v("${frog.name} does not like Big Pond")
    }
}
