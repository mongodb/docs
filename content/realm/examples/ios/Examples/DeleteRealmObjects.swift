// :replace-start: {
//   "terms": {
//     "DeleteExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
class DeleteExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""
    @Persisted var citiesVisited: MutableSet<String>
    @Persisted var companion: AnyRealmValue

    // Map of city name -> favorite park in that city
    @Persisted var favoriteParksByCity: Map<String, String>
}
// :snippet-end:
class DeleteExamples_Person: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""

    // To-many relationship - a person can have many dogs
    @Persisted var dogs: List<DeleteExamples_Dog>
}

class DeleteRealmObjects: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testDelete() {
        // :snippet-start: delete
        // Previously, we've added a dog object to the realm.
        let dog = DeleteExamples_Dog(value: ["name": "Max", "age": 5])

        let realm = try! Realm()
        try! realm.write {
            realm.add(dog)
        }

        // Delete the instance from the realm.
        try! realm.write {
            realm.delete(dog)
        }
        // :snippet-end:
    }

    func testDeleteAll() {
        // :snippet-start: delete-all
        let realm = try! Realm()

        try! realm.write {
            // Delete all objects from the realm.
            realm.deleteAll()
        }
        // :snippet-end:
    }

    func testDeleteAllOfClass() {
        // :snippet-start: delete-all-of-class
        let realm = try! Realm()

        try! realm.write {
            // Delete all instances of Dog from the realm.
            let allDogs = realm.objects(DeleteExamples_Dog.self)
            realm.delete(allDogs)
        }
        // :snippet-end:
    }

    func testDeleteCollection() {
        // :snippet-start: delete-collection
        let realm = try! Realm()
        try! realm.write {
            // Find dogs younger than 2 years old.
            let puppies = realm.objects(DeleteExamples_Dog.self).filter("age < 2")

            // Delete the objects in the collection from the realm.
            realm.delete(puppies)
        }
        // :snippet-end:
    }

    func testTypeSafeQueryDeleteCollection() {
        // :snippet-start: tsq-delete-collection
        let realm = try! Realm()
        try! realm.write {
            // Find dogs younger than 2 years old.
            let puppies = realm.objects(DeleteExamples_Dog.self).where {
                $0.age < 2
            }

            // Delete the objects in the collection from the realm.
            realm.delete(puppies)
        }
        // :snippet-end:
    }

    func testDeleteMapExample() {
        // :snippet-start: map
        let realm = try! Realm()
        // :remove-start:
        // Create a test dog
        let dog = DeleteExamples_Dog()
        dog.name = "Wolfie"
        dog.currentCity = "New York"
        try! realm.write {
            realm.add(dog)
            // Set values
            dog.favoriteParksByCity["New York"] = "Domino Park"
            dog.favoriteParksByCity["Chicago"] = "Wiggly Field"
            // Another way to set values
            dog.favoriteParksByCity.setValue("Bush Park", forKey: "Ottawa")
        }
        // :remove-end:

        // Find the dog we want to update
        let wolfie = realm.objects(DeleteExamples_Dog.self).where {
            $0.name == "Wolfie"
        }.first!

        // Delete an entry
        try! realm.write {
            // Use removeObject(for:)
            wolfie.favoriteParksByCity.removeObject(for: "New York")
            // Or assign `nil` to delete non-optional values.
            // If the value type were optional (e.g. Map<String, String?>)
            // this would assign `nil` to that entry rather than deleting it.
            wolfie.favoriteParksByCity["New York"] = nil
        }
        XCTAssertNil(wolfie.favoriteParksByCity["New York"])
        // :snippet-end:
    }

    func testDeleteMutableSetExample() {
        // :snippet-start: set-collections
        let realm = try! Realm()

        // Record a dog's name and list of cities he has visited.
        let dog = DeleteExamples_Dog()
        dog.name = "Maui"
        let dogCitiesVisited = ["New York", "Boston", "Toronto"]
        try! realm.write {
            realm.add(dog)
            dog.citiesVisited.insert(objectsIn: dogCitiesVisited)
        }
        XCTAssertEqual(dog.citiesVisited.count, 3)

        // Later... we decide the dog didn't really visit Toronto
        // since the plane just stopped there for a layover.
        // Remove the element from the set.
        try! realm.write {
            dog.citiesVisited.remove("Toronto")
        }
        XCTAssertEqual(dog.citiesVisited.count, 2)

        // Or, in the case where the person entered the data for
        // the wrong dog, remove all elements from the set.
        try! realm.write {
            dog.citiesVisited.removeAll()
        }
        XCTAssertEqual(dog.citiesVisited.count, 0)
        // :snippet-end:
    }

    func testBatchUpdateAndCascadingDelete() {
        // :snippet-start: batch-update
        let realm = try! Realm()
        try! realm.write {
            // Create a person to take care of some dogs.
            let person = DeleteExamples_Person(value: ["id": 1, "name": "Ali"])
            realm.add(person)

            let dog = DeleteExamples_Dog(value: ["name": "Rex", "age": 1])
            realm.add(dog)

            // :remove-start:
            XCTAssert(person.dogs.count == 0)
            // :remove-end:
            // Find dogs younger than 2.
            let puppies = realm.objects(DeleteExamples_Dog.self).filter("age < 2")

            // Give all puppies to Ali.
            person.setValue(puppies, forKey: "dogs")

            // :remove-start:
            XCTAssert(person.dogs.count == 1)
            // :remove-end:
        }
        // :snippet-end:

        // :snippet-start: chaining-delete
        let person = realm.object(ofType: DeleteExamples_Person.self, forPrimaryKey: 1)!
        // :remove-start:
        XCTAssert(person.dogs.count == 1)
        // :remove-end:
        try! realm.write {
            // Delete the related collection
            realm.delete(person.dogs)
            realm.delete(person)
        }
        // :snippet-end:
        XCTAssert(realm.objects(DeleteExamples_Dog.self).count == 0)
        XCTAssert(realm.objects(DeleteExamples_Person.self).count == 0)
    }

    func testRemoveValueOfAnyRealmValue() {
        // :snippet-start: mixed-data-type
        let realm = try! Realm()
        // :remove-start:
        // Create an example dog
        let dog = DeleteExamples_Dog()
        dog.name = "Wolfie"
        dog.companion = .string("Fluffy the Cat")
        try! realm.write {
            realm.add(dog)
        }
        // :remove-end:

        // Wolfie's companion is "Fluffy the Cat", represented by a string.
        // Fluffy has gone to visit friends for the summer, so Wolfie has no companion.
        let wolfie = realm.objects(DeleteExamples_Dog.self).where {
            $0.name == "Wolfie"
        }.first!

        try! realm.write {
            // You cannot set an AnyRealmValue to nil; you must set it to `.none`, instead.
            wolfie.companion = .none
        }
        // :snippet-end:
    }
}
// :replace-end:
