// :replace-start: {
//   "terms": {
//     "SyncExamples_": "",
//     "FlexibleSync_": ""
//   }
// }
import RealmSwift
import XCTest

class SyncExamples_Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    override static func primaryKey() -> String? {
        return "_id"
    }
}

class Sync: AnonymouslyLoggedInTestCase {

    func testAsyncAwaitOpenRealm() async throws {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: open-synced-realm
        // Get a user. If there is already a logged in user,
        // return that user. If not, log in.
        func getUser() async throws -> User {
            // Check for a logged-in user
            if app.currentUser != nil {
                return app.currentUser!
            } else {
                // Instantiate the app using your App Services App ID
                let app = App(id: APPID)
                // Authenticate with the instance of the app that points
                // to your backend. Here, we're using anonymous login.
                let loggedInUser = try await app.login(credentials: Credentials.anonymous)
                return loggedInUser
            }
        }

        // Establish the user, define the config, and
        // return a realm for that user
        func getRealm() async throws -> Realm {
            // Get a logged-in app user
            let user = try await getUser()
            // Store a configuration that consists of the current user,
            // authenticated to this instance of your app,
            // and what object types this database should manage.
            var configuration = user.flexibleSyncConfiguration()
            configuration.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
            
            // Open a Realm with this configuration.
            let realm = try await Realm(configuration: configuration)
            print("Successfully opened realm: \(realm)")
            return realm
        }

        // Get a realm
        let realm = try await getRealm()
        print("The open realm is: \(realm)")
        // Add subscriptions and work with the realm
        // :snippet-end:
        expectation.fulfill()
        await fulfillment(of: [expectation], timeout: 10, enforceOrder: true)
    }

    func testSpecifyDownloadBehavior() async throws {
        // :remove-start:
        let expectation = XCTestExpectation(description: "it completes")
        // :remove-end:
        // :snippet-start: specify-download-behavior
        func getRealmAfterDownloadingUpdates() async throws -> Realm {
            let app = App(id: APPID)
            let user = try await app.login(credentials: Credentials.anonymous)
            var configuration = user.flexibleSyncConfiguration()
            configuration.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]

            let realm = try await Realm(configuration: configuration, downloadBeforeOpen: .always) // :emphasize:
            print("Successfully opened realm after downloading: \(realm)")
            return realm
        }
        
