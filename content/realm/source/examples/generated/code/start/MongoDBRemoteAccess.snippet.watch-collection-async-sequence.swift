let user = try await appClient.login(credentials: Credentials.anonymous)
// Set up the client, database, and collection.
let mongoClient = user.mongoClient("mongodb-atlas")
let database = mongoClient.database(named: "ios")
let collection = database.collection(withName: "CoffeeDrinks")

// Set up a task you'll later await to keep the change stream open,
// and you can cancel it when you're done watching for events.
let task = Task {
    // Open the change stream.
    let changeEvents = collection.changeEvents(onOpen: {
        print("Successfully opened change stream")
    })
    // Await events in the change stream.
    for try await event in changeEvents {
        let doc = event.documentValue!
        print("Received event: \(event.documentValue!)")
    }
}

// Updating a document in the collection triggers a change event.
let queryFilter: Document = ["_id": AnyBSON(objectId) ]
let documentUpdate: Document = ["$set": ["containsDairy": true]]
let updateResult = try await collection.updateOneDocument(filter: queryFilter, update: documentUpdate)
// Cancel the task when you're done watching the stream.
task.cancel()
_ = await task.result
