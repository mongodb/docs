// :replace-start: {
//   "terms": {
//     "RealmActor_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: model
class RealmActor_Todo: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var owner: String
    @Persisted var status: String
}
//  :snippet-end:

// :snippet-start: define-realm-actor
actor RealmActor {
    // An implicitly-unwrapped optional is used here to let us pass `self` to
    // `Realm(actor:)` within `init`
    var realm: Realm!
    init() async throws {
        realm = try await Realm(actor: self)
    }

    var count: Int {
        realm.objects(RealmActor_Todo.self).count
    }
    
    // :snippet-start: write-async
    func createTodo(name: String, owner: String, status: String) async throws {
        try await realm.asyncWrite {
            realm.create(RealmActor_Todo.self, value: [
                "_id": ObjectId.generate(),
                "name": name,
                "owner": owner,
                "status": status
            ])
        }
    }
    // :snippet-end:
    // :remove-start:
    func getObjectId(forTodoNamed name: String) async -> ObjectId {
        let todo = realm.objects(RealmActor_Todo.self).where {
            $0.name == name
        }.first!
        return todo._id
    }
    // :remove-end:
    
    func getTodoOwner(forTodoNamed name: String) -> String {
        let todo = realm.objects(RealmActor_Todo.self).where {
            $0.name == name
        }.first!
        return todo.owner
    }
    
    // :snippet-start: pass-data-as-struct
    struct TodoStruct {
        var id: ObjectId
        var name, owner, status: String
    }
    
    func getTodoAsStruct(forTodoNamed name: String) -> TodoStruct {
        let todo = realm.objects(RealmActor_Todo.self).where {
            $0.name == name
        }.first!
        return TodoStruct(id: todo._id, name: todo.name, owner: todo.owner, status: todo.status)
    }
    // :snippet-end:
    
    // :snippet-start: update-async
    func updateTodo(_id: ObjectId, name: String, owner: String, status: String) async throws {
        try await realm.asyncWrite {
            realm.create(RealmActor_Todo.self, value: [
                "_id": _id,
                "name": name,
                "owner": owner,
                "status": status
            ], update: .modified)
        }
    }
    // :snippet-end:
    
    // :snippet-start: delete-async
    func deleteTodo(id: ObjectId) async throws {
        try await realm.asyncWrite {
            let todoToDelete = realm.object(ofType: RealmActor_Todo.self, forPrimaryKey: id)
            realm.delete(todoToDelete!)
        }
    }
    // :snippet-end:
    
    func close() {
        realm = nil
    }
    
    // :remove-start:
    func removeAll() async throws {
        try await realm.asyncWrite {
            let allTodos = realm.objects(RealmActor_Todo.self)
            realm.delete(allTodos)
        }
    }
    // :remove-end:
}
// :snippet-end:

class RealmActorTests: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDown() async throws {
        let actor = try await RealmActor()
        try await actor.removeAll()
        await actor.close()
    }
    
