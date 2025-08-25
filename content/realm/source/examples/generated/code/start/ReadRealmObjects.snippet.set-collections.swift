let realm = try! Realm()

// Find dogs who have visited New York
let newYorkDogs = realm.objects(Dog.self).where {
    $0.citiesVisited.contains("New York")
}

// Get some information about the cities they have visited
for dog in newYorkDogs {
    print("Cities \(dog.name) has visited: \(dog.citiesVisited)")
}

// Check whether two dogs have visited some of the same cities.
// Use "intersects" to find out whether the values of the two sets share common elements.
let isInBothCitiesVisited = (dog.citiesVisited.intersects(dog2.citiesVisited))
print("The two dogs have visited some of the same cities: \(isInBothCitiesVisited)")
// Prints "The two dogs have visited some of the same cities: true"

// Or you can check whether a set is a subset of another set. In this example,
// the first dog has visited "New York" and "Toronto", while dog2 has visited both of
// those but also "Toronto" and "Boston".
let isSubset = (dog.citiesVisited.isSubset(of: dog2.citiesVisited))
print("\(dog.name)'s set of cities visited is a subset of \(dog2.name)'s: \(isSubset)")
// Prints "Maui's set of cities visited is a subset of Lita's: true"
