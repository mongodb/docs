.. code-block:: swift
   :emphasize-lines: 1, 4-9, 11, 14, 17

   appClient.login(credentials: Credentials.anonymous) { (result) in 
       // Remember to dispatch back to the main thread in completion handlers
       // if you want to do anything on the UI.
       DispatchQueue.main.async {
           switch result {
           case .failure(let error):
               print("Login failed: \(error)")
           case .success(let user):
               print("Login as \(user) succeeded!")
               // mongodb-atlas is the cluster service name
               let mongoClient = user.mongoClient("mongodb-atlas") 

               // Select the database
               let database = mongoClient.database(named: "ios") 

               // Select the collection
               let collection = database.collection(withName: "CoffeeDrinks") 

               // This document represents a CoffeeDrink object
               let drink: Document = [ "name": "Colombian Blend", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 43]

               // Insert the document into the collection
               collection.insertOne(drink) { result in
                   switch result {
                   case .failure(let error):
                       print("Call to MongoDB failed: \(error.localizedDescription)")
                       return
                   case .success(let objectId):
                       // Success returns the objectId for the inserted document
                       print("Successfully inserted a document with id: \(objectId)")
                   }
               }
           }
       }
   }
