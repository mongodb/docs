let realm = try! Realm()
// Access all dogs in the realm
let dogs = realm.objects(Dog.self)

// Sort by type-safe keyPath
let dogsSorted = dogs.sorted(by: \.name)
