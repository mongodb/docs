val filterByKotlinName = realm.query<Frog>("species == $0", "Muppetarium Amphibius")
val findSpecies = filterByKotlinName.find().first()

val filterByRemappedName = realm.query<Frog>("latin_name == $0", "Muppetarium Amphibius")
val find_latin_name = filterByRemappedName.find().first()

// Both queries return the same object
assertEquals(findSpecies, find_latin_name)
