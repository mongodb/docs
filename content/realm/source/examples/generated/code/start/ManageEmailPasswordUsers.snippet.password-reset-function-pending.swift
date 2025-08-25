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
}
