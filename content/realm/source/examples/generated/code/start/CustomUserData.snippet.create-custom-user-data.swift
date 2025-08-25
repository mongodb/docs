let appId = YOUR_APP_SERVICES_APP_ID // replace this with your App ID
let app = App(id: appId)
app.login(credentials: Credentials.anonymous) { (result) in
    switch result {
    case .failure(let error):
        print("Failed to log in: \(error.localizedDescription)")
    case .success(let user):
        let client = user.mongoClient("mongodb-atlas")
        let database = client.database(named: "my_database")
        let collection = database.collection(withName: "users")

        // Insert the custom user data object
        collection.insertOne([
            "userId": AnyBSON(user.id),
            "favoriteColor": "pink"
            ]) { (result) in
            switch result {
            case .failure(let error):
                print("Failed to insert document: \(error.localizedDescription)")
            case .success(let newObjectId):
                print("Inserted custom user data document with object ID: \(newObjectId)")
            }
        }
    }
}
