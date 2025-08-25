// :replace-start: {
//   "terms": {
//     "ClientReset_": ""
//   }
// }
// swiftlint:disable identifier_name
import XCTest
import RealmSwift

let APP_ID = "swift-flexible-vkljj"

class ClientReset_Dog: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""
}

class ClientReset: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testSpecifyClientResetModeWithBeforeAfterBlock() async {
        let myRecoveryPath = URL(string: "some-file-url")
        // :snippet-start: client-reset-with-blocks
        // A block called after a client reset error is detected, but before the
        // client recovery process is executed.
        // This block could be used for any custom logic, reporting, debugging etc.
        // This is one example, but your usage may vary.
        let beforeClientResetBlock: (Realm) -> Void = { before in
            var recoveryConfig = Realm.Configuration()
            recoveryConfig.fileURL = myRecoveryPath
            do {
               try before.writeCopy(configuration: recoveryConfig)
                // The copied realm could be used later for recovery, debugging, reporting, etc.
             } catch {
                    // handle error
             }
        }

        // A block called after the client recovery process has executed.
        // This block could be used for custom recovery, reporting, debugging etc.
        // This is one example, but your usage may vary.
        let afterClientResetBlock: (Realm, Realm) -> Void = { before, after in
            //     let res = after.objects(myClass.self)
            //     if (res.filter("primaryKey == %@", object.primaryKey).first != nil) {
            //         // ...custom recovery logic...
            //     } else {
            //         // ...custom recovery logic...
            //     }
            // }
        }

        do {
            let app = App(id: YOUR_APP_SERVICES_APP_ID)
            let user = try await app.login(credentials: Credentials.anonymous)
            var configuration = user.flexibleSyncConfiguration(clientResetMode:
                                                                .recoverOrDiscardUnsyncedChanges(
                                                                    beforeReset: beforeClientResetBlock,
                                                                    afterReset: afterClientResetBlock))
        } catch {
            print("Error logging in user: \(error.localizedDescription)")
        }
        // :snippet-end:
    }
    
    func testSpecifyRecoverUnsyncedChanges() async {
        do {
            let app = App(id: YOUR_APP_SERVICES_APP_ID)
            let user = try await app.login(credentials: Credentials.anonymous)
            // :snippet-start: specify-client-reset-mode
            // Specify the clientResetMode when you create the SyncConfiguration.
            // If you do not specify, this defaults to `.recoverUnsyncedChanges` mode.
            var configuration = user.flexibleSyncConfiguration(clientResetMode: .recoverUnsyncedChanges())
            // :snippet-end:
        } catch {
            print("Error logging in user: \(error.localizedDescription)")
        }
    }
    
    func testSpecifyDiscardUnsyncedChanges() async {
        // :snippet-start: specify-discard
        do {
            let app = App(id: APP_ID)
            let user = try await app.login(credentials: Credentials.anonymous)
            var config = user.flexibleSyncConfiguration(clientResetMode: .discardUnsyncedChanges())
        } catch {
            print("Error logging in user: \(error.localizedDescription)")
        }
        // :snippet-end:
    }
    
    func testSpecifyManual() async {
        // :snippet-start: specify-manual
        do {
            let app = App(id: APP_ID)
            let user = try await app.login(credentials: Credentials.anonymous)
            var config = user.flexibleSyncConfiguration(clientResetMode: .manual())
        } catch {
            print("Error logging in user: \(error.localizedDescription)")
        }
        // :snippet-end:
    }
    
    func testManualFallbackErrorHandler() async {
        // :snippet-start: manual-fallback-error-handler
        func handleClientReset() {
            // Report the client reset error to the user, or do some custom logic.
        }
        
        do {
            let app = App(id: APP_ID)
            let user = try await app.login(credentials: Credentials.anonymous)
            var config = user.flexibleSyncConfiguration(clientResetMode: .recoverOrDiscardUnsyncedChanges())
            // If client recovery fails,
            app.syncManager.errorHandler = { error, session in
                guard let syncError = error as? SyncError else {
                    fatalError("Unexpected error type passed to sync error handler! \(error)")
                }
                switch syncError.code {
                case .clientResetError:
                    if let (path, clientResetToken) = syncError.clientResetInfo() {
                        handleClientReset()
                        SyncSession.immediatelyHandleError(clientResetToken, syncManager: app.syncManager)
                    }
                default:
                    // Handle other errors...
                    ()
                }
            }
        } catch {
            print("Error: \(error.localizedDescription)")
        }
        // :snippet-end:
    }
}
// :replace-end:
