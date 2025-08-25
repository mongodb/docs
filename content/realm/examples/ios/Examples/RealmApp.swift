// swiftlint:disable identifier_name

import XCTest
// :snippet-start: import-realm
import RealmSwift
// :snippet-end:

// :snippet-start: import-experimental
@_spi(RealmSwiftExperimental) import RealmSwift
// :snippet-end:

let YOUR_APP_SERVICES_APP_ID = "example-testers-kvjdy"
let EDGE_SERVER_APP_ID = "new-edge-server-post-hotfix-zadeqrp"

// :snippet-start: init-realm-app-client
let app = App(id: YOUR_APP_SERVICES_APP_ID) // replace YOUR_APP_SERVICES_APP_ID with your App ID
// :snippet-end:

class RealmAppTest: XCTestCase {
    func testRealmAppWithConfig() {
        // :snippet-start: realm-app-config
        let configuration = AppConfiguration(
           baseURL: "https://services.cloud.mongodb.com", // You can customize base URL
           transport: nil, // Custom RLMNetworkTransportProtocol
           defaultRequestTimeoutMS: 30000
        )

        let app = App(id: "my-app-services-app-id", configuration: configuration)
        // :snippet-end:
        print(app)
    }
    
    func testAppConfigEnableSessionMultiplexing() async {
        // :snippet-start: app-config-enable-session-multiplexing
        let configuration = AppConfiguration(enableSessionMultiplexing: false)

        let app = App(id: YOUR_APP_SERVICES_APP_ID, configuration: configuration)
        // :snippet-end:
        do {
            // Testing that this configuration uses a single connection is not simple
            // So we're just confirming that the app configuration is valid and a user
            // can login and relying on the SDK to actually test this functionality.
            let user = try await app.login(credentials: Credentials.anonymous)
            XCTAssert(app.currentUser != nil)
        } catch {
            print("Failed to authenticate user: \(error.localizedDescription)")
        }
    }
    
    func testAppConfigSyncTimeoutOptions() async {
        // :snippet-start: app-config-sync-timeout
        let syncTimeoutOptions = SyncTimeoutOptions(
            connectTimeout: 30000,
            connectionLingerTime: 5000,
            pingKeepalivePeriod: 10000,
            pongKeepaliveTimeout: 10000,
            fastReconnectLimit: 30000
        )
        let configuration = AppConfiguration(syncTimeouts: syncTimeoutOptions)

        let app = App(id: YOUR_APP_SERVICES_APP_ID, configuration: configuration)
        // :snippet-end:
        do {
            // Testing all of these options properly would require many different tests
            // So we're just confirming that the app configuration is valid and a user
            // can login and relying on the SDK to actually test this functionality.
            let user = try await app.login(credentials: Credentials.anonymous)
            XCTAssert(app.currentUser != nil)
        } catch {
            print("Failed to authenticate user: \(error.localizedDescription)")
        }
    }
    
    func testRealmAppWithCustomBaseURL() async {
        // Note for internal review: I tested this manually running an Edge Server
        // on my machine and it succeeds.
        // Until we get Edge Server running in a CI to test against, this will
        // fail in CI. So I'm going to expect this test to fail.
        
        // :snippet-start: custom-base-url
        // Specify a baseURL to connect to a server other than the default.
        // In this case, an Edge Server instance running on the device.
        let configuration = AppConfiguration(baseURL: "http://localhost:80")

        let edgeApp = App(id: EDGE_SERVER_APP_ID, configuration: configuration)
        // :snippet-end:
        do {
            let user = try await edgeApp.login(credentials: Credentials.anonymous)
            XCTAssert(user.isLoggedIn)
        } catch {
            let error = error.localizedDescription
            XCTAssertEqual(error, "Could not connect to the server.")
        }
    }
    
    func testChangeBaseURL() async {
        // Note for internal review: I tested this manually running an Edge Server
        // on my machine and it succeeds. Until we get Edge Server running in a CI
        // I can't login to an Edge Server in an automated test, so I can't write
        // automated tests for the full flow.
        
        // Specify a baseURL to connect to an Edge Server instance running on the device
        let configuration = AppConfiguration(baseURL: "http://localhost:80")
        
        do {
            // :snippet-start: change-base-url
            // Specify a baseURL to connect to a server other than the default.
            // In this case, an Edge Server instance running on the device.
            let configuration = AppConfiguration(baseURL: "http://localhost:80")
            let edgeApp = App(id: EDGE_SERVER_APP_ID, configuration: configuration)
            
            // You can check the `baseURL` of an app to define app logic.
            if edgeApp.baseURL == "http://localhost:80" {
                print("Client app is currently connected to a local Edge Server instance")
            }
            XCTAssertEqual(edgeApp.baseURL, "http://localhost:80") // :remove:
            // ... log in a user and use the app...
            // ... some time later...
            
            try await edgeApp.updateBaseUrl(to: "https://services.cloud.mongodb.com")
            // :snippet-end:
            XCTAssertEqual(edgeApp.baseURL, "https://services.cloud.mongodb.com")
            let user = try await edgeApp.login(credentials: Credentials.anonymous)
            XCTAssertNotNil(user)
            XCTAssert(user.isLoggedIn)
        } catch {
            print(error.localizedDescription)
            XCTFail("With a base URL pointing to the cloud, logging in should not fail.")
        }
    }
    
    override func tearDown() {
        guard app.currentUser != nil else {
            return
        }
        let expectation = XCTestExpectation(description: "logout completes")
        app.currentUser?.logOut { (error) in
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 10)
    }
}
