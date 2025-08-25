let realm = try! Realm()

// Find the dog we want to update
let wolfie = realm.objects(Dog.self).where {
    $0.name == "Wolfie"
}.first!

// Delete an entry
try! realm.write {
    // Use removeObject(for:)
    wolfie.favoriteParksByCity.removeObject(for: "New York")
    // Or assign `nil` to delete non-optional values.
    // If the value type were optional (e.g. Map<String, String?>)
    // this would assign `nil` to that entry rather than deleting it.
    wolfie.favoriteParksByCity["New York"] = nil
}
XCTAssertNil(wolfie.favoriteParksByCity["New York"])
