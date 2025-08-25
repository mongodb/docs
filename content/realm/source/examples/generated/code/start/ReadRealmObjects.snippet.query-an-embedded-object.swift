// Open the default realm
let realm = try! Realm()

// Get all people in Los Angeles, sorted by street address
let losAngelesPeople = realm.objects(Person.self)
    .filter("address.city = %@", "Los Angeles")
    .sorted(byKeyPath: "address.street")
print("Los Angeles Person: \(losAngelesPeople)")
