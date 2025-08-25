// Retrieve all class projections of the given type `PersonProjection`
// and filter for the first class projection where the `firstName` property
// value is "Jason"
let person = realm.objects(PersonProjection.self).first(where: { $0.firstName == "Jason" })!
// Update class projection property in a write transaction
try! realm.write {
    person.firstName = "David"
}
