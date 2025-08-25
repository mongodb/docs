// Previously, we've added a dog object to the realm.
let dog = Dog(value: ["name": "Max", "age": 5])

let realm = try! Realm()
try! realm.write {
    realm.add(dog)
}

// Delete the instance from the realm.
try! realm.write {
    realm.delete(dog)
}
