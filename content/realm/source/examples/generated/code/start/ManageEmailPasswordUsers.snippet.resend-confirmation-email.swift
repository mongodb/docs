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
}
