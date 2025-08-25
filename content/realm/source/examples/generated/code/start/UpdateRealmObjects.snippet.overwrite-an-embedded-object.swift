// Open the default realm
let realm = try! Realm()

let idOfPersonToUpdate = 123

// Find the person to update by ID
guard let person = realm.object(ofType: Person.self, forPrimaryKey: idOfPersonToUpdate) else {
    print("Person \(idOfPersonToUpdate) not found")
    return
}

try! realm.write {
    let newAddress = Address()
    newAddress.street = "789 Any Street"
    newAddress.city = "Anytown"
    newAddress.country = "USA"
    newAddress.postalCode = "12345"

    // Overwrite the embedded object
    person.address = newAddress
    print("Updated person: \(person)")
}
