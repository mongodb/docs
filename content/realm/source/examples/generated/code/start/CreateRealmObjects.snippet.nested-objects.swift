// Instead of using pre-existing dogs...
let aPerson = Person(value: [123, "Jane", [aDog, anotherDog]])

// ...we can create them inline
let anotherPerson = Person(value: [123, "Jane", [["Buster", 5], ["Buddy", 6]]])
