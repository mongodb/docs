// Open the default realm
let realm = try! Realm()

let idOfPersonToUpdate = 123

// Find the person to update by ID
guard let person = realm.object(ofType: Person.self, forPrimaryKey: idOfPersonToUpdate) else {
    print("Person \(idOfPersonToUpdate) not found")
    return
}

try! realm.write {
    // Update the embedded object directly through the person
    // If the embedded object is null, updating these properties has no effect
    person.address?.street = "789 Any Street"
    person.address?.city = "Anytown"
    person.address?.postalCode = "12345"
    print("Updated person: \(person)")
}
