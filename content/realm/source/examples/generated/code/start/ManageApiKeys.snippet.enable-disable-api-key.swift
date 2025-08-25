let app = App(id: YOUR_APP_SERVICES_APP_ID)

// ... log in ...

let user = app.currentUser!

let client = user.apiKeysAuth

// Enable the API key
client.enableAPIKey(ObjectId("00112233445566778899aabb")) { (error) in
    // ...
}

let apiKey: UserAPIKey?

// ... Obtain a user API key ...

// Disable the API key
client.disableAPIKey(apiKey!.objectId) { (error) in
    // ...
}

