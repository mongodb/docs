// Read from a frozen realm
let frozenPeople = frozenRealm.objects(Person.self)

// The collection that we pull from the frozen realm is also frozen
assert(frozenPeople.isFrozen)

// Get an individual person from the collection
let frozenPerson = frozenPeople.first!

// To modify the person, you must first thaw it
// You can also thaw collections and realms
let thawedPerson = frozenPerson.thaw()

// Check to make sure this person is valid. An object is
// invalidated when it is deleted from its managing realm,
// or when its managing realm has invalidate() called on it.
assert(thawedPerson?.isInvalidated == false)

// Thawing the person also thaws the frozen realm it references
assert(thawedPerson!.realm!.isFrozen == false)

// Let's make the code easier to follow by naming the thawed realm
let thawedRealm = thawedPerson!.realm!

// Now, you can modify the todo
try! thawedRealm.write {
   thawedPerson!.name = "John Michael Kane"
}
