import XCTest
import RealmSwift

class ManageEmailPasswordUsers: XCTestCase {

    func testRegisterNewAccount() async {
        // :snippet-start: register-email
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let client = app.emailPasswordAuth
        let email = "skroob@example.com"
        let password = "password12345"

        do {
            try await client.registerUser(email: email, password: password)
            // Registering just registers. You can now log in.
            print("Successfully registered user.")
        } catch {
            print("Failed to register: \(error.localizedDescription)")
            // :remove-start:
            XCTAssertEqual(error.localizedDescription, "name already in use")
            // :remove-end:
        }
        // :snippet-end:
    }

    func testRegisterNewAccountCompletionHandler() {
        let expectation = XCTestExpectation(description: "Registration continues")

        // :snippet-start: register-email-completion-handler
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let client = app.emailPasswordAuth
        let email = "skroob@example.com"
        let password = "password12345"
        client.registerUser(email: email, password: password) { (error) in
            guard error == nil else {
                print("Failed to register: \(error!.localizedDescription)")
                // :remove-start:
                XCTAssertEqual(error!.localizedDescription, "name already in use")
                expectation.fulfill()
                // :remove-end:
                return
            }
            // Registering just registers. You can now log in.
            print("Successfully registered user.")
            // :remove-start:
            expectation.fulfill()
            // :remove-end:
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testResendConfirmationEmail() async {
        // :snippet-start: resend-confirmation-email
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let client = app.emailPasswordAuth
        let email = "skroob@example.com"
        // If Realm is set to send a confirmation email, we can
        // send the confirmation email again here.
        do {
            try await client.resendConfirmationEmail(email)
            // The confirmation email has been sent
            // to the user again.
            print("Confirmation email resent")
        } catch {
            print("Failed to resend confirmation email: \(error.localizedDescription)")
            // :remove-start:
            XCTAssertEqual(error.localizedDescription, "already confirmed")
            // :remove-end:
        }
        // :snippet-end:
    }

    func testRetryConfirmationFunction() async {
        // :snippet-start: retry-confirmation-function
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let client = app.emailPasswordAuth
        let email = "skroob@example.com"
        // If Realm is set to run a custom confirmation function,
        // we can trigger that function to run again here.
        do {
            try await client.retryCustomConfirmation(email)
            // The custom confirmation function has been
            // triggered to run again for the user.
            print("Custom confirmation retriggered")
        } catch {
            print("Failed to retry custom confirmation: \(error.localizedDescription)")
            // :remove-start:
            XCTAssertEqual(error.localizedDescription, "cannot run confirmation for skroob@example.com: automatic confirmation is enabled")
            // :remove-end:
        }
        // :snippet-end:
    }

    func testConfirmNewUserEmail() async {
        // :snippet-start: confirm-new-user-email 
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let client = app.emailPasswordAuth

        // Token and tokenId are query parameters in the confirmation
        // link sent in the confirmation email.
        let token = "someToken"
        let tokenId = "someTokenId"

        do {
            try await client.confirmUser(token, tokenId: tokenId)
            // User email address confirmed.
            print("Successfully confirmed user.")
        } catch {
            print("User confirmation failed: \(error.localizedDescription)")
            // :remove-start:
            XCTAssertEqual(error.localizedDescription, "invalid token data")
            // :remove-end:
        }
        // :snippet-end:
    }

    func testResetPassword() async {
        // :snippet-start: reset-password
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let client = app.emailPasswordAuth

        let email = "forgot.my.password@example.com"
        // If Realm app password reset mode is "Send a password reset email",
        // we can do so here:
        do {
            try await client.sendResetPasswordEmail(email)
            print("Password reset email sent.")
        } catch {
            print("Reset password email not sent: \(error.localizedDescription)")
            // :remove-start:
            XCTAssertEqual(error.localizedDescription, "user not found")
            // :remove-end:
        }

        // Later...

        let newPassword = "mynewpassword12345"

        // Token and tokenId are query parameters in the reset password
        // link sent in the reset password email.
        let token = "someToken"
        let tokenId = "someTokenId"

        do {
            try await client.resetPassword(to: newPassword, token: token, tokenId: tokenId)
            print("Password reset successful.")
        } catch {
            print("Failed to reset password: \(error.localizedDescription)")
            // :remove-start:
            XCTAssertEqual(error.localizedDescription, "invalid token data")
            // :remove-end:
        }
        // :snippet-end:
    }

    func testPasswordResetFuncAssumeSuccess() async {
        // :snippet-start: password-reset-function-success
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let client = app.emailPasswordAuth

        let email = "forgot.my.password@example.com"
        let newPassword = "mynewpassword12345"
        // The password reset function takes any number of
        // arguments. You might ask the user to provide answers to
        // security questions, for example, to verify the user
        // should be able to complete the password reset.
        let args: [AnyBSON] = []

        // This SDK call maps to the custom password reset
        // function that you define in the backend
        do {
            try await client.callResetPasswordFunction(email: email, password: newPassword, args: args)
            print("Password reset successful!")
        } catch {
            print("Password reset failed: \(error.localizedDescription)")
            // :remove-start:
            XCTAssertEqual(error.localizedDescription, "user not found")
            // :remove-end:
        }
        // :snippet-end:
    }
    
    func testPasswordResetFuncAssumePending() async {
        // :snippet-start: password-reset-function-pending
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let client = app.emailPasswordAuth

        let email = "forgot.my.password@example.com"
        let newPassword = "mynewpassword12345"
        // The password reset function takes any number of
        // arguments.
        let args: [AnyBSON] = []

        // This SDK call maps to the custom password reset
        // function that you define in the backend. In this example,
        // we assume your function waits for additional identity
        // confirmation. Calling this function only kicks
        // off the password reset function. It does not reset the password.
        do {
            try await client.callResetPasswordFunction(email: email, password: newPassword, args: args)
            print("Successfully called the password reset function")
        } catch {
            print("Password reset failed: \(error.localizedDescription)")
            // :remove-start:
            XCTAssertEqual(error.localizedDescription, "user not found")
            // :remove-end:
        }
        
        // Later...

        // Token and tokenId are parameters you can access
        // in the App Services function context. You could send
        // this to the user via email, SMS, or some other method.
        let token = "someToken"
        let tokenId = "someTokenId"

        do {
            try await client.resetPassword(to: newPassword, token: token, tokenId: tokenId)
            print("Password reset successful.")
        } catch {
            print("Failed to reset password: \(error.localizedDescription)")
            // :remove-start:
            XCTAssertEqual(error.localizedDescription, "invalid token data")
            // :remove-end:
        }
        // :snippet-end:
    }
}
