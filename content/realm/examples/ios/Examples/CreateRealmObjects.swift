// :replace-start: {
//   "terms": {
//     "CreateExamples_": ""
//   }
// }
import Foundation
import XCTest
import RealmSwift

// :snippet-start: models
class CreateExamples_DogToy: Object {
    @Persisted var name = ""
}

class CreateExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""
    @Persisted var citiesVisited: MutableSet<String>
    @Persisted var companion: AnyRealmValue

    // To-one relationship
    @Persisted var favoriteToy: CreateExamples_DogToy?

    // Map of city name -> favorite park in that city
    @Persisted var favoriteParksByCity: Map<String, String>
}

class CreateExamples_Person: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""

    // To-many relationship - a person can have many dogs
    @Persisted var dogs: List<CreateExamples_Dog>

    // Embed a single object.
    // Embedded object properties must be marked optional.
    @Persisted var address: CreateExamples_Address?

    convenience init(name: String, address: CreateExamples_Address) {
        self.init()
        self.name = name
        self.address = address
    }
}

class CreateExamples_Address: EmbeddedObject {
    @Persisted var street: String?
    @Persisted var city: String?
    @Persisted var country: String?
    @Persisted var postalCode: String?
}
// :snippet-end:

class CreateRealmObjects: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testCreate() {
        // :snippet-start: create
        // Instantiate the class and set its values.
        let dog = CreateExamples_Dog()
        dog.name = "Rex"
        dog.age = 10

