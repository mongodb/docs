let realm = try! Realm()
// Record a dog's name and current city
let dog = Dog()
dog.name = "Wolfie"
dog.currentCity = "New York"
// Set map values
dog.favoriteParksByCity["New York"] = "Domino Park"
// Store the data in a realm
try! realm.write {
    realm.add(dog)
    // You can also set map values inside a write transaction
    dog.favoriteParksByCity["Chicago"] = "Wiggly Field"
    dog.favoriteParksByCity.setValue("Bush Park", forKey: "Ottawa")
}
