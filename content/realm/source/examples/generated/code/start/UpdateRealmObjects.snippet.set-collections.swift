let realm = try! Realm()

// Record a dog's name, current city, and store it to the cities visited.
let dog = Dog()
dog.name = "Maui"
dog.currentCity = "New York"
try! realm.write {
    realm.add(dog)
    dog.citiesVisited.insert(dog.currentCity)
}

// Update the dog's current city, and add it to the set of cities visited.
try! realm.write {
    dog.currentCity = "Toronto"
    dog.citiesVisited.insert(dog.currentCity)
}
XCTAssertEqual(dog.citiesVisited.count, 2)

// If you're operating with two sets, you can insert the elements from one set into another set.
// The dog2 set contains one element that isn't present in the dog set.
try! realm.write {
    dog.citiesVisited.formUnion(dog2.citiesVisited)
}
XCTAssertEqual(dog.citiesVisited.count, 3)

// Or you can remove elements that are present in the second set. This removes the one element
// that we added above from the dog2 set.
try! realm.write {
    dog.citiesVisited.subtract(dog2.citiesVisited)
}
XCTAssertEqual(dog.citiesVisited.count, 2)

// If the sets contain common elements, you can mutate the set to only contain those common elements.
// In this case, the two sets contain no common elements, so this set should now contain 0 items.
try! realm.write {
    dog.citiesVisited.formIntersection(dog2.citiesVisited)
}
XCTAssertEqual(dog.citiesVisited.count, 0)