        // Get the default realm. You only need to do this once per thread.
        let realm = try! Realm()
        // Open a thread-safe transaction.
        try! realm.write {
            // Add the instance to the realm.
            realm.add(dog)
        }
        // :snippet-end:
    }

    func testCreateNewObject() {
        // :snippet-start: initialize-objects-with-values
        // (1) Create a CreateExamples_Dog object from a dictionary
        let myDog = CreateExamples_Dog(value: ["name": "Pluto", "age": 3])

        // (2) Create a CreateExamples_Dog object from an array
        let myOtherDog = CreateExamples_Dog(value: ["Fido", 5])

        let realm = try! Realm()
        // Add to the realm inside a transaction
        try! realm.write {
            realm.add([myDog, myOtherDog])
        }
        // :snippet-end:
    }

    func testCopyToAnotherRealm() {
        // :snippet-start: copy-to-another-realm
        let realm = try! Realm(configuration: Realm.Configuration(inMemoryIdentifier: "first realm"))

        try! realm.write {
            let dog = CreateExamples_Dog()
            dog.name = "Wolfie"
            dog.age = 1
            realm.add(dog)
        }

        // Later, fetch the instance we want to copy
        let wolfie = realm.objects(CreateExamples_Dog.self).first(where: { $0.name == "Wolfie" })!

        // Open the other realm
        let otherRealm = try! Realm(configuration: Realm.Configuration(inMemoryIdentifier: "second realm"))
        try! otherRealm.write {
            // Copy to the other realm
            let wolfieCopy = otherRealm.create(type(of: wolfie), value: wolfie)
            wolfieCopy.age = 2

            // Verify that the copy is separate from the original
            XCTAssertNotEqual(wolfie.age, wolfieCopy.age)
        }
        // :snippet-end:
    }

    func testJson() {
        // :snippet-start: json
        // Specify a dog toy in JSON
        let data = "{\"name\": \"Tennis ball\"}".data(using: .utf8)!
        let realm = try! Realm()
        // Insert from data containing JSON
        try! realm.write {
            let json = try! JSONSerialization.jsonObject(with: data, options: [])
            realm.create(CreateExamples_DogToy.self, value: json)
        }
        // :snippet-end:
    }

    func testNestedObjects() {
        let aDog = CreateExamples_Dog(value: ["Buster", 5])
        let anotherDog = CreateExamples_Dog(value: ["Buddy", 6])
        // :snippet-start: nested-objects
        // Instead of using pre-existing dogs...
        let aPerson = CreateExamples_Person(value: [123, "Jane", [aDog, anotherDog]])

        // ...we can create them inline
        let anotherPerson = CreateExamples_Person(value: [123, "Jane", [["Buster", 5], ["Buddy", 6]]])
        // :snippet-end:
    }

    func testTransaction() {
        // :snippet-start: transaction
        // Open the default realm.
        let realm = try! Realm()

        // Prepare to handle exceptions.
        do {
            // Open a thread-safe transaction.
            try realm.write {
                // Make any writes within this code block.
                // Realm automatically cancels the transaction
                // if this code throws an exception. Otherwise,
                // Realm automatically commits the transaction
                // after the end of this code block.
            }
        } catch let error as NSError {
            // Failed to write to realm.
            // ... Handle error ...
        }
        // :snippet-end:
    }

    func testCreateEmbeddedObject() {
        // :snippet-start: create-an-embedded-object
        // Open the default realm
        let realm = try! Realm()

        try! realm.write {
            let address = CreateExamples_Address()
            address.street = "123 Fake St"
            address.city = "Springfield"
            address.country = "USA"
            address.postalCode = "90710"
            let contact = CreateExamples_Person(name: "Nick Riviera", address: address)
            realm.add(contact)
        }
        // :snippet-end:
    }

    func testCreateObjectWithMapValues() {
        // :snippet-start: map
        let realm = try! Realm()
        // Record a dog's name and current city
        let dog = CreateExamples_Dog()
        dog.name = "Wolfie"
        dog.currentCity = "New York"
        // Set map values
        dog.favoriteParksByCity["New York"] = "Domino Park"
        // Store the data in a realm
        try! realm.write {
            realm.add(dog)
            // You can also set map values inside a write transaction
            dog.favoriteParksByCity["Chicago"] = "Wiggly Field"
            dog.favoriteParksByCity.setValue("Bush Park", forKey: "Ottawa")
        }
        // :snippet-end:
    }
    
    func testCreateObjectWithMapKeysPercentEncodedForbiddenCharacters() {
        // :snippet-start: percent-encode-disallowed-map-keys
        // Percent encode . or $ characters to use them in map keys
        let mapKey = "New York.Brooklyn"
        let encodedMapKey = "New York%2EBrooklyn"
        // :snippet-end:
        
        let realm = try! Realm()
        let dog = CreateExamples_Dog()
        dog.name = "Wishbone"
        dog.currentCity = "New York"
        // Set map values
        dog.favoriteParksByCity[encodedMapKey] = "Domino Park"

        // Round-trip adding a dog with a percent-encoded map key, querying it, and decoding it
        try! realm.write {
            realm.add(dog)
        }
        let savedWishbone = realm.objects(CreateExamples_Dog.self).where {
            $0.name == "Wishbone"
        }.first!
        let savedWishboneMapKey = savedWishbone.favoriteParksByCity.keys[0]
        XCTAssert(savedWishboneMapKey == "New York%2EBrooklyn")
        let decodedMapKey = savedWishboneMapKey.removingPercentEncoding
        let unwrappedDecodedMapKey = decodedMapKey
        XCTAssert(mapKey == unwrappedDecodedMapKey)
    }

    func testCreateMutableSet() {
        // :snippet-start: set-collections
        let realm = try! Realm()

        // Record a dog's name and current city
        let dog = CreateExamples_Dog()
        dog.name = "Maui"
        dog.currentCity = "New York"

        // Store the data in a realm. Add the dog's current city
        // to the citiesVisited MutableSet
        try! realm.write {
            realm.add(dog)
            // You can only mutate the MutableSet in a write transaction.
            // This means you can't set values at initialization, but must do it during a write.
            dog.citiesVisited.insert(dog.currentCity)
        }

        // You can also add multiple items to the set.
        try! realm.write {
            dog.citiesVisited.insert(objectsIn: ["Boston", "Chicago"])
        }

        print("\(dog.name) has visited: \(dog.citiesVisited)")
        // :snippet-end:
    }

    func testCreateAnyRealmValue() {
        // :snippet-start: mixed-data-type
        // Create a CreateExamples_Dog object and then set its properties
        let myDog = CreateExamples_Dog()
        myDog.name = "Rex"
        // This dog has no companion.
        // You can set the field's type to "none", which represents `nil`
        myDog.companion = .none

        // Create another CreateExamples_Dog whose companion is a cat.
        // We don't have a Cat object, so we'll use a string to describe the companion.
        let theirDog = CreateExamples_Dog()
        theirDog.name = "Wolfie"
        theirDog.companion = .string("Fluffy the Cat")

        // Another dog might have a dog as a companion.
        // We do have an object that can represent that, so we can specify the
        // type is a CreateExamples_Dog object, and even set the object's value.
        let anotherDog = CreateExamples_Dog()
        anotherDog.name = "Fido"
        // Note: this sets Spot as a companion of Fido, but does not set
        // Fido as a companion of Spot. Spot has no companion in this instance.
        anotherDog.companion = .object(CreateExamples_Dog(value: ["name": "Spot"]))

        // Add the dogs to the realm
        let realm = try! Realm()
        try! realm.write {
            realm.add([myDog, theirDog, anotherDog])
        }
        // After adding these dogs to the realm, we now have 4 dog objects.
        let dogs = realm.objects(CreateExamples_Dog.self)
        XCTAssertEqual(dogs.count, 4)
        // :snippet-end:
    }
}
// :replace-end:
