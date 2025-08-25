let app = App(id: YOUR_APP_SERVICES_APP_ID)

// ... log in ...

// User must not be an anonymous user.
let user = app.currentUser!
let client = user.apiKeysAuth

client.createAPIKey(named: "someKeyName") { (apiKey, error) in
    guard error == nil else {
        print("Failed to create key: \(error!)")
        return
    }
    // Use apiKey
}

