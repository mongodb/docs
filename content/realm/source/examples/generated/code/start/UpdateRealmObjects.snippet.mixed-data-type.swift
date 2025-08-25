let realm = try! Realm()

// Get a dog to update
let rex = realm.objects(Dog.self).where {
    $0.name == "Rex"
}.first!

try! realm.write {
    // As with creating an object with an AnyRealmValue, you must specify the
    // type of the value when you update the property.
    rex.companion = .object(Dog(value: ["name": "Regina"]))
}
