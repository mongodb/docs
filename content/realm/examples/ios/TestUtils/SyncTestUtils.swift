import Foundation
import RealmSwift
import XCTest

func randomAlphanumericString(_ length: Int) -> String {
   let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
   let randomString = (0..<length).map{ _ in String(letters.randomElement()!) }.reduce("", +)
   return randomString
}

open class SwiftSyncTestCase: XCTestCase {
    let waiter = XCTWaiter()
    
    public func emailPasswordCredentials(app: App) -> Credentials {
        let email = "\(randomAlphanumericString(10))"
        let password = "abcdef"
        let credentials = Credentials.emailPassword(email: email, password: password)
        let ex = XCTestExpectation(description: "Should register in the user properly")
        app.emailPasswordAuth.registerUser(email: email, password: password, completion: { error in
            XCTAssertNil(error)
            ex.fulfill()
        })
        waiter.wait(for: [ex], timeout: 40)
        return credentials
    }
}
