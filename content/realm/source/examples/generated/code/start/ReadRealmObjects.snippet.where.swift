let realm = try! Realm()
// Access all dogs in the realm
let dogs = realm.objects(Dog.self)

// Query by age
let puppies = dogs.where {
    $0.age < 2
}

// Query by person
let dogsWithoutFavoriteToy = dogs.where {
    $0.favoriteToy == nil
}

// Query by person's name
let dogsWhoLikeTennisBalls = dogs.where {
    $0.favoriteToy.name == "Tennis ball"
}