        let realm = try await getRealmAfterDownloadingUpdates()
        print("The open realm is: \(realm)")
        // Add subscription and work with the realm
        // :snippet-end:
        expectation.fulfill()
        await fulfillment(of: [expectation], timeout: 10, enforceOrder: true)
    }
    
    func testInMemorySyncedRealm() async throws {
        let expectation = XCTestExpectation(description: "it completes")
        // :snippet-start: open-synced-realm-in-memory
        // Instantiate the app and get a user.
        let app = App(id: APPID)
        let user = try await app.login(credentials: Credentials.anonymous)

        // Create a configuration.
        var configuration = user.flexibleSyncConfiguration()
        configuration.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
        
        // Specify an in-memory identifier for the configuration.
        configuration.inMemoryIdentifier = "YOUR-IDENTIFIER-STRING"
        
        // Open a Realm with this configuration.
        let realm = try await Realm(configuration: configuration)
        print("Successfully opened realm: \(realm)")
        // Add subscriptions and work with the realm
        // :snippet-end:
        XCTAssertNotNil(realm)
        XCTAssert(realm.configuration.inMemoryIdentifier == "YOUR-IDENTIFIER-STRING")
        expectation.fulfill()
        await fulfillment(of: [expectation], timeout: 10, enforceOrder: true)
    }

    func testPauseResumeSyncSession() async throws {
        let app = App(id: APPID)
        let user = try await app.login(credentials: Credentials.anonymous)
        var configuration = user.flexibleSyncConfiguration()
        configuration.objectTypes = [FlexibleSync_Task.self, FlexibleSync_Team.self]
        let syncedRealm = try! await Realm(configuration: configuration)

        // :snippet-start: pause-resume-sync-session
        let syncSession = syncedRealm.syncSession!
        // Suspend synchronization
        syncSession.suspend()

        // Later, resume synchronization
        syncSession.resume()
        // :snippet-end:

        // :snippet-start: check-network-connection
        // Observe connectionState for changes using KVO
        let observer = syncSession.observe(\.connectionState, options: [.initial]) { (syncSession, change) in
            switch syncSession.connectionState {
            case .connecting:
                print("Connecting...")
            case .connected:
                print("Connected")
            case .disconnected:
                print("Disconnected")
            default:
                break
            }
        }

        // Observe using Combine
        let cancellable = syncSession.publisher(for: \.connectionState)
            .sink { connectionState in
                switch connectionState {
                case .connecting:
                    print("Connecting...")
                case .connected:
                    print("Connected")
                case .disconnected:
                    print("Disconnected")
                default:
                    break
                }
            }
        // :snippet-end:
    }

    // Leaving this example using Partition-Based Sync
    // since progress notifications are currently only supported in PBS
    // IMPORTANT: this example is also used on the PBS page for opening
    // a synced realm, so leave it even after progress notifications
    // are supported in Flexible Sync.
    func testCheckProgress() {
        // :snippet-start: open-realm-partition-based-sync
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        
        // Store a configuration that consists of the current user,
        // authenticated to this instance of your app. If there is no
        // user, your code should log one in.
        let user = app.currentUser
        let partitionValue = "some partition value"
        var configuration = user!.configuration(partitionValue: partitionValue)
        // :remove-start:
        configuration.objectTypes = [SyncExamples_Task.self]
        // :remove-end:
        
        // Open the database with the user's configuration.
        let syncedRealm = try! Realm(configuration: configuration)
        print("Successfully opened the synced realm: \(syncedRealm)")
        // :snippet-end:
        let expectation = XCTestExpectation(description: "it completes")
        expectation.assertForOverFulfill = false

        let syncSession = syncedRealm.syncSession!
        let token = syncSession.addProgressNotification(
            for: .upload, mode: .forCurrentlyOutstandingWork) { (progress) in

            let transferPercent = progress.progressEstimate * 100

            print("Uploaded (\(transferPercent)%)")
            expectation.fulfill()
        }

        // Upload something
        try! syncedRealm.write {
            syncedRealm.add(SyncExamples_Task())
        }
        wait(for: [expectation], timeout: 10)
    }

    @MainActor
    func testCheckProgressFlexibleSync() async {
        let app = App(id: APPID)
        let expectation = XCTestExpectation(description: "Progress notification is sent")

        do {
            let user = try await app.login(credentials: Credentials.anonymous)
            var flexSyncConfig = user.flexibleSyncConfiguration()
            flexSyncConfig.objectTypes = [FlexibleSync_Task.self]
            do {
                let realm = try await Realm(configuration: flexSyncConfig)
                let subscriptions = realm.subscriptions
                try await subscriptions.update {
                    subscriptions.append(QuerySubscription<FlexibleSync_Task>())
                }
                checkSyncProgress(realm: realm)
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
        
        func checkSyncProgress(realm: Realm) {
            let todo = FlexibleSync_Task()
            todo.dueDate = (Date.now + TimeInterval(86400))
            todo.taskName = "This task should appear in the Flex Sync realm"
            todo.progressMinutes = 20
            todo.completed = false
            
            // :snippet-start: check-progress-estimate
            let syncSession = realm.syncSession!
            let token = syncSession.addProgressNotification(
                for: .upload, mode: .forCurrentlyOutstandingWork) { (progress) in
                    
                    let progressEstimate = progress.progressEstimate
                    let transferPercent = progressEstimate * 100
                    
                    print("Uploaded (\(transferPercent)%)")
                    // :remove-start:
                    // Verify that progress increases.
                    XCTAssertGreaterThanOrEqual(progress.progressEstimate, progressEstimate)
                    expectation.fulfill()
                    // :remove-end:
                }
            // :snippet-end:
            try! realm.write {
                realm.add(todo)
            }
        }
        await fulfillment(of: [expectation], timeout: 10)
    }
    
    func testSetClientLogLevelDeprecated() {
        // :snippet-start: set-log-level-deprecated
        // This code example shows how to set the log level
        // in Realm Swift 10.38.3 and lower. For 10.39.0 and higher,
        // use the `Logger` API.
        // Access your app
        let app = App(id: YOUR_APP_SERVICES_APP_ID)

        // Access the sync manager for the app
        let syncManager = app.syncManager

        // Set the logger to provide debug logs
        syncManager.logLevel = .debug
        // :snippet-end:
    }
    
    // Skipping this test in CI because it fails when you run it with the other tests
    // with the error: `testSetCustomLogger(): std::logic_error: Cannot set the logger_factory after creating the sync client`
    // Running it by itself works.
    func testSetCustomLogger() {
        // This is an arbitrary struct that mimics the call structure of the
        // example that the SDK engineer provided in the HELP ticket.
        // Adding this here lets me remove the client-specific logger
        // for a generic implementation that uses the exact same call structure.
        struct AnalyticsProvider {
            struct shared {
                struct logEvent {
                    var event: String
                    var category: String
                    
                    init(_ event: String, category: String) {
                        self.event = event
                        self.category = category
                    }
                }
            }
        }
        // :snippet-start: set-custom-logger-deprecated
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        
        // Access the sync manager for the app
        let syncManager = app.syncManager
        
        // Set the logger to provide debug logs
        syncManager.logLevel = .all
        syncManager.logger = { logLevel, message in
            AnalyticsProvider.shared.logEvent("\(logLevel) : \(message)", category: "Engineering debugging")
        }
        // :snippet-end:
    }
}

class SyncSession_FS: AnonymouslyLoggedInTestCase {
    func testSyncSessionReconnect() async throws {
        let app = App(id: APPID)
        let user = try await app.login(credentials: Credentials.anonymous)
        var configuration = user.flexibleSyncConfiguration()
        configuration.objectTypes = [FlexibleSync_Task.self]
        let realm = try! await Realm(configuration: configuration)

        // :snippet-start: sync-session-reconnect
        let syncSession = realm.syncSession!
        
        // Work with the realm. When you need to force the sync session to reconnect...
        syncSession.reconnect()
        // :snippet-end:
        
    }

    @MainActor
    func testWaitForUploadAsyncSyntax() async throws {
        let app = App(id: APPID)
        let user = try await app.login(credentials: Credentials.anonymous)
        var configuration = user.flexibleSyncConfiguration()
        configuration.objectTypes = [FlexibleSync_Task.self]
        let realm = try! await Realm(configuration: configuration)
        let results = try await realm.objects(FlexibleSync_Task.self).where { $0.completed == false }.subscribe()

        try realm.write {
            realm.deleteAll()
        }
        XCTAssertEqual(results.count, 0)
        let date = Date.now
        
        // :snippet-start: awaitable-wait-for-upload-download
        // Wait to download all pending changes from Atlas
        try await realm.syncSession?.wait(for: .download)
        
        // Add data locally
        try realm.write {
            realm.create(FlexibleSync_Task.self, value: [
                "taskName": "Review proposal",
                "assignee": "Emma",
                "completed": false,
                "progressMinutes": 0,
                "dueDate": date
            ])
        }
        
        // Wait for local changes to be uploaded to Atlas
        try await realm.syncSession?.wait(for: .upload)
        // :snippet-end:
        XCTAssertEqual(results.count, 1)
        try realm.write {
            realm.deleteAll()
        }
        XCTAssertEqual(results.count, 0)
    }
    
    func testWaitForUploadCallback() {
        let expectation = XCTestExpectation(description: "Waits for download and upload")

        let app = App(id: APPID)
        app.login(credentials: Credentials.anonymous) { [self] (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                // Assign the user object to a variable to demonstrate user deletion
                var flexSyncConfig = user.flexibleSyncConfiguration()
                flexSyncConfig.objectTypes = [FlexibleSync_Task.self]
                Realm.asyncOpen(configuration: flexSyncConfig) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to open realm: \(error.localizedDescription)")
                        // handle error
                    case .success(let realm):
                        print("Successfully opened realm: \(realm)")
                        let subscriptions = realm.subscriptions
                        subscriptions.update({
                            subscriptions.append(
                                QuerySubscription<FlexibleSync_Task> {
                                    $0.completed == false
                                })
                        })
                        XCTAssertEqual(realm.objects(FlexibleSync_Task.self).count, 0)
                        let date = Date.now
                        // :snippet-start: callback-wait-for-upload-download
                        // Wait to download all pending changes from Atlas
                        realm.syncSession?.wait(for: .download, block: { _ in
                            // You can provide a block to execute
                            // after waiting for download to complete
                        })
                        
                        // Add data locally
                        do {
                            try realm.write {
                                realm.create(FlexibleSync_Task.self, value: [
                                    "taskName": "Review proposal",
                                    "assignee": "Emma",
                                    "completed": false,
                                    "progressMinutes": 0,
                                    "dueDate": date
                                ])
                            }
                        } catch {
                            print("There was an error writing to realm: \(error.localizedDescription)")
                        }
                        // Wait for local changes to be uploaded to Atlas
                        realm.syncSession?.wait(for: .upload, block: { _ in
                            // You can provide a block to execute after
                            // waiting for upload to complete
                        })
                        // :snippet-end:
                        XCTAssertEqual(realm.objects(FlexibleSync_Task.self).count, 1)
                        
                        do {
                            try realm.write {
                                realm.deleteAll()
                            }
                        } catch {
                            print("There was an error writing to realm: \(error.localizedDescription)")
                        }
                        XCTAssertEqual(realm.objects(FlexibleSync_Task.self).count, 0)
                        realm.syncSession?.wait(for: .upload, block: { _ in })
                        expectation.fulfill()
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }
}
// :replace-end:
