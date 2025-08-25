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
}
