// :replace-start: {
//   "terms": {
//     "ThreadingExamples_": "",
//     "fileprivate ": "",
//     "CreateExamples_": ""
//   }
// }
import XCTest
import RealmSwift

class ThreadingExamples_Person: Object {
    @Persisted var name = ""

    convenience init(name: String) {
        self.init()
        self.name = name
    }
}

class ThreadingExamples_Email: Object {
    @Persisted var read = false
}

// :snippet-start: write-async-extension
fileprivate extension Realm {
    func writeAsync<T: ThreadConfined>(_ passedObject: T, errorHandler: @escaping ((_ error: Swift.Error) -> Void) = { _ in return }, block: @escaping ((Realm, T?) -> Void)) {
        let objectReference = ThreadSafeReference(to: passedObject)
        let configuration = self.configuration
        DispatchQueue(label: "background", autoreleaseFrequency: .workItem).async {
            do {
                let realm = try Realm(configuration: configuration)
                try realm.write {
                    // Resolve within the transaction to ensure you get the latest changes from other threads
                    let object = realm.resolve(objectReference)
                    block(realm, object)
                }
            } catch {
                errorHandler(error)
            }
        }
    }
}
// :snippet-end:

class Threading: XCTestCase {
    override func setUp() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration(inMemoryIdentifier: self.name)
    }

    override func tearDown() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration()
    }

    func testFreeze() {
        // :snippet-start: freeze
        let realm = try! Realm()

        // :remove-start:
        try! realm.write {
            realm.add(ThreadingExamples_Person())
        }
        // :remove-end:
        // Get an immutable copy of the realm that can be passed across threads
        let frozenRealm = realm.freeze()

        assert(frozenRealm.isFrozen)

        let people = realm.objects(ThreadingExamples_Person.self)

        // You can freeze collections
        let frozenPeople = people.freeze()

        assert(frozenPeople.isFrozen)

        // You can still read from frozen realms
        let frozenPeople2 = frozenRealm.objects(ThreadingExamples_Person.self)

        assert(frozenPeople2.isFrozen)

        let person = people.first!

        assert(!person.realm!.isFrozen)

        // You can freeze objects
        let frozenPerson = person.freeze()

        assert(frozenPerson.isFrozen)
        // Frozen objects have a reference to a frozen realm
        assert(frozenPerson.realm!.isFrozen)
        // :snippet-end:
    }

    func testThaw() {
        let realm = try! Realm()

        try! realm.write {
            realm.add(ThreadingExamples_Person())
        }

        let frozenRealm = realm.freeze()

        // :snippet-start: thaw
        // Read from a frozen realm
        let frozenPeople = frozenRealm.objects(ThreadingExamples_Person.self)

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
        // :snippet-end:
    }

    func testAppendToFrozenCollection() {
        let hiddenRealm = try! Realm()
        let person = CreateExamples_Person(value: ["name": "Timmy"])
        let dog = CreateExamples_Dog(value: ["name": "Lassie", "age": 79, "color": "Brown and white", "currentCity": "Yorkshire"])
        try! hiddenRealm.write {
            hiddenRealm.add(person)
            hiddenRealm.add(dog)
        }
        let frozenRealm = hiddenRealm.freeze()
        // :snippet-start: append-to-frozen-collection
        // Get a copy of frozen objects.
        // Here, we're getting them from a frozen realm,
        // but you might also be passing them across threads.
        let frozenTimmy = frozenRealm.objects(CreateExamples_Person.self).where {
            $0.name == "Timmy"
        }.first!
        let frozenLassie = frozenRealm.objects(CreateExamples_Dog.self).where {
            $0.name == "Lassie"
        }.first!
        // Confirm the objects are frozen.
        assert(frozenTimmy.isFrozen == true)
        assert(frozenLassie.isFrozen == true)
        // Thaw the frozen objects. You must thaw both the object
        // you want to append and the collection you want to append it to.
        let thawedTimmy = frozenTimmy.thaw()
        let thawedLassie = frozenLassie.thaw()
        let realm = try! Realm()
        try! realm.write {
            thawedTimmy?.dogs.append(thawedLassie!)
        }
        XCTAssertEqual(thawedTimmy?.dogs.first?.name, "Lassie")
        // :snippet-end:
    }

    func testPassAcrossThreads() {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: pass-across-threads
        let person = ThreadingExamples_Person(name: "Jane")
        let realm = try! Realm()

        try! realm.write {
            realm.add(person)
        }

        // Create thread-safe reference to person
        let personRef = ThreadSafeReference(to: person)

        // Pass the reference to a background thread
        DispatchQueue(label: "background", autoreleaseFrequency: .workItem).async {
            let realm = try! Realm()
            try! realm.write {
                // Resolve within the transaction to ensure you get the latest changes from other threads
                guard let person = realm.resolve(personRef) else {
                    return // person was deleted
                }
                person.name = "Jane Doe"
            }
            expectation.fulfill() // :remove:
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testThreadSafeWrapper() {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: threadsafe-wrapper
        let realm = try! Realm()

        let person = ThreadingExamples_Person(name: "Jane")
        try! realm.write {
            realm.add(person)
        }

        // Create thread-safe reference to person
        @ThreadSafe var personRef = person

        // @ThreadSafe vars are always optional. If the referenced object is deleted,
        // the @ThreadSafe var will be nullified.
        print("Person's name: \(personRef?.name ?? "unknown")")

        // Pass the reference to a background thread
        DispatchQueue(label: "background", autoreleaseFrequency: .workItem).async {
            let realm = try! Realm()
            try! realm.write {
                // Resolve within the transaction to ensure you get the
                // latest changes from other threads. If the person
                // object was deleted, personRef will be nil.
                guard let person = personRef else {
                    return // person was deleted
                }
                person.name = "Jane Doe"
            }
            expectation.fulfill() // :remove:
        }
        // :snippet-end:

        wait(for: [expectation], timeout: 10)
    }

    func testThreadSafeWrapperParameter() async {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: threadsafe-wrapper-function-parameter
        func someLongCallToGetNewName() async -> String {
            return "Janet"
        }
        
        @MainActor
        func loadNameInBackground(@ThreadSafe person: ThreadingExamples_Person?) async {
            let newName = await someLongCallToGetNewName()
            let realm = try! await Realm()
            try! realm.write {
                person?.name = newName
            }
            expectation.fulfill() // :remove:
        }

        @MainActor
        func createAndUpdatePerson() async {
            let realm = try! await Realm()
            
            let person = ThreadingExamples_Person(name: "Jane")
            try! realm.write {
                realm.add(person)
            }
            await loadNameInBackground(person: person)
            XCTAssertEqual(person.name, "Janet") // :remove:
        }
        
        await createAndUpdatePerson()
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testWriteAsyncExtension() {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: use-write-async-extension
        let realm = try! Realm()
        let readEmails = realm.objects(ThreadingExamples_Email.self).where {
            $0.read == true
        }
        realm.writeAsync(readEmails) { (realm, readEmails) in
            guard let readEmails = readEmails else {
                // Already deleted
                expectation.fulfill() // :remove:
                return
            }
            realm.delete(readEmails)
            expectation.fulfill() // :remove:
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testCreateSerialQueueToUseRealm() {
        // :snippet-start: use-realm-with-serial-queue
        // Initialize a serial queue, and
        // perform realm operations on it
        let serialQueue = DispatchQueue(label: "serial-queue")
        serialQueue.async {
            let realm = try! Realm(configuration: .defaultConfiguration, queue: serialQueue)
            // Do something with Realm on the non-main thread
        }
        // :snippet-end:
    }
}

// :replace-end:
