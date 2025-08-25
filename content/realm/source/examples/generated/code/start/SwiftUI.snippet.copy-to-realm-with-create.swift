// When working with an `@ObservedRealmObject` `Person`, this is a frozen object.
// Thaw the object and get its realm to perform the write to append the new dog.
let thawedPersonRealm = frozenPerson.thaw()!.realm!
try! thawedPersonRealm.write {
    // Use the .create method with `update: .modified` to copy the
    // existing object into the realm
    let dog = thawedPersonRealm.create(Dog.self, value:
                                        ["name": "Maui",
                                         "favoriteToy": wubba],
                                       update: .modified)
    person.dogs.append(dog)
}
