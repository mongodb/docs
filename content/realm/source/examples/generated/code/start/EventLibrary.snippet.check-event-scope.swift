let readPersonScope = events.beginScope(activity: "read object")
let person2 = realm.objects(Person.self).first!
print("Found this person: \(person2.name)")
if readPersonScope.isActive {
    print("The readPersonScope is active")
} else {
    print("The readPersonScope is no longer active")
}
readPersonScope.cancel()
