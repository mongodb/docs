let realm = try! Realm()

// Record a dog's name and current city
let dog = Dog()
dog.name = "Maui"
dog.currentCity = "New York"

// Store the data in a realm. Add the dog's current city
// to the citiesVisited MutableSet
try! realm.write {
    realm.add(dog)
    // You can only mutate the MutableSet in a write transaction.
    // This means you can't set values at initialization, but must do it during a write.
    dog.citiesVisited.insert(dog.currentCity)
}

// You can also add multiple items to the set.
try! realm.write {
    dog.citiesVisited.insert(objectsIn: ["Boston", "Chicago"])
}

print("\(dog.name) has visited: \(dog.citiesVisited)")
