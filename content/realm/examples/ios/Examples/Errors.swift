// swiftlint:disable cyclomatic_complexity

import XCTest
import RealmSwift

class Errors: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testErrorHandlerMethodObjc() {
        // :snippet-start: create-error-handler
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        app.syncManager.errorHandler = { error, session in
            // handle error
        }
        // :snippet-end:
    }
    
    func testCompensatingWriteExample() {
        let myApp = App(id: YOUR_APP_SERVICES_APP_ID)
        // :snippet-start: access-compensating-write
        myApp.syncManager.errorHandler = { syncError, session in
            if let thisError = syncError as? SyncError {
                switch thisError.code {
                // ... additional SyncError.code cases ...
                // :remove-start:
                case .clientSessionError:
                    print("Client session error occurred: \(thisError.localizedDescription)")
                case .clientUserError:
                    print("Client user error occurred: \(thisError.localizedDescription)")
                case .clientInternalError:
                    print("Client internal error occurred: \(thisError.localizedDescription)")
                case .clientResetError:
                    print("Client reset error occurred: \(thisError.localizedDescription)")
                case .underlyingAuthError:
                    print("Underlying auth error occurred: \(thisError.localizedDescription)")
                case .permissionDeniedError:
                    print("Permission denied error occurred: \(thisError.localizedDescription)")
                case .invalidFlexibleSyncSubscriptions:
                    print("Invalid Flexible Sync subscription error occurred: \(thisError.localizedDescription)")
                // :remove-end:
                case .writeRejected:
                    if let compensatingWriteErrorInfo = thisError.compensatingWriteInfo {
                        for anError in compensatingWriteErrorInfo {
                            print("A write was rejected with a compensating write error")
                            print("The write to object type: \(anError.objectType)")
                            print("With primary key of: \(anError.primaryKey)")
                            print("Was rejected because: \(anError.reason)")
                        }
                    }
                // :remove-start:
                @unknown default:
                    print("Unknown default error occurred: \(thisError.localizedDescription)")
                // :remove-end:
                }
            }
        }
        // :snippet-end:
    }
}
