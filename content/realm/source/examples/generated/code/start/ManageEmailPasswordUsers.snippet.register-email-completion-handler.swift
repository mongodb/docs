let app = App(id: YOUR_APP_SERVICES_APP_ID)
let client = app.emailPasswordAuth
let email = "skroob@example.com"
let password = "password12345"
client.registerUser(email: email, password: password) { (error) in
    guard error == nil else {
        print("Failed to register: \(error!.localizedDescription)")
        return
    }
    // Registering just registers. You can now log in.
    print("Successfully registered user.")
}
