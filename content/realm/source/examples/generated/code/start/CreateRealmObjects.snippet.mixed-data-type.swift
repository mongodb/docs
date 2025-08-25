// Create a Dog object and then set its properties
let myDog = Dog()
myDog.name = "Rex"
// This dog has no companion.
// You can set the field's type to "none", which represents `nil`
myDog.companion = .none

// Create another Dog whose companion is a cat.
// We don't have a Cat object, so we'll use a string to describe the companion.
let theirDog = Dog()
theirDog.name = "Wolfie"
theirDog.companion = .string("Fluffy the Cat")

// Another dog might have a dog as a companion.
// We do have an object that can represent that, so we can specify the
// type is a Dog object, and even set the object's value.
let anotherDog = Dog()
anotherDog.name = "Fido"
// Note: this sets Spot as a companion of Fido, but does not set
// Fido as a companion of Spot. Spot has no companion in this instance.
anotherDog.companion = .object(Dog(value: ["name": "Spot"]))

// Add the dogs to the realm
let realm = try! Realm()
try! realm.write {
    realm.add([myDog, theirDog, anotherDog])
}
// After adding these dogs to the realm, we now have 4 dog objects.
let dogs = realm.objects(Dog.self)
XCTAssertEqual(dogs.count, 4)
