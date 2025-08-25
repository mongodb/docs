// (1) Create a Dog object from a dictionary
let myDog = Dog(value: ["name": "Pluto", "age": 3])

// (2) Create a Dog object from an array
let myOtherDog = Dog(value: ["Fido", 5])

let realm = try! Realm()
// Add to the realm inside a transaction
try! realm.write {
    realm.add([myDog, myOtherDog])
}
