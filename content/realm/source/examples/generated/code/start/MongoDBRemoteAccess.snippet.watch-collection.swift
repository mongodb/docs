appClient.login(credentials: Credentials.anonymous) { (result) in
    DispatchQueue.main.async {
        switch result {
        case .failure(let error):
            print("Login failed: \(error)")
        case .success(let user):
            print("Login as \(user) succeeded!")
            // Continue below
        }
        
        // Set up the client, database, and collection.
        let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
        let database = client.database(named: "ios")
        let collection = database.collection(withName: "CoffeeDrinks")
        
        // Watch the collection. In this example, we use a queue and delegate,
        // both of which are optional arguments.
        let queue = DispatchQueue(label: "io.realm.watchQueue")
        let delegate =  MyChangeStreamDelegate()
        let changeStream = collection.watch(delegate: delegate, queue: queue)

        // Adding a document triggers a change event.
        let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
        
        collection.insertOne(drink) { result in
            switch result {
            case .failure(let error):
                print("Call to MongoDB failed: \(error.localizedDescription)")
                return
            case .success(let objectId):
                print("Successfully inserted a document with id: \(objectId)")
            }
        }
        // After you're done watching for events, close the change stream.
        changeStream.close()
    }
}
