static var previewRealm: Realm {
    var realm: Realm
    let identifier = "previewRealm"
    let config = Realm.Configuration(inMemoryIdentifier: identifier)
    do {
        realm = try Realm(configuration: config)
        // Check to see whether the in-memory realm already contains a Person.
        // If it does, we'll just return the existing realm.
        // If it doesn't, we'll add a Person append the Dogs.
        let realmObjects = realm.objects(Person.self)
        if realmObjects.count == 1 {
            return realm
        } else {
            try realm.write {
                realm.add(person)
                person.dogs.append(objectsIn: [Dog.dog1, Dog.dog2, Dog.dog3])
            }
            return realm
        }
    } catch let error {
        fatalError("Can't bootstrap item data: \(error.localizedDescription)")
    }
}
