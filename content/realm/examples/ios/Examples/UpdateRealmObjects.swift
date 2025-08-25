// :replace-start: {
//   "terms": {
//     "UpdateExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
class UpdateExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""
    @Persisted var citiesVisited: MutableSet<String>
    @Persisted var companion: AnyRealmValue

    // Map of city name -> favorite park in that city
    @Persisted var favoriteParksByCity: Map<String, String>
}

class UpdateExamples_Person: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""

    // To-many relationship - a person can have many dogs
    @Persisted var dogs: List<UpdateExamples_Dog>

    // Embed a single object.
    // Embedded object properties must be marked optional.
    @Persisted var address: UpdateExamples_Address?
}

class UpdateExamples_Address: EmbeddedObject {
    @Persisted var street: String?
    @Persisted var city: String?
    @Persisted var country: String?
    @Persisted var postalCode: String?
}
// :snippet-end:

class UpdateRealmObjects: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testUpdate() {
        let setupRealm = try! Realm()
        try! setupRealm.write {
            setupRealm.add(UpdateExamples_Dog())
        }
        // :snippet-start: update
        let realm = try! Realm()

        // Get a dog to update
        let dog = realm.objects(UpdateExamples_Dog.self).first!

        // Open a thread-safe transaction
        try! realm.write {
            // Update some properties on the instance.
            // These changes are saved to the realm
            dog.name = "Wolfie"
            dog.age += 1
        }
        // :snippet-end:
    }

    func testUpsert() {
        // :snippet-start: upsert
        let realm = try! Realm()
        try! realm.write {
            let person1 = UpdateExamples_Person(value: ["id": 1234, "name": "Jones"])
            // Add a new person to the realm. Since nobody with ID 1234
            // has been added yet, this adds the instance to the realm.
            realm.add(person1, update: .modified)

            let person2 = UpdateExamples_Person(value: ["id": 1234, "name": "Bowie"])
            // Judging by the ID, it's the same person, just with a
            // different name. When `update` is:
            // - .modified: update the fields that have changed.
            // - .all: replace all of the fields regardless of
            //   whether they've changed.
            // - .error: throw an exception if a key with the same
            //   primary key already exists.
            realm.add(person2, update: .modified)
        }
        // :snippet-end:
    }

    @MainActor
    func testAsyncWriteQueryOnLocalThread() {
        let expectation = expectation(description: "Objects append")

        // :snippet-start: async-transaction
        let realm = try! Realm()

        // :remove-start:
        do {
            try realm.write {
                realm.create(UpdateExamples_Person.self, value: ["id": 1, "name": "Dachary"])
            }
        } catch {
            print("Error creating object: \(error.localizedDescription)")
        }
        // :remove-end:
        // Query for a specific person object on the main thread
        let people = realm.objects(UpdateExamples_Person.self)
        let thisPerson = people.where {
            $0.name == "Dachary"
        }.first

        // Perform an async write to add dogs to that person's dog list.
        // No need to pass a thread-safe reference or frozen object.
        realm.writeAsync {
            thisPerson?.dogs.append(objectsIn: [
                UpdateExamples_Dog(value: ["name": "Ben", "age": 13]),
                UpdateExamples_Dog(value: ["name": "Lita", "age": 9]),
                UpdateExamples_Dog(value: ["name": "Maui", "age": 1])
            ])
        } onComplete: { _ in
            // Confirm the three dogs were successfully added to the person's dogs list
            XCTAssertEqual(thisPerson!.dogs.count, 3)
            // Query for one of the dogs we added and see that it is present
            let dogs = realm.objects(UpdateExamples_Dog.self)
            let benDogs = dogs.where {
                $0.name == "Ben"
            }
            XCTAssertEqual(benDogs.count, 1)
            // :remove-start:
            expectation.fulfill()
            // :remove-end:
        }
        // :snippet-end:
        waitForExpectations(timeout: 5)
    }

    func testKeyValueCoding() {
        // :snippet-start: key-value-coding
        let realm = try! Realm()

        let allDogs = realm.objects(UpdateExamples_Dog.self)

        try! realm.write {
            allDogs.first?.setValue("Sparky", forKey: "name")
            // Move the dogs to Toronto for vacation
            allDogs.setValue("Toronto", forKey: "currentCity")
        }
        // :snippet-end:
    }

    func testPartialUpdate() {
        // :snippet-start: partial-update
        let realm = try! Realm()
        try! realm.write {
            // Use .modified to only update the provided values.
            // Note that the "name" property will remain the same
            // for the person with primary key "id" 123.
            realm.create(UpdateExamples_Person.self,
                         value: ["id": 123, "dogs": [["Buster", 5]]],
                         update: .modified)
        }
        // :snippet-end:
    }

    func testUpdateEmbeddedObjectProperty() {
        // :snippet-start:  update-an-embedded-object-property
        // Open the default realm
        let realm = try! Realm()
        // :remove-start:
        // Create a test person
        do {
            try realm.write {
                realm.create(UpdateExamples_Person.self, value: ["id": 123, "name": "Jane Smith"])
            }
        } catch {
            print("Error creating object: \(error.localizedDescription)")
        }
        // :remove-end:

        let idOfPersonToUpdate = 123

        // Find the person to update by ID
        guard let person = realm.object(ofType: UpdateExamples_Person.self, forPrimaryKey: idOfPersonToUpdate) else {
            print("UpdateExamples_Person \(idOfPersonToUpdate) not found")
            return
        }

        try! realm.write {
            // Update the embedded object directly through the person
            // If the embedded object is null, updating these properties has no effect
            person.address?.street = "789 Any Street"
            person.address?.city = "Anytown"
            person.address?.postalCode = "12345"
            print("Updated person: \(person)")
        }
        // :snippet-end:
    }

    func testOverwriteEmbeddedObject() {
        // :snippet-start: overwrite-an-embedded-object
        // Open the default realm
        let realm = try! Realm()
        // :remove-start:
        // Create a test person
        do {
            try realm.write {
                realm.create(UpdateExamples_Person.self, value: ["id": 123, "name": "Jane Smith"])
            }
        } catch {
            print("Error creating object: \(error.localizedDescription)")
        }
        // :remove-end:

        let idOfPersonToUpdate = 123

        // Find the person to update by ID
        guard let person = realm.object(ofType: UpdateExamples_Person.self, forPrimaryKey: idOfPersonToUpdate) else {
            print("UpdateExamples_Person \(idOfPersonToUpdate) not found")
            return
        }

        try! realm.write {
            let newAddress = UpdateExamples_Address()
            newAddress.street = "789 Any Street"
            newAddress.city = "Anytown"
            newAddress.country = "USA"
            newAddress.postalCode = "12345"

            // Overwrite the embedded object
            person.address = newAddress
            print("Updated person: \(person)")
        }
        // :snippet-end:
    }

    func testUpdateMap() {
        // :snippet-start: map
        let realm = try! Realm()
        // :remove-start:
        // Create an example dog to update
        let dog = UpdateExamples_Dog()
        dog.name = "Wolfie"
        dog.currentCity = "New York"
        try! realm.write {
            realm.add(dog)
            dog.favoriteParksByCity["New York"] = "Domino Park"
            dog.favoriteParksByCity["Chicago"] = "Wiggly Field"
            dog.favoriteParksByCity.setValue("Bush Park", forKey: "Ottawa")
        }
        // :remove-end:

        // Find the dog we want to update
        let wolfie = realm.objects(UpdateExamples_Dog.self).where {
            $0.name == "Wolfie"
        }.first!

        print("Wolfie's favorite park in New York is: \(wolfie.favoriteParksByCity["New York"])")
        XCTAssertTrue(wolfie.favoriteParksByCity["New York"] == "Domino Park")

        // Update values for keys, or add values if the keys do not currently exist
        try! realm.write {
            wolfie.favoriteParksByCity["New York"] = "Washington Square Park"
            wolfie.favoriteParksByCity.updateValue("A Street Park", forKey: "Boston")
            wolfie.favoriteParksByCity.setValue("Little Long Pond", forKey: "Seal Harbor")
        }

        XCTAssertTrue(wolfie.favoriteParksByCity["New York"] == "Washington Square Park")
        // :snippet-end:
    }

    func testUpdateMutableSet() {
        // :snippet-start: set-collections
        let realm = try! Realm()

        // Record a dog's name, current city, and store it to the cities visited.
        let dog = UpdateExamples_Dog()
        dog.name = "Maui"
        dog.currentCity = "New York"
        try! realm.write {
            realm.add(dog)
            dog.citiesVisited.insert(dog.currentCity)
        }

        // Update the dog's current city, and add it to the set of cities visited.
        try! realm.write {
            dog.currentCity = "Toronto"
            dog.citiesVisited.insert(dog.currentCity)
        }
        XCTAssertEqual(dog.citiesVisited.count, 2)
        // :remove-start:
        // Create a second dog for the example
        let dog2 = UpdateExamples_Dog()
        dog2.name = "Lita"
        let dog2CitiesVisited = "Boston"
        try! realm.write {
            realm.add(dog2)
            dog2.citiesVisited.insert(dog2CitiesVisited)
        }
        // :remove-end:

        // If you're operating with two sets, you can insert the elements from one set into another set.
        // The dog2 set contains one element that isn't present in the dog set.
        try! realm.write {
            dog.citiesVisited.formUnion(dog2.citiesVisited)
        }
        XCTAssertEqual(dog.citiesVisited.count, 3)

        // Or you can remove elements that are present in the second set. This removes the one element
        // that we added above from the dog2 set.
        try! realm.write {
            dog.citiesVisited.subtract(dog2.citiesVisited)
        }
        XCTAssertEqual(dog.citiesVisited.count, 2)

        // If the sets contain common elements, you can mutate the set to only contain those common elements.
        // In this case, the two sets contain no common elements, so this set should now contain 0 items.
        try! realm.write {
            dog.citiesVisited.formIntersection(dog2.citiesVisited)
        }
        XCTAssertEqual(dog.citiesVisited.count, 0)
        // :snippet-end:
    }

    func testUpdateAnyRealmValue() {
        // :snippet-start: mixed-data-type
        let realm = try! Realm()
        // :remove-start:
        // Populate some example data
        let myDog = UpdateExamples_Dog()
        myDog.name = "Rex"
        myDog.companion = .none

        try! realm.write {
            realm.add(myDog)
        }
        // :remove-end:

        // Get a dog to update
        let rex = realm.objects(UpdateExamples_Dog.self).where {
            $0.name == "Rex"
        }.first!

        try! realm.write {
            // As with creating an object with an AnyRealmValue, you must specify the
            // type of the value when you update the property.
            rex.companion = .object(UpdateExamples_Dog(value: ["name": "Regina"]))
        }
        // :snippet-end:
    }
}
// :replace-end:
