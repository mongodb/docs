let app = App(id: YOUR_APP_SERVICES_APP_ID)

// ... log in ...

let user = app.currentUser!
let client = user.apiKeysAuth

// Fetch a specific API key by ObjectId
client.fetchAPIKey(ObjectId("00112233445566778899aabb")) { (maybeApiKey, error) in
    // ...
}

// Fetch all API keys
client.fetchAPIKeys { (keys, error) in
    guard error == nil else {
        fatalError("Failed to fetch keys: \(error!)")
    }
    for key in keys! {
        // use key
        print(key.name)
    }
}
