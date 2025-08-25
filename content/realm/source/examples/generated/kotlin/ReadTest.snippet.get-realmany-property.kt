val frogsFavoriteThing = findFrog.favoriteThing // Int

// Using the correct getter method returns the value
val frogsFavoriteNumber = frogsFavoriteThing?.asInt()
println("${findFrog.name} likes the number $frogsFavoriteNumber")
