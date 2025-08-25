// :replace-start: {
//   "terms": {
//     "EventLibrary_": "",
//     "CustomEventLibrary_": ""
//   }
// }

import XCTest
import RealmSwift

class EventLibrary_Person: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var employeeId: Int
    @Persisted var userId: String?
    @Persisted var office: EventLibrary_Office?

    convenience init(name: String, employeeId: Int) {
        self.init()
        self.name = name
        self.employeeId = employeeId
    }
}

class EventLibrary_Office: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var city: String
    @Persisted var locationNumber: Int
}

// :snippet-start: custom-event-representable
// To customize event serialization, your object must
// conform to the `CustomEventRepresentable` protocol.
class CustomEventLibrary_Person: Object, CustomEventRepresentable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var employeeId: Int
    @Persisted var userId: String?

    convenience init(name: String, employeeId: Int) {
        self.init()
        self.name = name
        self.employeeId = employeeId
    }

    // To conform to `CustomEventRepresentable`, your object
    // must implement a `customEventRepresentation` func that
    // defines your customized event serialization
    func customEventRepresentation() -> String {
        if employeeId == 0 {
            return "invalid json"
        }
        return "{\"int\": \(employeeId)}"
    }
}
// :snippet-end:

class EventLibrary: XCTestCase {

    override func tearDown() {
        app.login(credentials: Credentials.anonymous) { (result) in
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }
                let client = app.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "sync_examples")
                let collection = database.collection(withName: "AuditEvent")
                let writeFilter: Document = ["event": "write"]
                let readFilter: Document = ["event": "read"]
                let customFilter: Document = ["event": "custom event"]
                collection.deleteManyDocuments(filter: writeFilter) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let deletedResult):
                        print("Successfully deleted \(deletedResult) documents.")
                    }
                }
                collection.deleteManyDocuments(filter: readFilter) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let deletedResult):
                        print("Successfully deleted \(deletedResult) documents.")
                    }
                }
                collection.deleteManyDocuments(filter: customFilter) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let deletedResult):
                        print("Successfully deleted \(deletedResult) documents.")
                    }
                }
            }
        }
    }

    func testDefaultEventInitilization() {
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Continue
                print("Successfully logged in to app")
                initializeDefaultEventConfiguration()
            }
        }
        func initializeDefaultEventConfiguration() {
            let user = app.currentUser!
            // :snippet-start: default-event-configuration
            var config = user.configuration(partitionValue: "Some partition value")
            config.eventConfiguration = EventConfiguration()
            // :snippet-end:
        }
    }

    func testEventInitilizationWithParams() {
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Continue
                print("Successfully logged in to app")
//                initializeEventConfigurationWithParameters()
            }
        }

        func initializeEventConfigurationWithParameters(user: User) async throws {
            // :snippet-start: event-configuration-with-params
            let eventSyncUser = try await app.login(credentials: Credentials.anonymous)
            var config = user.configuration(partitionValue: "Some partition value")
            config.eventConfiguration = EventConfiguration(metadata: ["username": "Jason Bourne"], syncUser: eventSyncUser, partitionPrefix: "event-")
            // :snippet-end:
        }
    }
    
    func testUpdateEventInitilizationParams() {
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Continue
                print("Successfully logged in to app")
                // :snippet-start: update-event-metadata
                var config = user.configuration(partitionValue: "Some partition value")
                config.eventConfiguration = EventConfiguration(metadata: ["username": "Jason Bourne"], syncUser: user, partitionPrefix: "event-")
                config.objectTypes = [EventLibrary_Person.self, EventLibrary_Office.self] // :remove:
                let realm = try! Realm(configuration: config)
                let events = realm.events!
                let updateUsernameScope = events.beginScope(activity: "Update username")
                // Call some function that updates the user's username
                updateUsername()
                updateUsernameScope.commit()
                // Update the metadata you supplied with the initial EventConfiguration
                events.updateMetadata(["username": "John Michael Kane"])
                // :snippet-end:
            }
        }
        
        func updateUsername() {
            print("This is an empty func just for the example")
        }
    }

    func testInvokeEventRealm() {
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Continue
                print("Successfully logged in to app")
                invokeEventRealm()
            }
        }

        func invokeEventRealm() {
            let user = app.currentUser!
            var config = user.configuration(partitionValue: "Some partition value")
            config.eventConfiguration = EventConfiguration()
            config.objectTypes = [EventLibrary_Person.self, EventLibrary_Office.self]
            // :snippet-start: invoke-event-realm
            let realm = try! Realm(configuration: config)
            let events = realm.events!
            // :snippet-end:
        }
    }

    func testRecordReadAndWriteEvents() {
        let expectation = XCTestExpectation(description: "Populate a read and write event")
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in to app")
                let partitionValue = UUID().uuidString
                var config = user.configuration(partitionValue: partitionValue)
                config.eventConfiguration = EventConfiguration()
                config.objectTypes = [EventLibrary_Person.self, EventLibrary_Office.self]
                Realm.asyncOpen(configuration: config) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                    case .success(let realm):
                        recordReadAndWriteEvents(realm)
                    }
                }
            }
        }

        func recordReadAndWriteEvents(_ realm: Realm) {
            let events = realm.events!
            let writeEventScope = events.beginScope(activity: "write object")
            // Record write event
            try! realm.write {
                realm.create(EventLibrary_Person.self, value: ["name": "Anthony", "employeeId": 1])
            }
            writeEventScope.commit()
            // :snippet-start: record-read-and-write-events
            // Read event
            let readEventScope = events.beginScope(activity: "read object")
            let person = realm.objects(EventLibrary_Person.self).first!
            print("Found this person: \(person.name)")
            readEventScope.commit()
            let mutateEventScope = events.beginScope(activity: "mutate object")
            // Write event
            try! realm.write {
                // Change name from "Anthony" to "Tony"
                person.name = "Tony"
            }
            mutateEventScope.commit()
            // :snippet-end:
            // :snippet-start: scoped-event-with-completion
            let mutateScope = events.beginScope(activity: "mutate object with completion")
            // Write event
            try! realm.write {
                // Add a userId
                person.userId = "tony.stark@starkindustries.com"
            }
            mutateScope.commit(completion: { error in
                if let error = error {
                    print("Error recording write event: \(error.localizedDescription)")
                    return
                }
                print("Successfully recorded a write event")
            })
            // :snippet-end:
            // :snippet-start: cancel-event-scope
            let eventScope = events.beginScope(activity: "read object")
            let person1 = realm.objects(EventLibrary_Person.self).first!
            print("Found this person: \(person1.name)")
            eventScope.cancel()
            // :snippet-end:
            // :snippet-start: check-event-scope
            let readPersonScope = events.beginScope(activity: "read object")
            let person2 = realm.objects(EventLibrary_Person.self).first!
            print("Found this person: \(person2.name)")
            if readPersonScope.isActive {
                print("The readPersonScope is active")
            } else {
                print("The readPersonScope is no longer active")
            }
            readPersonScope.cancel()
            // :snippet-end:
            let deleteEventScope = events.beginScope(activity: "delete objects")
            // Record delete events
            try! realm.write {
                realm.deleteAll()
            }
            deleteEventScope.commit()
            // Add a sleep to delay closing the realm so the audit events can upload
            sleep(10)
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 25)
    }

    func testRecordCustomEvents() {
        let expectation = XCTestExpectation(description: "Record a custom event")
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in to app")
                let user = app.currentUser!
                var config = user.configuration(partitionValue: UUID().uuidString)
                config.eventConfiguration = EventConfiguration()
                config.objectTypes = [EventLibrary_Person.self, EventLibrary_Office.self]
                Realm.asyncOpen(configuration: config) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                    case .success(let realm):
                        let events = realm.events!
                        // :snippet-start: record-custom-events
                        events.recordEvent(activity: "event", eventType: "custom event")
                        // :snippet-end:
                        // Add a sleep to delay closing the realm so the audit events can upload
                        sleep(10)
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 20)
    }

    func testEmbeddedObject() {
        let expectation = XCTestExpectation(description: "Test Embedded Objects")
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in to app")
                let partitionValue = UUID().uuidString
                var config = user.configuration(partitionValue: partitionValue)
                config.eventConfiguration = EventConfiguration()
                config.objectTypes = [EventLibrary_Person.self, EventLibrary_Office.self]
                Realm.asyncOpen(configuration: config) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                    case .success(let realm):
                        // Create a person to use in this func
                        try! realm.write {
                            let person = EventLibrary_Person(value: ["name": "Michael Scott", "employeeId": 1])
                            let office = EventLibrary_Office(value: ["name": "Dunder Mifflin", "city": "Scranton", "locationNumber": 123])
                            realm.add(person)
                            person.office = office
                        }
                        recordEmbeddedObjectEvents(realm)
                    }
                }
            }
        }

        func recordEmbeddedObjectEvents(_ realm: Realm) {
            let events = realm.events!
            let embeddedScope = events.beginScope(activity: "read embedded object")
            let person = realm.objects(EventLibrary_Person.self).where {
                $0.name == "Michael Scott"
            }.first!
            print("Found this person: \(person.name)")
            embeddedScope.commit()
            let embeddedScopeParentObject = events.beginScope(activity: "read embedded object with followed link")
            print("\(person.name)'s employee id is: \(person.employeeId) and they work in: \(person.office?.name) which is location number: \(person.office?.locationNumber)")
            embeddedScopeParentObject.commit()
            try! realm.write {
                realm.deleteAll()
            }
            // Add a sleep to delay closing the realm so the audit events can upload
            sleep(10)
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 25)
    }
}
// :replace-end:
