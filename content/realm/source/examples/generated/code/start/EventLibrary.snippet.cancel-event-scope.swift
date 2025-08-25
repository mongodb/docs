let eventScope = events.beginScope(activity: "read object")
let person1 = realm.objects(Person.self).first!
print("Found this person: \(person1.name)")
eventScope.cancel()
