let realm = try! Realm()
// Access all dogs in the realm
let dogs = realm.objects(Dog.self)

let dogsSorted = dogs.sorted(byKeyPath: "name", ascending: false)

// You can also sort on the members of linked objects. In this example,
// we sort the dogs by their favorite toys' names.
let dogsSortedByFavoriteToyName = dogs.sorted(byKeyPath: "favoriteToy.name")
