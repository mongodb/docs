let realm = try! Realm()

// Wolfie's companion is "Fluffy the Cat", represented by a string.
// Fluffy has gone to visit friends for the summer, so Wolfie has no companion.
let wolfie = realm.objects(Dog.self).where {
    $0.name == "Wolfie"
}.first!

try! realm.write {
    // You cannot set an AnyRealmValue to nil; you must set it to `.none`, instead.
    wolfie.companion = .none
}