#if swift(>=5.8)
    func testActorIsolatedRealmAsync() async throws {
        // :snippet-start: actor-isolated-realm-async
        func createObject() async throws {
            // Because this function is not isolated to this actor,
            // you must await operations completed on the actor
            try await actor.createTodo(name: "Take the ring to Mount Doom", owner: "Frodo", status: "In Progress")
            let taskCount = await actor.count
            print("The actor currently has \(taskCount) tasks")
            XCTAssertEqual(taskCount, 1) // :remove:
        }
        
        let actor = try await RealmActor()
        
        try await createObject()
        // :snippet-end:
        await actor.close()
    }
    
    func testActorIsolatedRealmSynchronous() async throws {
        // :snippet-start: actor-isolated-realm-synchronous
        func createObject(in actor: isolated RealmActor) async throws {
            // Because this function is isolated to this actor, you can use
            // realm synchronously in this context without async/await keywords
            try actor.realm.write {
                actor.realm.create(RealmActor_Todo.self, value: [
                    "name": "Keep it secret",
                    "owner": "Frodo",
                    "status": "In Progress"
                ])
            }
            let taskCount = actor.count
            print("The actor currently has \(taskCount) tasks")
            XCTAssertEqual(taskCount, 1) // :remove:
        }
        
        let actor = try await RealmActor()
        
        try await createObject(in: actor)
        // :snippet-end:
        await actor.close()
    }
    
    func testActorIsolatedRealmUpdate() async throws {
        func createObject(in actor: isolated RealmActor) async throws {
            try actor.realm.write {
                actor.realm.create(RealmActor_Todo.self, value: [
                    "name": "Keep it safe",
                    "owner": "Frodo",
                    "status": "In Progress"
                ])
            }
        }
        // :snippet-start: update-object
        // :snippet-start: read-objects
        let actor = try await RealmActor()
        try await createObject(in: actor) // :remove:
        
        // Read objects in functions isolated to the actor and pass primitive values to the caller
        func getObjectId(in actor: isolated RealmActor, forTodoNamed name: String) async -> ObjectId {
            let todo = actor.realm.objects(RealmActor_Todo.self).where {
                $0.name == name
            }.first!
            return todo._id
        }
        let objectId = await getObjectId(in: actor, forTodoNamed: "Keep it safe")
        // :snippet-end:
        XCTAssertNotNil(objectId) // :remove:

        try await actor.updateTodo(_id: objectId, name: "Keep it safe", owner: "Frodo", status: "Completed")
        // :snippet-end:
        func getTodoStatus(in actor: isolated RealmActor, for id: ObjectId) async -> String {
            let todo = actor.realm.objects(RealmActor_Todo.self).where {
                $0._id == id
            }.first!
            return todo.status
        }
        let todoStatus = await getTodoStatus(in: actor, for: objectId)
        XCTAssertEqual(todoStatus, "Completed")
        await actor.close()
    }
    
    func testActorIsolatedRealmDelete() async throws {
        func createObject(in actor: isolated RealmActor) async throws {
            try actor.realm.write {
                actor.realm.create(RealmActor_Todo.self, value: [
                    "name": "Keep Mr. Frodo safe from that Gollum",
                    "owner": "Sam",
                    "status": "In Progress"
                ])
            }
        }
        // :snippet-start: delete-object
        let actor = try await RealmActor()
        // :remove-start:
        try await createObject(in: actor)
        let todoCount = await actor.count
        XCTAssertEqual(todoCount, 1)
        // :remove-end:
        let todoId = await actor.getObjectId(forTodoNamed: "Keep Mr. Frodo safe from that Gollum")
        XCTAssertNotNil(todoId) // :remove:
        
        try await actor.deleteTodo(id: todoId)
        let updatedTodoCount = await actor.count
        XCTAssertEqual(updatedTodoCount, 0) // :remove:
        if updatedTodoCount == todoCount - 1 {
            print("Successfully deleted the todo")
        }
        // :snippet-end:
        await actor.close()
    }
    
    func testOpenActorConfinedRealm() async throws {
        try await mainThreadFunction()
        // :snippet-start: await-main-actor-realm
        @MainActor
        func mainThreadFunction() async throws {
            // These are identical: the async init produces a
            // MainActor-isolated Realm if no actor is supplied
            let realm1 = try await Realm()
            let realm2 = try await Realm(actor: MainActor.shared)
            
            try await useTheRealm(realm: realm1)
        }
        // :snippet-end:
        @MainActor
        func useTheRealm(realm: Realm) async throws {
            let todoItems = realm.objects(RealmActor_Todo.self)
            XCTAssertEqual(todoItems.count, 0) // :remove:
            print("Todo item count is: \(todoItems.count)")
            
            try! realm.write {
                realm.create(RealmActor_Todo.self, value: [
                    "name": "Go to see the elves",
                    "owner": "Sam",
                    "status": "In Progress"
                ])
            }
            await realm.asyncRefresh()
            XCTAssertEqual(todoItems.count, 1)
            print("Todo item count is now: \(todoItems.count)")
        }
    }
    
    func testOpenActorConfinedRealmWithConfig() async throws {
        try await mainThreadFunction()
        // :snippet-start: actor-confined-realm-with-config
        @MainActor
        func mainThreadFunction() async throws {
            let username = "Galadriel"
            
            // Customize the default realm config
            var config = Realm.Configuration.defaultConfiguration
            config.fileURL!.deleteLastPathComponent()
            config.fileURL!.appendPathComponent(username)
            config.fileURL!.appendPathExtension("realm")
            
            // Open an actor-isolated realm with a specific configuration
            let realm = try await Realm(configuration: config, actor: MainActor.shared)
            
            try await useTheRealm(realm: realm)
        }
        // :snippet-end:
        @MainActor
        func useTheRealm(realm: Realm) async throws {
            let todoItems = realm.objects(RealmActor_Todo.self)
            XCTAssertEqual(todoItems.count, 0)
            print("Todo item count is: \(todoItems.count)")
            
            try! realm.write {
                realm.create(RealmActor_Todo.self, value: [
                    "name": "Diminish and go into the West",
                    "owner": "Galadriel",
                    "status": "In Progress"
                ])
            }
            await realm.asyncRefresh()
            XCTAssertEqual(todoItems.count, 1)
            print("Todo item count is now: \(todoItems.count)")
            try realm.write {
                realm.deleteAll()
            }
            XCTAssertEqual(todoItems.count, 0)
        }
    }
    
    func testOpenActorConfinedSyncedRealm() async throws {
        try await mainThreadFunction()
        // :snippet-start: actor-confined-synced-realm
        @MainActor
        func mainThreadFunction() async throws {
            // Initialize the app client and authenticate a user
            let app = App(id: APPID)
            let user = try await app.login(credentials: Credentials.anonymous)
            
            // Configure the synced realm
            var flexSyncConfig = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
                subs.append(QuerySubscription<RealmActor_Todo>(name: "all_todos"))})
            flexSyncConfig.objectTypes = [RealmActor_Todo.self]
            
            // Open and use the synced realm
            let realm = try await Realm(configuration: flexSyncConfig, actor: MainActor.shared, downloadBeforeOpen: .always)
            try await useTheSyncedRealm(realm: realm)
        }
        // :snippet-end:
        @MainActor
        func useTheSyncedRealm(realm: Realm) async throws {
            let todoItems = realm.objects(RealmActor_Todo.self)
            XCTAssertEqual(todoItems.count, 0)
            print("Todo item count at start of test is: \(todoItems.count)")

            try! realm.write {
                realm.create(RealmActor_Todo.self, value: [
                    "name": "Keep the ring-bearer safe",
                    "owner": "Aragorn",
                    "status": "In Progress"
                ])
            }
            sleep(2)
            XCTAssertEqual(todoItems.count, 1)
            print("Todo item count after adding an item is: \(todoItems.count)")
            print("The first todo ID is: \(todoItems.first!._id)")
            try! realm.write {
                realm.deleteAll()
            }
            sleep(2)
            print("Todo item count after deleting is: \(todoItems.count)")
            XCTAssertEqual(todoItems.count, 0)
        }
    }
    
    func testAwaitBackgroundActor() async throws {
        try await mainThreadFunction()
        
        // :snippet-start: global-actor-example
        // A simple example of a custom global actor
        @globalActor actor BackgroundActor: GlobalActor {
            static var shared = BackgroundActor()
        }

        @BackgroundActor
        func backgroundThreadFunction() async throws {
            // Explicitly specifying the actor is required for anything that is not MainActor
            let realm = try await Realm(actor: BackgroundActor.shared)
            try await realm.asyncWrite {
                _ = realm.create(RealmActor_Todo.self, value: [
                    "name": "Pledge fealty and service to Gondor",
                    "owner": "Pippin",
                    "status": "In Progress"
                ])
            }
            // Thread-confined Realms would sometimes throw an exception here, as we
            // may end up on a different thread after an `await`
            let todoCount = realm.objects(RealmActor_Todo.self).count
            print("The number of Realm objects is: \(todoCount)")
            XCTAssertEqual(todoCount, 1) // :remove:
        }
        
        @MainActor
        func mainThreadFunction() async throws {
            try await backgroundThreadFunction()
        }
        // :snippet-end:
    }
    
    func testObserveCollectionOnActor() async throws {
        let expectation = expectation(description: "A notification is triggered")
        // :snippet-start: observe-collection-on-actor
        // Create a simple actor
        // :snippet-start: resolve-tsr-on-actor
        actor BackgroundActor {
            public func deleteTodo(tsrToTodo tsr: ThreadSafeReference<RealmActor_Todo>) throws {
                let realm = try! Realm()
                try realm.write {
                    // Resolve the thread safe reference on the Actor where you want to use it.
                    // Then, do something with the object.
                    let todoOnActor = realm.resolve(tsr)
                    realm.delete(todoOnActor!)
                }
            }
        }
        // :snippet-end:

        // Execute some code on a different actor - in this case, the MainActor
        @MainActor
        func mainThreadFunction() async throws {
            let backgroundActor = BackgroundActor()
            let realm = try! await Realm()
            
            // Create a todo item so there is something to observe
            try await realm.asyncWrite {
                realm.create(RealmActor_Todo.self, value: [
                    "_id": ObjectId.generate(),
                    "name": "Arrive safely in Bree",
                    "owner": "Merry",
                    "status": "In Progress"
                ])
            }
            
            // Get the collection of todos on the current actor
            let todoCollection = realm.objects(RealmActor_Todo.self)
            XCTAssertEqual(todoCollection.count, 1) // :remove:
            
            // Register a notification token, providing the actor where you want to observe changes.
            // This is only required if you want to observe on a different actor.
            let token = await todoCollection.observe(on: backgroundActor, { actor, changes in
                print("A change occurred on actor: \(actor)")
                switch changes {
                case .initial:
                    print("The initial value of the changed object was: \(changes)")
                    expectation.fulfill() // :remove:
                case .update(_, let deletions, let insertions, let modifications):
                    if !deletions.isEmpty {
                        print("An object was deleted: \(changes)")
                    } else if !insertions.isEmpty {
                        print("An object was inserted: \(changes)")
                    } else if !modifications.isEmpty {
                        print("An object was modified: \(changes)")
                    }
                case .error(let error):
                    print("An error occurred: \(error.localizedDescription)")
                }
            })
            
            // Update an object to trigger the notification.
            // This example triggers a notification that the object is deleted.
            // :snippet-start: pass-tsr-across-actor-boundaries
            // We can pass a thread-safe reference to an object to update it on a different actor.
            let todo = todoCollection.where {
                $0.name == "Arrive safely in Bree"
            }.first!
            let threadSafeReferenceToTodo = ThreadSafeReference(to: todo)
            try await backgroundActor.deleteTodo(tsrToTodo: threadSafeReferenceToTodo)
            // :snippet-end:

            // Invalidate the token when done observing
            token.invalidate()
        }
        // :snippet-end:
        
        try await mainThreadFunction()

        await fulfillment(of: [expectation], timeout: 5)
    }
    
    func testObserveObjectOnActor() async throws {
        let expectation = expectation(description: "A notification is triggered")
        actor BackgroundActor { }
        // :snippet-start: observe-object-on-actor
        // Execute some code on a specific actor - in this case, the MainActor
        @MainActor
        func mainThreadFunction() async throws {
            // Initialize an instance of another actor
            // where you want to do background work
            let backgroundActor = BackgroundActor()
            
            // Create a todo item so there is something to observe
            let realm = try! await Realm()
            let scourTheShire = try await realm.asyncWrite {
                return realm.create(RealmActor_Todo.self, value: [
                    "_id": ObjectId.generate(),
                    "name": "Scour the Shire",
                    "owner": "Merry",
                    "status": "In Progress"
                ])
            }
            XCTAssertNotNil(scourTheShire) // :remove:
            
            // Register a notification token, providing the actor
            let token = await scourTheShire.observe(on: backgroundActor, { actor, change in
                print("A change occurred on actor: \(actor)")
                switch change {
                case .change(let object, let properties):
                    for property in properties {
                        print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
                    }
                    expectation.fulfill() // :remove:
                case .error(let error):
                    print("An error occurred: \(error)")
                case .deleted:
                    print("The object was deleted.")
                }
            })
            XCTAssertEqual(scourTheShire.status, "In Progress") // :remove:
            
            // Update the object to trigger the notification.
            // This triggers a notification that the object's `status` property has been changed.
            try await realm.asyncWrite {
                scourTheShire.status = "Complete"
            }
            
            // Invalidate the token when done observing
            token.invalidate()
            await realm.asyncRefresh() // :remove:
        }
        // :snippet-end:
        
        try await mainThreadFunction()
        
        await fulfillment(of: [expectation], timeout: 15)
    }
    
    func testQueryForDataOnAnotherActor() async throws {
        try await mainThreadFunction()
        actor BackgroundActor { }
        
        // :snippet-start: query-for-data-on-another-actor
        // Execute code on a specific actor - in this case, the @MainActor
        @MainActor
        func mainThreadFunction() async throws {
            // Create an object off the main actor
            func createObject(in actor: isolated BackgroundActor) async throws -> ObjectId {
                let realm = try await Realm(actor: actor)
                let newTodo = try await realm.asyncWrite {
                    return realm.create(RealmActor_Todo.self, value: [
                        "name": "Pledge fealty and service to Gondor",
                        "owner": "Pippin",
                        "status": "In Progress"
                    ])
                }
                
                XCTAssertEqual(realm.objects(RealmActor_Todo.self).count, 1) // :remove:
                // Share the todo's primary key so we can easily query for it on another actor
                return newTodo._id
            }

            // Initialize an actor where you want to perform background work
            let actor = BackgroundActor()
            let newTodoId = try await createObject(in: actor)
            let realm = try await Realm()
            let todoOnMainActor = realm.object(ofType: RealmActor_Todo.self, forPrimaryKey: newTodoId)
            XCTAssertNotNil(todoOnMainActor) // :remove:
        }
        // :snippet-end:
    }
    
    func testPassPrimitiveDataAcrossActors() async throws {
        try await mainThreadFunction()
        
        // :snippet-start: pass-primitive-data-across-actors
        @MainActor
        func mainThreadFunction() async throws {
            // Create an object in an actor-isolated realm.
            // Pass primitive data to the actor instead of
            // creating the object here and passing the object.
            let actor = try await RealmActor()
            try await actor.createTodo(name: "Prepare fireworks for birthday party", owner: "Gandalf", status: "In Progress")
            
            // Later, get information off the actor-confined realm
            let todoOwner = await actor.getTodoOwner(forTodoNamed: "Prepare fireworks for birthday party")
            XCTAssertEqual(todoOwner, "Gandalf") // :remove:
        }
        // :snippet-end:
    }
    
    func testGetDataAsStruct() async throws {
        try await mainThreadFunction()
        
        // :snippet-start: get-actor-confined-data-as-struct
        @MainActor
        func mainThreadFunction() async throws {
            // Create an object in an actor-isolated realm.
            let actor = try await RealmActor()
            try await actor.createTodo(name: "Leave the ring on the mantle", owner: "Bilbo", status: "In Progress")
            
            // Get information as a struct or other Sendable type.
            let todoAsStruct = await actor.getTodoAsStruct(forTodoNamed: "Leave the ring on the mantle")
            XCTAssertNotNil(todoAsStruct.id) // :remove:
        }
        // :snippet-end:
    }
#endif
}
// :replace-end:
