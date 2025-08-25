let appId = YOUR_APP_SERVICES_APP_ID // replace this with your App ID
let app = App(id: appId)
app.login(credentials: Credentials.anonymous) { (result) in
    switch result {
    case .failure(let error):
        print("Failed to log in: \(error.localizedDescription)")
    case .success(let user):
        // Access the custom user document remotely to update it.
        let client = user.mongoClient("mongodb-atlas")
        let database = client.database(named: "my_database")
        let collection = database.collection(withName: "users")
        collection.updateOneDocument(
            filter: ["userId": AnyBSON(user.id)],
            update: ["favoriteColor": "cerulean"]
        ) { (result) in
            switch result {
            case .failure(let error):
                print("Failed to update: \(error.localizedDescription)")
                return
            case .success(let updateResult):
                // User document updated.
                print("Matched: \(updateResult.matchedCount), updated: \(updateResult.modifiedCount)")
            }
        }
    }
}
