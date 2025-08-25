let realm = try! Realm()

let dogs = realm.objects(Dog.self)

// Find dogs who have favorite parks
let dogsWithFavoriteParks = dogs.where {
    $0.favoriteParksByCity.count >= 1
}

for dog in dogsWithFavoriteParks {
    // Check if an entry exists
    if dog.favoriteParksByCity.keys.contains("Chicago") {
        print("\(dog.name) has a favorite park in Chicago")
    }

    // Iterate over entries
    for element in dog.favoriteParksByCity {
        print("\(dog.name)'s favorite park in \(element.key) is \(element.value)")
    }
}
