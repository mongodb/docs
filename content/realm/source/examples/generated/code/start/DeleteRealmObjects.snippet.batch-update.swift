let realm = try! Realm()
try! realm.write {
    // Create a person to take care of some dogs.
    let person = Person(value: ["id": 1, "name": "Ali"])
    realm.add(person)

    let dog = Dog(value: ["name": "Rex", "age": 1])
    realm.add(dog)

    // Find dogs younger than 2.
    let puppies = realm.objects(Dog.self).filter("age < 2")

    // Give all puppies to Ali.
    person.setValue(puppies, forKey: "dogs")

}
