// Find a frog in the realm
val kermit = realm.query<Frog>("name = $0", "Kermit").find().first()
val realmSet = kermit.favoriteSnacks
// Update the name of each snack in the set
for (snack in realmSet) {
    realm.write {
        findLatest(snack)?.name = snack.name.uppercase()
    }
}

realm.write {
    // Find all frogs who like rain
    val frogsWhoLikeRain = realm.query<Frog>("favoriteWeather CONTAINS $0", "rain").find()
    // Add thunderstorms to their favoriteWeather set
    for (frog in frogsWhoLikeRain) {
        val latestFrog = findLatest(frog)
        latestFrog?.favoriteWeather?.add("thunderstorms")
    }
}
