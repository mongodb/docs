let realm = try! Realm()

// Query for a specific person object on the main thread
let people = realm.objects(Person.self)
let thisPerson = people.where {
    $0.name == "Dachary"
}.first

// Perform an async write to add dogs to that person's dog list.
// No need to pass a thread-safe reference or frozen object.
realm.writeAsync {
    thisPerson?.dogs.append(objectsIn: [
        Dog(value: ["name": "Ben", "age": 13]),
        Dog(value: ["name": "Lita", "age": 9]),
        Dog(value: ["name": "Maui", "age": 1])
    ])
} onComplete: { _ in
    // Confirm the three dogs were successfully added to the person's dogs list
    XCTAssertEqual(thisPerson!.dogs.count, 3)
    // Query for one of the dogs we added and see that it is present
    let dogs = realm.objects(Dog.self)
    let benDogs = dogs.where {
        $0.name == "Ben"
    }
    XCTAssertEqual(benDogs.count, 1)
}
