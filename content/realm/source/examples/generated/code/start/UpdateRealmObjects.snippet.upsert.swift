let realm = try! Realm()
try! realm.write {
    let person1 = Person(value: ["id": 1234, "name": "Jones"])
    // Add a new person to the realm. Since nobody with ID 1234
    // has been added yet, this adds the instance to the realm.
    realm.add(person1, update: .modified)

    let person2 = Person(value: ["id": 1234, "name": "Bowie"])
    // Judging by the ID, it's the same person, just with a
    // different name. When `update` is:
    // - .modified: update the fields that have changed.
    // - .all: replace all of the fields regardless of
    //   whether they've changed.
    // - .error: throw an exception if a key with the same
    //   primary key already exists.
    realm.add(person2, update: .modified)
}
