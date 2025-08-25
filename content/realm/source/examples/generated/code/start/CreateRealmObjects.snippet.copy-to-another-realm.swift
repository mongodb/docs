let realm = try! Realm(configuration: Realm.Configuration(inMemoryIdentifier: "first realm"))

try! realm.write {
    let dog = Dog()
    dog.name = "Wolfie"
    dog.age = 1
    realm.add(dog)
}

// Later, fetch the instance we want to copy
let wolfie = realm.objects(Dog.self).first(where: { $0.name == "Wolfie" })!

// Open the other realm
let otherRealm = try! Realm(configuration: Realm.Configuration(inMemoryIdentifier: "second realm"))
try! otherRealm.write {
    // Copy to the other realm
    let wolfieCopy = otherRealm.create(type(of: wolfie), value: wolfie)
    wolfieCopy.age = 2

    // Verify that the copy is separate from the original
    XCTAssertNotEqual(wolfie.age, wolfieCopy.age)
}
