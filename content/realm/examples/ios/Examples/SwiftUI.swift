// :replace-start: {
//   "terms": {
//     "SwiftUI_": "",
//     "Doggo": "Dog"
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: swiftui-company-model
class SwiftUI_Company: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var companyName = ""
    @Persisted var employees: List<SwiftUI_Employee>
    @Persisted var dogs: List<SwiftUI_Doggo>
}
// :snippet-end:

class SwiftUI_Employee: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""
    @Persisted var dogs: List<SwiftUI_Doggo>
    @Persisted(originProperty: "employees") var employeeInCompany: LinkingObjects<SwiftUI_Company>
}

class SwiftUI_Person: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""
    @Persisted var dogs: List<SwiftUI_Doggo>
}

class SwiftUI_Doggo: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""
    @Persisted var dogs: List<SwiftUI_Doggo>
    @Persisted var favoriteToy: SwiftUI_DogToy?
    @Persisted(originProperty: "dogs") var dogInCompany: LinkingObjects<SwiftUI_Company>
    @Persisted(originProperty: "dogs") var dogOfEmployee: LinkingObjects<SwiftUI_Employee>
}

class SwiftUI_DogToy: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""
}

class SwiftUIUnitTests: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testFreezeThawSwiftUI() throws {
        // Populate some test data
        let realm = try! Realm()
        let company = SwiftUI_Company(value: ["companyName": "MongoDB"])
        let employee = SwiftUI_Employee(value: ["name": "Dachary"])
        let dog = SwiftUI_Doggo(value: ["name": "Maui"])
        
        try! realm.write {
            realm.add(company)
            realm.add(employee)
            realm.add(dog)
        }
        
        // Retrieve the data you just populated and append the employee and dog to it
        let persistedCompany = realm.objects(SwiftUI_Company.self).where { $0.companyName == "MongoDB" }.first!
        let persistedEmployee = realm.objects(SwiftUI_Employee.self).first!
        let persistedDog = realm.objects(SwiftUI_Doggo.self).first!
        XCTAssertEqual(persistedCompany.companyName, "MongoDB")
        try! realm.write {
            persistedCompany.employees.append(persistedEmployee)
            persistedCompany.dogs.append(persistedDog)
        }
        XCTAssertEqual(persistedCompany.employees.count, 1)
        XCTAssertEqual(persistedCompany.dogs.count, 1)
        let frozenCompany = persistedCompany.freeze()
        XCTAssert(frozenCompany.isFrozen)
        print(frozenCompany)
        // At this point, the state is similar to a SwiftUI ObservedRealmObject
        // :snippet-start: write-with-swiftui-observed-realm-object
        // The `frozenCompany` here represents an `@ObservedRealmObject var company: SwiftUI_Company`
        performAnExplicitWrite(company: frozenCompany, employeeName: "Dachary", dogName: "Maui")
        
        func performAnExplicitWrite(company: SwiftUI_Company, employeeName: String, dogName: String) {
            // Get the realm that is managing the `SwiftUI_Company` object you passed in.
            // Thaw the realm so you can write to it.
            // :snippet-start: get-an-object-realm
            let realm = company.realm!.thaw()
            // :snippet-end:
            // Thawing the `SwiftUI_Company` object that you passed in also thaws the objects in its List properties.
            // This lets you append the `SwiftUI_Dog` to the `SwiftUI_Employee` without individually thawing both of them.
            // :snippet-start: thaw-the-passed-in-object
            let thawedCompany = company.thaw()!
            // :snippet-end:
            let thisEmployee = thawedCompany.employees.where { $0.name == employeeName }.first!
            let thisDog = thawedCompany.dogs.where { $0.name == dogName }.first!
            XCTAssertEqual(thisEmployee.dogs.count, 0) // :remove:
            try! realm.write {
                thisEmployee.dogs.append(thisDog)
            }
            XCTAssertEqual(thisEmployee.dogs.count, 1) // :remove:
        }
        // :snippet-end:
    }
    
    func testCreateToCopyObjectIntoRealm() throws {
        // Populate some test data
        let realm = try! Realm()
        let person = SwiftUI_Person(value: ["name": "Dachary"])
        try! realm.write {
            realm.add(person)
        }
        XCTAssertEqual(realm.objects(SwiftUI_Person.self).count, 1)
        XCTAssertEqual(realm.objects(SwiftUI_DogToy.self).count, 0)
        
        let dogToy = SwiftUI_DogToy(value: ["name": "Wubba"])
        let identifier = "secondRealm"
        let config = Realm.Configuration(
            inMemoryIdentifier: identifier)
        let secondRealm = try! Realm(configuration: config)
        XCTAssertEqual(secondRealm.objects(SwiftUI_DogToy.self).count, 0)
        try! secondRealm.write {
            secondRealm.add(dogToy)
        }
        XCTAssertEqual(secondRealm.objects(SwiftUI_DogToy.self).count, 1)
        
        let wubba = secondRealm.objects(SwiftUI_DogToy.self).where { $0.name == "Wubba" }.first!
        
        let frozenPerson = person.freeze()
        
        // :snippet-start: copy-to-realm-with-create
        // When working with an `@ObservedRealmObject` `Person`, this is a frozen object.
        // Thaw the object and get its realm to perform the write to append the new dog.
        let thawedPersonRealm = frozenPerson.thaw()!.realm!
        try! thawedPersonRealm.write {
            // Use the .create method with `update: .modified` to copy the
            // existing object into the realm
            let dog = thawedPersonRealm.create(SwiftUI_Doggo.self, value:
                                                ["name": "Maui",
                                                 "favoriteToy": wubba],
                                               update: .modified)
            person.dogs.append(dog)
        }
        // :snippet-end:
        XCTAssertEqual(person.dogs.first?.name, "Maui")
        XCTAssertEqual(person.dogs.first?.favoriteToy?.name, "Wubba")
    }
}
// :replace-end:
