let realm = try! Realm()

// Record a dog's name and list of cities he has visited.
let dog = Dog()
dog.name = "Maui"
let dogCitiesVisited = ["New York", "Boston", "Toronto"]
try! realm.write {
    realm.add(dog)
    dog.citiesVisited.insert(objectsIn: dogCitiesVisited)
}
XCTAssertEqual(dog.citiesVisited.count, 3)

// Later... we decide the dog didn't really visit Toronto
// since the plane just stopped there for a layover.
// Remove the element from the set.
try! realm.write {
    dog.citiesVisited.remove("Toronto")
}
XCTAssertEqual(dog.citiesVisited.count, 2)

// Or, in the case where the person entered the data for
// the wrong dog, remove all elements from the set.
try! realm.write {
    dog.citiesVisited.removeAll()
}
XCTAssertEqual(dog.citiesVisited.count, 0)
