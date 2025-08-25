// Instantiate the class and set its values.
let dog = Dog()
dog.name = "Rex"
dog.age = 10

// Get the default realm. You only need to do this once per thread.
let realm = try! Realm()
// Open a thread-safe transaction.
try! realm.write {
    // Add the instance to the realm.
    realm.add(dog)
}
