let realm = try! Realm()

// Find the dog we want to update
let wolfie = realm.objects(Dog.self).where {
    $0.name == "Wolfie"
}.first!

print("Wolfie's favorite park in New York is: \(wolfie.favoriteParksByCity["New York"])")
XCTAssertTrue(wolfie.favoriteParksByCity["New York"] == "Domino Park")

// Update values for keys, or add values if the keys do not currently exist
try! realm.write {
    wolfie.favoriteParksByCity["New York"] = "Washington Square Park"
    wolfie.favoriteParksByCity.updateValue("A Street Park", forKey: "Boston")
    wolfie.favoriteParksByCity.setValue("Little Long Pond", forKey: "Seal Harbor")
}

XCTAssertTrue(wolfie.favoriteParksByCity["New York"] == "Washington Square Park")
