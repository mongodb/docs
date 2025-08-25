// Find all forests with at least one nearby pond
val allForests = query<Forest>().find()
val forestsWithPonds = allForests.query("nearbyPonds.@count > $0", 0).find()

// Iterate through the results
for (forest in forestsWithPonds) {
    val bigPond = query<Pond>("name == $0", "Big Pond").find().first()
    if (forest.nearbyPonds.contains(bigPond)) {
        Log.v("${forest.name} has a nearby pond named ${bigPond.name}")
    } else {
        Log.v("${forest.name} does not have a big pond nearby")
    }
}
