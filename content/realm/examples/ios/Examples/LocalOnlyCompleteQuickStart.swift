// :replace-start: {
//   "terms": {
//     "LocalOnlyQsTask_": "Todo",
//     "localRealm": "realm"
//   }
// }
import XCTest
import UIKit

// :snippet-start: import-realmswift
import RealmSwift
// :snippet-end:

// QsTask is the Task model for the former Sync quick start
// Used by many other tests
class QsTask: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String = ""
    @Persisted var owner: String?
    @Persisted var status: String = ""

    convenience init(name: String) {
        self.init()
        self.name = name
    }
}

// LocalOnlyQsTask is the Task model for this QuickStart
class LocalOnlyQsTask: Object {
    @Persisted var name: String = ""
    @Persisted var owner: String?
    @Persisted var status: String = ""

    convenience init(name: String) {
        self.init()
        self.name = name
    }
}

// Entrypoint. Call this to run the example.
func runLocalOnlyExample() {
    // :snippet-start: quick-start-local-open-realm-without-config-param
    // Open the local-only default realm
    let localRealm = try! Realm()
    // :snippet-end:
    // Get all tasks in the realm
    let todos = localRealm.objects(LocalOnlyQsTask.self)

    // :snippet-start: quick-start-local-set-notification-token
    // Retain notificationToken as long as you want to observe
    let notificationToken = todos.observe { (changes) in
        switch changes {
        case .initial: break
            // Results are now populated and can be accessed without blocking the UI
        case .update(_, let deletions, let insertions, let modifications):
            // Query results have changed.
            print("Deleted indices: ", deletions)
            print("Inserted indices: ", insertions)
            print("Modified modifications: ", modifications)
        case .error(let error):
            // An error occurred while opening the Realm file on the background worker thread
            fatalError("\(error)")
        }
    }
    // :snippet-end:

    // Delete all from the realm
    try! localRealm.write {
        localRealm.deleteAll()
    }

    // Add some tasks
    let task = LocalOnlyQsTask(name: "Do laundry")
    try! localRealm.write {
        localRealm.add(task)
    }
    
    let anotherTask = LocalOnlyQsTask(name: "App design")
    try! localRealm.write {
        localRealm.add(anotherTask)
    }

    // You can also filter a collection
    let tasksThatBeginWithA = todos.where {
        $0.name.starts(with: "A")
    }
    print("A list of all tasks that begin with A: \(tasksThatBeginWithA)")

    // All modifications to a realm must happen in a write block.
    let taskToUpdate = todos[0]
    try! localRealm.write {
        taskToUpdate.status = "InProgress"
    }

    let tasksInProgress = todos.where {
        $0.status == "InProgress"
    }
    print("A list of all tasks in progress: \(tasksInProgress)")

    // All modifications to a realm must happen in a write block.
    let taskToDelete = todos[0]
    try! localRealm.write {
        // Delete the LocalOnlyQsTask.
        localRealm.delete(taskToDelete)
    }

    print("A list of all tasks after deleting one: \(todos)")

    // :snippet-start: quick-start-local-invalidate-notification-token
    // Invalidate notification tokens when done observing
    notificationToken.invalidate()
    // :snippet-end:
}

class LocalOnlyQuickStartTest: XCTestCase {
    func testRunLocalOnlyExample() {
        runLocalOnlyExample()
    }
}
// :replace-end:
