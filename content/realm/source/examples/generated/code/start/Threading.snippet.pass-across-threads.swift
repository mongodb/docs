let person = Person(name: "Jane")
let realm = try! Realm()

try! realm.write {
    realm.add(person)
}

// Create thread-safe reference to person
let personRef = ThreadSafeReference(to: person)

// Pass the reference to a background thread
DispatchQueue(label: "background", autoreleaseFrequency: .workItem).async {
    let realm = try! Realm()
    try! realm.write {
        // Resolve within the transaction to ensure you get the latest changes from other threads
        guard let person = realm.resolve(personRef) else {
            return // person was deleted
        }
        person.name = "Jane Doe"
    }
}
