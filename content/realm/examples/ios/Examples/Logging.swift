import XCTest
import RealmSwift

class Logging: XCTestCase {
    func testSetLogLevel() {
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        
        var logs: String = ""
        let logger = Logger(level: .detail) { level, message in
            logs += "REALM DEBUG: \(Date.now) \(level) \(message) \n"
        }
        Logger.shared = logger
        // :snippet-start: set-log-level
        Logger.shared.level = .trace
        // :snippet-end:
        XCTAssert(logs.isEmpty)
        
        let expectation = XCTestExpectation(description: "Populate some log entries")
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Login as \(user) successful")
                XCTAssert(!logs.isEmpty)
                expectation.fulfill()
            }
        }
        wait(for: [expectation], timeout: 5)
    }
    
    func testChangeLogLevel() {
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let expectationForTrace = XCTestExpectation(description: "Populate some .trace log entries")
        
        var logs: String = ""
        let logger = Logger(level: .warn) { level, message in
            logs += "REALM DEBUG: \(Date.now) \(level) \(message) \n"
        }
        XCTAssert(logs.isEmpty)
        Logger.shared = logger
        // :snippet-start: change-log-level
        // Set a log level that isn't too verbose
        Logger.shared.level = .warn
        
        // Later, when trying to debug something, change the log level for more verbosity
        Logger.shared.level = .trace
        // :snippet-end:

        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Login as \(user) successful")
                XCTAssertTrue(logs.contains("rawValue: 7")) // Trace
                expectationForTrace.fulfill()
            }
        }
        wait(for: [expectationForTrace], timeout: 5)
    }

    func testDefineCustomLogger() {
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        
        var logs: String = ""
        // :snippet-start: define-custom-logger
        // Create an instance of `Logger` and define the log function to invoke.
        let logger = Logger(level: .detail) { level, message in
            logs += "\(Date.now) \(level) \(message) \n" // :remove:
            // You may pass log information to a logging service, or
            // you could simply print the logs for debugging. Define
            // the log function that makes sense for your application.
            print("REALM DEBUG: \(Date.now) \(level) \(message) \n")
        }
        // :snippet-end:
        Logger.shared = logger
        XCTAssert(logs.isEmpty)
        
        let expectation = XCTestExpectation(description: "Populate some log entries")
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Login as \(user) successful")
                XCTAssert(!logs.isEmpty)
                expectation.fulfill()
            }
        }
        wait(for: [expectation], timeout: 5)
    }

    func testSetDefaultLogger() {
        // Access your app
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        
        var logs: String = ""
        // :snippet-start: set-default-logger
        let logger = Logger(level: .info) { level, message in
            logs += "\(Date.now) \(level) \(message) \n" // :remove:
            // You may pass log information to a logging service, or
            // you could simply print the logs for debugging. Define
            // the log function that makes sense for your application.
            print("REALM DEBUG: \(Date.now) \(level) \(message) \n")
        }
        
        // Set a logger as the default
        Logger.shared = logger
        XCTAssert(logs.isEmpty) // :remove:
        
        // After setting a default logger, you can change
        // the log level at any point during the app lifecycle
        Logger.shared.level = .debug
        // :snippet-end:
        
        let expectation = XCTestExpectation(description: "Populate some log entries")
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Login as \(user) successful")
                XCTAssert(!logs.isEmpty)
                XCTAssertTrue(logs.contains("rawValue: 6")) // Debug
                expectation.fulfill()
            }
        }
        wait(for: [expectation], timeout: 5)
    }
    
    func testTurnLoggingOff() {
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        
        var logs: String = ""
        let logger = Logger(level: .info) { level, message in
            logs += "REALM DEBUG: \(Date.now) \(level) \(message) \n"
        }
        
        Logger.shared = logger
        XCTAssert(logs.isEmpty)
        
        // :snippet-start: turn-logging-off
        Logger.shared.level = .off
        // :snippet-end:
        
        let expectation = XCTestExpectation(description: "Should not populate log entries since logging is off")
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Login as \(user) successful")
                XCTAssert(logs.isEmpty)
                expectation.fulfill()
            }
        }
        wait(for: [expectation], timeout: 5)
    }
}
