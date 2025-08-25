// :replace-start: {
//   "terms": {
//     "ObjectModelsExamples_": "",
//     "ObjectModelsObjcDynamicExamples_": "",
//     "OptionalRequiredPropertyExample_": "",
//     "OptionalRequiredPropertyObjcDynamicExample_": "",
//     "ObjectModelsExamplesRename_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: define-a-model
// A dog has an _id primary key, a string name, an optional
// string breed, and a date of birth.
class ObjectModelsExamples_Dog: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""
    @Persisted var breed: String?
    @Persisted var dateOfBirth = Date()
}
// :snippet-end:

// :snippet-start: optional-required-properties
class OptionalRequiredPropertyExample_Person: Object {
    // Required string property
    @Persisted var name = ""

    // Optional string property
    @Persisted var address: String?

    // Required numeric property
    @Persisted var ageYears = 0

    // Optional numeric property
    @Persisted var heightCm: Float?
}
// :snippet-end:

// :snippet-start: optional-required-properties-objc-dynamic
class OptionalRequiredPropertyObjcDynamicExample_Person: Object {
    // Required string property
    @objc dynamic var name = ""

    // Optional string property
    @objc dynamic var address: String?

    // Required numeric property
    @objc dynamic var ageYears = 0

    // Optional numeric property
    let heightCm = RealmProperty<Float?>()
}
// :snippet-end:

// :snippet-start: specify-a-primary-key
class ObjectModelsExamples_Project: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""
}
// :snippet-end:

// :snippet-start: specify-a-primary-key-objc-dynamic
class ObjectModelsObjcDynamicExamples_Project: Object {
    @objc dynamic var id = 0
    @objc dynamic var name = ""

    // Return the name of the primary key property
    override static func primaryKey() -> String? {
        return "id"
    }
}
// :snippet-end:

// :snippet-start: index-a-property
class ObjectModelsExamples_Book: Object {
    @Persisted var priceCents = 0
    @Persisted(indexed: true) var title = ""
}
// :snippet-end:

// :snippet-start: index-a-property-objc-dynamic
class ObjectModelsObjcDynamicExamples_Book: Object {
    @objc dynamic var priceCents = 0
    @objc dynamic var title = ""

    // Return a list of indexed property names
    override static func indexedProperties() -> [String] {
        return ["title"]
    }
}
// :snippet-end:

// :snippet-start: ignore-a-property
class ObjectModelsExamples_Person: Object {
    // If some properties are marked as @Persisted,
    // any properties that do not have the @Persisted
    // annotation are automatically ignored.
    var tmpId = 0

    // The @Persisted properties are managed
    @Persisted var firstName = ""
    @Persisted var lastName = ""

    // Read-only properties are automatically ignored
    var name: String {
        return "\(firstName) \(lastName)"
    }

    // If you mix the pre-10.10 property declaration
    // syntax `@objc dynamic` with the 10.10+ @Persisted
    // annotation within a class, `@objc dynamic`
    // properties are ignored.
    @objc dynamic var email = ""
}
// :snippet-end:

// :snippet-start: ignore-a-property-objc-dynamic
class ObjectModelsObjcDynamicExamples_Person: Object {
    @objc dynamic var tmpId = 0
    @objc dynamic var firstName = ""
    @objc dynamic var lastName = ""

    // Read-only properties are automatically ignored
    var name: String {
        return "\(firstName) \(lastName)"
    }

    // Return a list of ignored property names
    override static func ignoredProperties() -> [String] {
        return ["tmpId"]
    }
}
// :snippet-end:

// :snippet-start: realm-object-enum
// Define the enum
enum ObjectModelsExamples_TaskStatusEnum: String, PersistableEnum {
    case notStarted
    case inProgress
    case complete
}

// To use the enum:
class ObjectModelsExamples_Task: Object {
    @Persisted var name: String = ""
    @Persisted var owner: String?

    // Required enum property
    @Persisted var status = ObjectModelsExamples_TaskStatusEnum.notStarted // :emphasize:

    // Optional enum property
    @Persisted var optionalTaskStatusEnumProperty: ObjectModelsExamples_TaskStatusEnum? // :emphasize:
}
// :snippet-end:

// :snippet-start: realm-object-enum-objc-dynamic
// Define the enum
@objc enum ObjectModelsObjcDynamicExamples_TaskStatusEnum: Int, RealmEnum {
    case notStarted = 1
    case inProgress = 2
    case complete = 3
}

// To use the enum:
class ObjectModelsObjcDynamicExamples_Task: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var owner: String?

    // Required enum property
    @objc dynamic var status = ObjectModelsObjcDynamicExamples_TaskStatusEnum.notStarted // :emphasize:
    // Optional enum property
    let optionalTaskStatusEnumProperty = RealmProperty<ObjectModelsObjcDynamicExamples_TaskStatusEnum?>() // :emphasize:
}
// :snippet-end:

// :snippet-start: rename-a-property
class ObjectModelsExamplesRename_Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    
    override class public func propertiesMapping() -> [String: String] {
        ["firstName": "first_name",
         "lastName": "last_name"]
    }
}
// :snippet-end:

class ObjectModelsExamples_MyModel: Object {
    @Persisted var someProperty = 0
}

class ObjectModels: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }
    
    func testGenericCollectionFunc() {
        // :snippet-start: generic-collection
        func operateOn<C: RealmCollection>(collection: C) {
            // Collection could be either Results or List
            print("operating on collection containing \(collection.count) objects")
        }
        // :snippet-end:
    }

    func testAnyRealmCollection() {
        // :snippet-start: any-realm-collection
        class ViewController {
        //    let collection: RealmCollection
        //                    ^
        //                    error: protocol 'RealmCollection' can only be used
        //                    as a generic constraint because it has Self or
        //                    associated type requirements
        //
        //    init<C: RealmCollection>(collection: C) where C.ElementType == ObjectModelsExamples_MyModel {
        //        self.collection = collection
        //    }

            let collection: AnyRealmCollection<ObjectModelsExamples_MyModel>

            init<C: RealmCollection & _ObjcBridgeable>(collection: C) where C.ElementType == ObjectModelsExamples_MyModel {
                self.collection = AnyRealmCollection(collection)
            }
        }
        // :snippet-end:
    }
    
    func testPropertiesMapping() {
        let person = ObjectModelsExamplesRename_Person(value: ["firstName": "Jon", "lastName": "Snow"])

        let realm = try! Realm()
        try! realm.write {
            realm.add(person)
        }
        
        let people = realm.objects(ObjectModelsExamplesRename_Person.self)
        let specificPerson = people.where {
            $0.firstName == "Jon"
        }.first!
        XCTAssertNotNil(specificPerson)
    }
}

// :replace-end:
