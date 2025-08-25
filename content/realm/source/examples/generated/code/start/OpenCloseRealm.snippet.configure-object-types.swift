var config = Realm.Configuration.defaultConfiguration

// Given: `class Dog: Object`
// Limit the realm to only the Dog object. All other
// Object- and EmbeddedObject-derived classes are not added.
config.objectTypes = [Dog.self]

let realm = try! Realm(configuration: config)
