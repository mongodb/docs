let realm = try! Realm()

// Get an immutable copy of the realm that can be passed across threads
let frozenRealm = realm.freeze()

assert(frozenRealm.isFrozen)

let people = realm.objects(Person.self)

// You can freeze collections
let frozenPeople = people.freeze()

assert(frozenPeople.isFrozen)

// You can still read from frozen realms
let frozenPeople2 = frozenRealm.objects(Person.self)

assert(frozenPeople2.isFrozen)

let person = people.first!

assert(!person.realm!.isFrozen)

// You can freeze objects
let frozenPerson = person.freeze()

assert(frozenPerson.isFrozen)
// Frozen objects have a reference to a frozen realm
assert(frozenPerson.realm!.isFrozen)
