import XCTest
import RealmSwift

class CustomUserData: XCTestCase {

    // This test is currently failing with Thread Foo: signal SIGABRT
    // and a message to report as a Core error. Temporarily disabling until we can investigate.
    func testCreateCustomUserData() {
        let expectation = XCTestExpectation(description: "it completes")

        // :snippet-start: create-custom-user-data
        let appId = YOUR_APP_SERVICES_APP_ID // replace this with your App ID
        let app = App(id: appId)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                print("Failed to log in: \(error.localizedDescription)")
            case .success(let user):
                let client = user.mongoClient("mongodb-atlas")
                let database = client.database(named: "my_database")
                let collection = database.collection(withName: "users")

                // Insert the custom user data object
                collection.insertOne([
                    "userId": AnyBSON(user.id),
                    "favoriteColor": "pink"
                    ]) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to insert document: \(error.localizedDescription)")
                    case .success(let newObjectId):
                        print("Inserted custom user data document with object ID: \(newObjectId)")
                        // :remove-start:
                        XCTAssertNotNil(newObjectId)
                        expectation.fulfill()
                        // :remove-end:
                    }
                }
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testReadCustomUserData() {
        let expectation = XCTestExpectation(description: "it completes")

        // :snippet-start: read-custom-user-data
        let appId = YOUR_APP_SERVICES_APP_ID // replace this with your App ID
        let app = App(id: appId)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                print("Failed to log in: \(error.localizedDescription)")
            case .success(let user):
                // If the user data has been refreshed recently, you can access the
                // custom user data directly on the user object
                print("User custom data: \(user.customData)")

                // Refresh the custom user data
                user.refreshCustomData { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to refresh custom data: \(error.localizedDescription)")
                    case .success(let customData):
                        // favoriteColor was set on the custom data.
                        print("Favorite color: \(customData["favoriteColor"] ?? "not set")")
                        // :remove-start:
                        expectation.fulfill()
                        // :remove-end:
                        return
                    }
                }
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    // This test is currently failing with Thread Foo: signal SIGABRT
    // and a message to report as a Core error. Temporarily disabling until we can investigate.
    func testUpdateCustomUserData() {
        let expectation = XCTestExpectation(description: "it completes")

        // :snippet-start: update-custom-user-data
        let appId = YOUR_APP_SERVICES_APP_ID // replace this with your App ID
        let app = App(id: appId)
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                print("Failed to log in: \(error.localizedDescription)")
            case .success(let user):
                // Access the custom user document remotely to update it.
                let client = user.mongoClient("mongodb-atlas")
                let database = client.database(named: "my_database")
                let collection = database.collection(withName: "users")
                // :remove-start:
                collection.insertOne([
                    "userId": AnyBSON(user.id),
                    "favoriteColor": "pink"
                    ]) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to insert document: \(error.localizedDescription)")
                    case .success(let newObjectId):
                        print("Inserted custom user data document with object ID: \(newObjectId)")
                        XCTAssertNotNil(newObjectId)
                    }
                }
                sleep(5)
                // :remove-end:
                collection.updateOneDocument(
                    filter: ["userId": AnyBSON(user.id)],
                    update: ["favoriteColor": "cerulean"]
                ) { (result) in
                    switch result {
                    case .failure(let error):
                        print("Failed to update: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        // User document updated.
                        print("Matched: \(updateResult.matchedCount), updated: \(updateResult.modifiedCount)")
                        // :remove-start:
                        XCTAssertEqual(updateResult.matchedCount, 1)
                        expectation.fulfill()
                        // :remove-end:
                    }
                }
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

}
