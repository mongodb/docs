// Read event
let readEventScope = events.beginScope(activity: "read object")
let person = realm.objects(Person.self).first!
print("Found this person: \(person.name)")
readEventScope.commit()
let mutateEventScope = events.beginScope(activity: "mutate object")
// Write event
try! realm.write {
    // Change name from "Anthony" to "Tony"
    person.name = "Tony"
}
mutateEventScope.commit()
