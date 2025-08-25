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
}
