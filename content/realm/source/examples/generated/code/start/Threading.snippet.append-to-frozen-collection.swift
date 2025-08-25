// Get a copy of frozen objects.
// Here, we're getting them from a frozen realm,
// but you might also be passing them across threads.
let frozenTimmy = frozenRealm.objects(Person.self).where {
    $0.name == "Timmy"
}.first!
let frozenLassie = frozenRealm.objects(Dog.self).where {
    $0.name == "Lassie"
}.first!
// Confirm the objects are frozen.
assert(frozenTimmy.isFrozen == true)
assert(frozenLassie.isFrozen == true)
// Thaw the frozen objects. You must thaw both the object
// you want to append and the collection you want to append it to.
let thawedTimmy = frozenTimmy.thaw()
let thawedLassie = frozenLassie.thaw()
let realm = try! Realm()
try! realm.write {
    thawedTimmy?.dogs.append(thawedLassie!)
}
XCTAssertEqual(thawedTimmy?.dogs.first?.name, "Lassie")
