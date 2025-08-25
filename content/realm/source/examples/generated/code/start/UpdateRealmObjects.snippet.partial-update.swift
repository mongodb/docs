let realm = try! Realm()
try! realm.write {
    // Use .modified to only update the provided values.
    // Note that the "name" property will remain the same
    // for the person with primary key "id" 123.
    realm.create(Person.self,
                 value: ["id": 123, "dogs": [["Buster", 5]]],
                 update: .modified)
}
