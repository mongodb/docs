import XCTest
import RealmSwift

// Derive from this class whenever you need to use
// app.currentUser with an existing anonymous login.
class AnonymouslyLoggedInTestCase: XCTestCase {
    override func setUp() {
        let expectation = XCTestExpectation(description: "logs in")
        app.login(credentials: Credentials.anonymous) { (result) in
            switch result {
            case .failure(let error):
                fatalError("Login failed: \(error.localizedDescription)")
            case .success:
                expectation.fulfill()
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    override func tearDown() {
        let expectation = XCTestExpectation(description: "logs out")
        app.currentUser!.remove { (error) in
            guard error == nil else {
                fatalError("Failed to log out: \(error!.localizedDescription)")
            }
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 10)
    }
}
