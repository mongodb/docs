// :replace-start: {
//   "terms": {
//     "AlternateNotificationExampleKeyPath_": "",
//     "additionalObjectNotificationToken": "objectNotificationToken",
//     "keyPath_": "",
//     "NotificationExample_": "",
//     "NotificationExampleKeyPath_": ""
//   }
// }
import RealmSwift
import XCTest

// Note: the following is not really tested but it makes for a convenient
// full program example.
// :snippet-start: register-an-object-change-listener
// Define the dog class.
class NotificationExample_Dog: Object {
    @Persisted var name = ""
}

var objectNotificationToken: NotificationToken?

func objectNotificationExample() {
    let dog = NotificationExample_Dog()
    dog.name = "Max"

    // Open the default realm.
    let realm = try! Realm()
    try! realm.write {
        realm.add(dog)
    }
    // Observe object notifications. Keep a strong reference to the notification token
    // or the observation will stop. Invalidate the token when done observing.
    objectNotificationToken = dog.observe { change in
        switch change {
        case .change(let object, let properties):
            for property in properties {
                print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
            }
        case .error(let error):
            print("An error occurred: \(error)")
        case .deleted:
            print("The object was deleted.")
        }
    }

    // Now update to trigger the notification
    try! realm.write {
        dog.name = "Wolfie"
    }
}
// :snippet-end:

// Note: the following is not really tested but it makes for a convenient
// full program example.
// :snippet-start: register-a-keypath-change-listener
// Define the dog class.
class NotificationExampleKeyPath_Dog: Object {
    @Persisted var name = ""
    @Persisted var favoriteToy = ""
    @Persisted var age: Int?
}

var additionalObjectNotificationToken: NotificationToken?

func keyPath_objectNotificationExample() {
    let dog = NotificationExampleKeyPath_Dog()
    dog.name = "Max"
    dog.favoriteToy = "Ball"
    dog.age = 2

    // Open the default realm.
    let realm = try! Realm()
    try! realm.write {
        realm.add(dog)
    }
    // Observe notifications on some of the object's key paths. Keep a strong
    // reference to the notification token or the observation will stop.
    // Invalidate the token when done observing.
    objectNotificationToken = dog.observe(keyPaths: ["favoriteToy", "age"], { change in // :emphasize:
        switch change {
        case .change(let object, let properties):
            for property in properties {
                print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
            }
        case .error(let error):
            print("An error occurred: \(error)")
        case .deleted:
            print("The object was deleted.")
        }
    })

    // Now update to trigger the notification
    try! realm.write {
        dog.favoriteToy = "Frisbee"
    }
    // When you specify one or more key paths, changes to other properties
    // do not trigger notifications. In this example, changing the "name"
    // property does not trigger a notification.
    try! realm.write {
        dog.name = "Maxamillion"
    }
}
// :snippet-end:

// :snippet-start: alternate-dog-class-for-keypaths
class AlternateNotificationExampleKeyPath_Dog: Object {
    @Persisted var name = ""
    @Persisted var siblings: List<AlternateNotificationExampleKeyPath_Dog> // :emphasize:
    @Persisted var age: Int?
}
// :snippet-end:

// :snippet-start: register-a-collection-change-listener
class CollectionNotificationExampleViewController: UITableViewController {
    var notificationToken: NotificationToken?

    override func viewDidLoad() {
        super.viewDidLoad()
        let realm = try! Realm()
        let results = realm.objects(NotificationExample_Dog.self)

        // Observe collection notifications. Keep a strong
        // reference to the notification token or the
        // observation will stop.
        notificationToken = results.observe { [weak self] (changes: RealmCollectionChange) in
            guard let tableView = self?.tableView else { return }
            switch changes {
            case .initial:
                // Results are now populated and can be accessed without blocking the UI
                tableView.reloadData()
            case .update(_, let deletions, let insertions, let modifications):
                // Query results have changed, so apply them to the UITableView
                tableView.performBatchUpdates({
                    // Always apply updates in the following order: deletions, insertions, then modifications.
                    // Handling insertions before deletions may result in unexpected behavior.
                    tableView.deleteRows(at: deletions.map({ IndexPath(row: $0, section: 0)}),
                                         with: .automatic)
                    tableView.insertRows(at: insertions.map({ IndexPath(row: $0, section: 0) }),
                                         with: .automatic)
                    tableView.reloadRows(at: modifications.map({ IndexPath(row: $0, section: 0) }),
                                         with: .automatic)
                }, completion: { finished in
                    // ...
                })
            case .error(let error):
                // An error occurred while opening the Realm file on the background worker thread
                fatalError("\(error)")
            }
        }
    }
}
// :snippet-end:

class Notifications: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testSilentWrite() {
        // :snippet-start: silent-write
        let realm = try! Realm()

        // Observe realm notifications
        let token = realm.observe { notification, realm in
            // ... handle update
        }

