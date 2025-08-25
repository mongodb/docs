let realm = try! Realm()

let person = Person(name: "Jane")
try! realm.write {
    realm.add(person)
}

// Create thread-safe reference to person
@ThreadSafe var personRef = person

// @ThreadSafe vars are always optional. If the referenced object is deleted,
// the @ThreadSafe var will be nullified.
print("Person's name: \(personRef?.name ?? "unknown")")

// Pass the reference to a background thread
DispatchQueue(label: "background", autoreleaseFrequency: .workItem).async {
    let realm = try! Realm()
    try! realm.write {
        // Resolve within the transaction to ensure you get the
        // latest changes from other threads. If the person
        // object was deleted, personRef will be nil.
        guard let person = personRef else {
            return // person was deleted
        }
        person.name = "Jane Doe"
    }
}