        // Later, pass the token in an array to the realm.write(withoutNotifying:)
        // method to write without sending a notification to that observer.
        try! realm.write(withoutNotifying: [token]) {
            // ... write to realm
        }

        // Finally
        token.invalidate()
        // :snippet-end:
    }

    func testRealmNotification() {
        class VC {
            func updateUI() {}
        }
        let viewController = VC()
        // :snippet-start: register-a-realm-change-listener
        let realm = try! Realm()

        // Observe realm notifications. Keep a strong reference to the notification token
        // or the observation will stop.
        let token = realm.observe { notification, realm in
            // `notification` is an enum specifying what kind of notification was emitted
            viewController.updateUI()
        }

        // ...

        // Later, explicitly stop observing.
        token.invalidate()
        // :snippet-end:
    }

    func testStopWatching() {
        // :snippet-start: stop-watching
        let realm = try! Realm()

        // Observe and obtain token
        let token = realm.observe { notification, realm in /* ... */ }

        // Stop observing
        token.invalidate()
        // :snippet-end:
    }
}

// Note: the following examples aren't tested here, but are included to verify they compile
// An SDK engineer provided them in GitHub: https://github.com/realm/realm-swift/issues/4818#issuecomment-1533843587
class DemoObject: Object {
    @Persisted var _id = ObjectId()
    @Persisted var title = ""
    @Persisted var date = Date()
}

// :snippet-start: notification-delivery-example-view-controller
class TableViewController: UITableViewController {
    let realm = try! Realm()
    let results = try! Realm().objects(DemoObject.self).sorted(byKeyPath: "date")
    var notificationToken: NotificationToken!

    override func viewDidLoad() {
        super.viewDidLoad()

        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")

        notificationToken = results.observe { (changes: RealmCollectionChange) in
            switch changes {
            case .initial:
                self.tableView.reloadData()
            case .update(_, let deletions, let insertions, let modifications):
                // Always apply updates in the following order: deletions, insertions, then modifications.
                // Handling insertions before deletions may result in unexpected behavior.
                self.tableView.beginUpdates()
                self.tableView.deleteRows(at: deletions.map { IndexPath(row: $0, section: 0) }, with: .automatic)
                self.tableView.insertRows(at: insertions.map { IndexPath(row: $0, section: 0) }, with: .automatic)
                self.tableView.reloadRows(at: modifications.map { IndexPath(row: $0, section: 0) }, with: .automatic)
                self.tableView.endUpdates()
            case .error(let err):
                fatalError("\(err)")
            }
        }
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return results.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let object = results[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = object.title
        return cell
    }

    func delete(at index: Int) throws {
        try realm.write {
            realm.delete(results[index])
        }
    }
}
// :snippet-end:

class AlternateViewControllerAsyncWrite {
    let results = try! Realm().objects(DemoObject.self).sorted(byKeyPath: "date")
    // :snippet-start: update-table-async-write
    func delete(at index: Int) throws {
        func delete(at index: Int) throws {
            @ThreadSafe var object = results[index]
            DispatchQueue.global().async {
                guard let object = object else { return }
                let realm = object.realm!
                try! realm.write {
                    if !object.isInvalidated {
                        realm.delete(object)
                    }
                }
            }
        }
    }
    // :snippet-end:
}

class AlternateViewControllerForceRefreshAfterWrite {
    let realm = try! Realm()
    let results = try! Realm().objects(DemoObject.self).sorted(byKeyPath: "date")
    // :snippet-start: update-table-force-refresh-after-write
    func delete(at index: Int) throws {
        try realm.write {
            realm.delete(results[index])
        }
        realm.refresh()
    }
    // :snippet-end:
}

class AlternateViewControllerUpdateTableSkipNotification: UITableViewController {
    let realm = try! Realm()
    let results = try! Realm().objects(DemoObject.self).sorted(byKeyPath: "date")
    var notificationToken: NotificationToken!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")

        notificationToken = results.observe { (changes: RealmCollectionChange) in
            switch changes {
            case .initial:
                self.tableView.reloadData()
            case .update(_, let deletions, let insertions, let modifications):
                self.tableView.beginUpdates()
                self.tableView.insertRows(at: insertions.map { IndexPath(row: $0, section: 0) }, with: .automatic)
                self.tableView.deleteRows(at: deletions.map { IndexPath(row: $0, section: 0) }, with: .automatic)
                self.tableView.reloadRows(at: modifications.map { IndexPath(row: $0, section: 0) }, with: .automatic)
                self.tableView.endUpdates()
            case .error(let err):
                fatalError("\(err)")
            }
        }
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return results.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let object = results[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = object.title
        return cell
    }
    
    // :snippet-start: update-table-skip-notification
    func delete(at index: Int) throws {
        try realm.write(withoutNotifying: [notificationToken]) {
            realm.delete(results[index])
        }
        tableView.deleteRows(at: [IndexPath(row: index, section: 0)], with: .automatic)
    }
    // :snippet-end:
}
// :replace-end:
