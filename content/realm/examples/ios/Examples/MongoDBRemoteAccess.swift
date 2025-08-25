// :replace-start: {
//   "terms": {
//     "(testCase: self)": "()"
//   }
// }

import XCTest
import RealmSwift

// :snippet-start: coffee-drink-model
class CoffeeDrink: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String
    @Persisted var beanRegion: String?
    @Persisted var containsDairy: Bool
    @Persisted var storeNumber: Int
}
// :snippet-end:

class MongoDBRemoteAccessTestCase: XCTestCase {
    let appClient = App(id: "swift-flexible-vkljj")
    
    // MARK: Insert One
    func testInsertOne() {
        let expectation = XCTestExpectation(description: "A document is inserted")
        let expectation2 = XCTestExpectation(description: "The document is deleted")

        // :snippet-start: insert-sample-data
        appClient.login(credentials: Credentials.anonymous) { (result) in // :emphasize:
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            // :emphasize-start:
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // :emphasize-end:
                    // mongodb-atlas is the cluster service name
                    let mongoClient = user.mongoClient("mongodb-atlas") // :emphasize:

                    // Select the database
                    let database = mongoClient.database(named: "ios") // :emphasize:

                    // Select the collection
                    let collection = database.collection(withName: "CoffeeDrinks") // :emphasize:

                    // :snippet-start: insert-one
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
                            // :remove-start:
                            expectation.fulfill()
                            sleep(1)
                            deleteInsertOneTestDocument()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                    
                    func deleteInsertOneTestDocument() {
                        collection.deleteOneDocument(filter: drink) { deletedResult in
                            switch deletedResult {
                            case .failure(let error):
                                print("Failed to delete a document: \(error.localizedDescription)")
                                return
                            case .success(let deletedResult):
                                XCTAssertEqual(deletedResult, 1)
                                expectation2.fulfill()
                            }
                        }
                    }
                }
            }
        }
        // :snippet-end:
        wait(for: [expectation, expectation2], timeout: 20)
    }

    // MARK: Insert Many
    func testInsertMany() {
        let expectation = XCTestExpectation(description: "Multiple documents are inserted")
        let expectation2 = XCTestExpectation(description: "Coffee drinks named 'Bean of the Day' are deleted")
        let expectation3 = XCTestExpectation(description: "A coffee drink named 'Maple Latte' is deleted")

        appClient.login(credentials: Credentials.anonymous) { (result) in // :emphasize:
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }

                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")

                let database = client.database(named: "ios") // :emphasize:

                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: insert-many
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                let drink2: Document = [ "name": "Maple Latte", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": true, "storeNumber": 42]
                let drink3: Document = [ "name": "Bean of the Day", "beanRegion": "San Marcos, Guatemala", "containsDairy": false, "storeNumber": 47]

                // Insert the documents into the collection
                collection.insertMany([drink, drink2, drink3]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        // :remove-start:
                        XCTAssertEqual(objectIds.count, 3)
                        expectation.fulfill()
                        sleep(1)
                        deleteInsertManyTestDocuments()
                        // :remove-end:
                    }
                }
                // :snippet-end:
                
                func deleteInsertManyTestDocuments() {
                    let filter1: Document = ["name": "Bean of the Day"]
                    let filter2: Document = ["name": "Maple Latte"]

                    collection.deleteManyDocuments(filter: filter1) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            print("Successfully deleted \(deletedResult) documents.")
                            XCTAssertEqual(deletedResult, 2)
                            expectation2.fulfill()
                            collection.deleteOneDocument(filter: filter2) { deletedResult in
                                switch deletedResult {
                                case .failure(let error):
                                    print("Failed to delete a document: \(error.localizedDescription)")
                                    return
                                case .success(let deletedResult):
                                    XCTAssertEqual(deletedResult, 1)
                                    expectation3.fulfill()
                                }
                            }
                        }
                    }
                }
            }
        }
        wait(for: [expectation, expectation2, expectation3], timeout: 30)
    }

    // MARK: Find One
    func testFindOneDocument() {
        let expectation = XCTestExpectation(description: "A test document is inserted")
        let expectation2 = XCTestExpectation(description: "The test document is returned")
        let expectation3 = XCTestExpectation(description: "The test document is deleted")

        appClient.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                
                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")
                
                // Insert a drink for the test
                let drink: Document = [ "name": "Colombian Blend", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 43]
                collection.insertOne(drink) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        // Success returns the objectId for the inserted document
                        print("Successfully inserted a document with id: \(objectId)")
                        expectation.fulfill()
                        sleep(1)
                        findOneDocument()
                        sleep(1)
                        deleteFindOneTestDocument()
                    }
                }
                
                func findOneDocument() {
                    // :snippet-start: find-one
                    let queryFilter: Document = ["name": "Colombian Blend"]

                    collection.findOneDocument(filter: queryFilter) { result in
                        switch result {
                        case .failure(let error):
                            print("Did not find matching documents: \(error.localizedDescription)")
                            return
                        case .success(let document):
                            print("Found a matching document: \(String(describing: document))")
                            // :remove-start:
                            XCTAssertNotNil(document)
                            expectation2.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteFindOneTestDocument() {
                    collection.deleteOneDocument(filter: drink) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            XCTAssertEqual(deletedResult, 1)
                            expectation3.fulfill()
                        }
                    }
                }
            }
        }
        wait(for: [expectation, expectation2, expectation3], timeout: 20)
    }

    // MARK: Find Many
    func testFindManyDocuments() {
        let expectation = XCTestExpectation(description: "Insert two test documents")
        let expectation2 = XCTestExpectation(description: "Two documents are returned")
        let expectation3 = XCTestExpectation(description: "Two test documents are deleted")

        appClient.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }

                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")
                
                // Insert test documents to find
                let drink: Document = [ "name": "Americano", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                let drink2: Document = [ "name": "Americano", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": true, "storeNumber": 42]

                collection.insertMany([drink, drink2]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        XCTAssertEqual(objectIds.count, 2)
                        expectation.fulfill()
                        sleep(1)
                        findManyDocuments()
                        sleep(1)
                        deleteFindManyTestDocuments()
                    }
                }
                
                func findManyDocuments() {
                    // :snippet-start: find-many
                    let queryFilter: Document = ["name": "Americano"]

                    collection.find(filter: queryFilter) { result in
                        switch result {
                        case .failure(let error):
                            print("Call to MongoDB failed: \(error.localizedDescription)")
                            return
                        case .success(let bsonDocumentArray):
                            print("Results: ")
                            for bsonDocument in bsonDocumentArray {
                                print("Coffee drink named: \(String(describing: bsonDocument["name"]))")
                            }
                            // :remove-start:
                            XCTAssertEqual(bsonDocumentArray.count, 2)
                            expectation2.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteFindManyTestDocuments() {
                    // Delete the test documents
                    let queryFilter: Document = ["name": "Americano"]
                    collection.deleteManyDocuments(filter: queryFilter) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            print("Successfully deleted \(deletedResult) documents.")
                            XCTAssertEqual(deletedResult, 2)
                            expectation3.fulfill()
                        }
                    }
                }
            }
        }
        wait(for: [expectation, expectation2, expectation3], timeout: 30)
    }
    
    // MARK: Find and Sort Many
    func testFindAndSortManyDocuments() {
        let expectation = XCTestExpectation(description: "Insert two test documents")
        let expectation2 = XCTestExpectation(description: "Two documents are returned, sorted")
        let expectation3 = XCTestExpectation(description: "Two test documents are deleted")

        appClient.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")
                
                // Insert test documents to find
                let drink: Document = [ "name": "Americano", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                let drink2: Document = [ "name": "Americano", "beanRegion": "San Marcos, Guatemala", "containsDairy": true, "storeNumber": 42]

                collection.insertMany([drink, drink2]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        XCTAssertEqual(objectIds.count, 2)
                        expectation.fulfill()
                        sleep(1)
                        findAndSortDocuments()
                        sleep(1)
                        deleteFindAndSortTestDocuments()
                    }
                }
                
                func findAndSortDocuments() {
                    // :snippet-start: find-and-sort
                    let queryFilter: Document = ["name": "Americano"]
                    let findOptions = FindOptions(0, nil, [["beanRegion": 1]])
                    
                    collection.find(filter: queryFilter, options: findOptions) { result in
                        switch result {
                        case .failure(let error):
                            print("Call to MongoDB failed: \(error.localizedDescription)")
                            return
                        case .success(let documents):
                            print("Results: ")
                            for document in documents {
                                print("Coffee drink: \(document)")
                            }
                            // :remove-start:
                            XCTAssertEqual(documents.count, 2)
                            // Unwrap the value of the beanRegion in the first document to verify
                            // the sort worked properly
                            let firstDocument = documents[0]
                            if let unwrappedBeanRegion = firstDocument["beanRegion"] {
                                if let unwrappedAnyBson = unwrappedBeanRegion {
                                    XCTAssertEqual(unwrappedAnyBson, "San Marcos, Guatemala")
                                    expectation2.fulfill()
                                }
                            }
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteFindAndSortTestDocuments() {
                    let queryFilter: Document = ["name": "Americano"]
                    collection.deleteManyDocuments(filter: queryFilter) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            print("Successfully deleted \(deletedResult) documents.")
                            XCTAssertEqual(deletedResult, 2)
                            expectation3.fulfill()
                        }
                    }
                }
            }
        }
        wait(for: [expectation, expectation2, expectation3], timeout: 20)
    }

    // MARK: Count
    func testCountDocuments() {
        let expectation = XCTestExpectation(description: "Inserts test documents")
        let expectation2 = XCTestExpectation(description: "Returns a count of documents")
        let expectation3 = XCTestExpectation(description: "Deletes test documents")

        appClient.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")

                // Insert test documents to find
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                let drink2: Document = [ "name": "Bean of the Day", "beanRegion": "San Marcos, Guatemala", "containsDairy": true, "storeNumber": 42]
                
                collection.insertMany([drink, drink2]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        XCTAssertEqual(objectIds.count, 2)
                        expectation.fulfill()
                        sleep(1)
                        countDocuments()
                        sleep(1)
                        deleteCountDocumentsTestDocuments()
                    }
                }
                
                func countDocuments() {
                    // :snippet-start: count
                    let queryFilter: Document = ["name": "Bean of the Day"]

                    collection.count(filter: queryFilter) { result in
                        switch result {
                        case .failure(let error):
                            print("Call to MongoDB failed: \(error.localizedDescription)")
                            return
                        case .success(let count):
                            print("Found this many documents in the collection matching the filter: \(count)")
                            // :remove-start:
                            XCTAssertEqual(count, 2)
                            expectation2.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteCountDocumentsTestDocuments() {
                    let queryFilter: Document = ["name": "Bean of the Day"]
                    collection.deleteManyDocuments(filter: queryFilter) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            print("Successfully deleted \(deletedResult) documents.")
                            XCTAssertEqual(deletedResult, 2)
                            expectation3.fulfill()
                        }
                    }
                }
            }
        }
        wait(for: [expectation, expectation2, expectation3], timeout: 10)
    }

    // MARK: Update One
    func testUpdateOneDocument() {
        let expectation = XCTestExpectation(description: "Insert a test document")
        let expectation2 = XCTestExpectation(description: "Updates the test document")
        let expectation3 = XCTestExpectation(description: "Deletes the test document")

        appClient.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                
                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")

                // Insert a test drink
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                collection.insertOne(drink) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        // Success returns the objectId for the inserted document
                        print("Successfully inserted a document with id: \(objectId)")
                        expectation.fulfill()
                        sleep(1)
                        updateOneDocument()
                        sleep(1)
                        deleteUpdateOneTestDocument()
                    }
                }
                
                func updateOneDocument() {
                    // :snippet-start: update-one
                    let queryFilter: Document = ["name": "Bean of the Day", "storeNumber": 42]
                    let documentUpdate: Document = ["$set": ["containsDairy": true]]
                    
                    collection.updateOneDocument(filter: queryFilter, update: documentUpdate) { result in
                        switch result {
                        case .failure(let error):
                            print("Failed to update document: \(error.localizedDescription)")
                            return
                        case .success(let updateResult):
                            if updateResult.matchedCount == 1 && updateResult.modifiedCount == 1 {
                                print("Successfully updated a matching document.")
                            } else {
                                print("Did not update a document")
                            }
                            // :remove-start:
                            // updateOneDocument does not actually returned the updated document
                            // we can confirm that one document matched the query and was updated
                            // but do additional work later to verify it has the updated value
                            XCTAssertEqual(updateResult.matchedCount, 1)
                            XCTAssertEqual(updateResult.modifiedCount, 1)
                            // Actually retrieve the updated document to verify it has the new value
                            collection.findOneDocument(filter: queryFilter) { result in
                                switch result {
                                case .failure(let error):
                                    print("Did not find matching documents: \(error.localizedDescription)")
                                    return
                                case .success(let document):
                                    // Unwrapping the returned BSON values in Swift is involves a lot of optional checks,
                                    // but this verifies that the updated value for the test document is now "true"
                                    if let unwrappedDocument = document {
                                        let possibleContainsDairyKey = unwrappedDocument["containsDairy"]
                                        if let containsDairyDocumentBson = possibleContainsDairyKey {
                                            let possibleContainsDairyValue = containsDairyDocumentBson?.boolValue
                                            if let actualContainsDairyBoolValue = possibleContainsDairyValue {
                                                XCTAssertTrue(actualContainsDairyBoolValue)
                                                expectation2.fulfill()
                                            }
                                        }
                                    }
                                }
                            }
                            // :remove-end:
                        }
                        // :snippet-end:
                    }
                }
                
                func deleteUpdateOneTestDocument() {
                    let queryFilter: Document = ["name": "Bean of the Day", "storeNumber": 42]
                    collection.deleteOneDocument(filter: queryFilter) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            XCTAssertEqual(deletedResult, 1)
                            expectation3.fulfill()
                        }
                    }
                }
            }
        }
        wait(for: [expectation, expectation2, expectation3], timeout: 25)
    }

    // MARK: Update Many
    func testUpdateManyDocuments() {
        let expectation = XCTestExpectation(description: "Insert two test documents")
        let expectation2 = XCTestExpectation(description: "Update the test documents")
        let expectation3 = XCTestExpectation(description: "Delete the test documents")

        appClient.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }
                
                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")
                
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": true, "storeNumber": 42]
                let drink2: Document = [ "name": "Bean of the Day", "beanRegion": "San Marcos, Guatemala", "containsDairy": true, "storeNumber": 42]

                collection.insertMany([drink, drink2]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        XCTAssertEqual(objectIds.count, 2)
                        expectation.fulfill()
                        sleep(1)
                        updateManyDocuments()
                        sleep(1)
                        deleteUpdateManyTestDocuments()
                    }
                }
                
                func updateManyDocuments() {
                    // :snippet-start: update-many
                    let queryFilter: Document = ["name": "Bean of the Day"]
                    let documentUpdate: Document = ["$set": ["containsDairy": true]]
                    
                    collection.updateManyDocuments(filter: queryFilter, update: documentUpdate) { result in
                        switch result {
                        case .failure(let error):
                            print("Failed to update document: \(error.localizedDescription)")
                            return
                        case .success(let updateResult):
                            print("Successfully updated \(updateResult.modifiedCount) documents.")
                            // :remove-start:
                            XCTAssertNotNil(updateResult.matchedCount)
                            XCTAssertNotNil(updateResult.modifiedCount)
                            expectation2.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteUpdateManyTestDocuments() {
                    let queryFilter: Document = ["name": "Bean of the Day"]
                    collection.deleteManyDocuments(filter: queryFilter) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            print("Successfully deleted \(deletedResult) documents.")
                            XCTAssertEqual(deletedResult, 2)
                            expectation3.fulfill()
                        }
                    }
                }
            }
        }
        wait(for: [expectation, expectation2, expectation3], timeout: 25)
    }

    // MARK: Upsert
    func testUpsertDocuments() {
        let expectation = XCTestExpectation(description: "Upsert, then delete a document")

        appClient.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }

                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")

                // :snippet-start: upsert
                let queryFilter: Document = ["name": "Bean of the Day", "storeNumber": 55]
                let documentUpdate: Document = ["name": "Bean of the Day", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": false, "storeNumber": 55]

                collection.updateOneDocument(filter: queryFilter, update: documentUpdate, upsert: true) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to update document: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        // :remove-start:
                        XCTAssertNotNil(updateResult.documentId)
                        // :remove-end:
                        if let unwrappedDocumentId = updateResult.documentId {
                            print("Successfully upserted a document with id: \(unwrappedDocumentId)")
                            // :remove-start:
                            deleteUpsertTestDocument()
                            // :remove-end:
                        } else {
                            print("Did not upsert a document")
                        }
                    }
                }
                // :snippet-end:
                
                func deleteUpsertTestDocument() {
                    // Delete the document so the test will pass next time
                    collection.deleteOneDocument(filter: documentUpdate) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete newly upserted document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            XCTAssertEqual(deletedResult, 1)
                            print("Successfully deleted upserted document")
                            expectation.fulfill()
                        }
                    }
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    // MARK: Delete One
    func testDeleteOneDocument() {
        let expectation = XCTestExpectation(description: "Insert, then delete a document")

        appClient.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                }

                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")

                let document: Document = ["name": "Mocha", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": true, "storeNumber": 17]
                collection.insertOne(document) { result in
                    switch result {
                    case .failure(let error):
                        print("Failed to update document: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        XCTAssertNotNil(objectId)
                        print("Successfully inserted a document with id: \(objectId)")
                        deleteOneDocument()
                    }
                }
                
                func deleteOneDocument() {
                    // :snippet-start: delete-one
                    let queryFilter: Document = ["name": "Mocha", "storeNumber": 17]
                    collection.deleteOneDocument(filter: queryFilter) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            print("Successfully deleted a document.")
                            // :remove-start:
                            XCTAssertEqual(deletedResult, 1)
                            expectation.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    // MARK: Delete Many
    func testDeleteManyDocuments() {
        let expectation = XCTestExpectation(description: "Insert and then delete multiple documents")

        appClient.login(credentials: Credentials.anonymous) { (result) in
            // Remember to dispatch back to the main thread in completion handlers
            // if you want to do anything on the UI.
            DispatchQueue.main.async {
                switch result {
                case .failure(let error):
                    print("Login failed: \(error)")
                case .success(let user):
                    print("Login as \(user) succeeded!")
                    // Continue below
                }

                let client = self.appClient.currentUser!.mongoClient("mongodb-atlas")
                let database = client.database(named: "ios")
                let collection = database.collection(withName: "CoffeeDrinks")

                let drink: Document = [ "name": "Caramel Latte", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 22]
                let drink2: Document = [ "name": "Caramel Latte", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": true, "storeNumber": 24]
                let drink3: Document = [ "name": "Caramel Latte", "beanRegion": "San Marcos, Guatemala", "containsDairy": false, "storeNumber": 35]

                // Insert the example data into the collection
                collection.insertMany([drink, drink2, drink3]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        XCTAssertEqual(objectIds.count, 3)
                        deleteManyDocuments()
                    }
                }
                
                func deleteManyDocuments() {
                    // :snippet-start: delete-many
                    let filter: Document = ["name": "Caramel Latte"]

                    collection.deleteManyDocuments(filter: filter) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            print("Successfully deleted \(deletedResult) documents.")
                            // :remove-start:
                            XCTAssertEqual(deletedResult, 3)
                            expectation.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
            }
        }
        wait(for: [expectation], timeout: 20)
    }

    // MARK: ChangeEventDelegate
    // :snippet-start: change-event-delegate
    class MyChangeStreamDelegate: ChangeEventDelegate {
        // :remove-start:
        private let testCase: XCTestCase
        private let openExpectation: XCTestExpectation
        private let closeExpectation: XCTestExpectation
        private var changeExpectation: XCTestExpectation?

        public init(testCase: XCTestCase) {
            self.testCase = testCase
            openExpectation = testCase.expectation(description: "Open watch stream")
            closeExpectation = testCase.expectation(description: "Close watch stream")
        }

        public func waitForOpen() {
            testCase.wait(for: [openExpectation], timeout: 20.0)
        }

        public func waitForClose() {
            testCase.wait(for: [closeExpectation], timeout: 20.0)
        }

        public func expectEvent() {
            XCTAssertNil(changeExpectation)
            changeExpectation = testCase.expectation(description: "Watch change event")
        }

        public func waitForEvent() throws {
            try testCase.wait(for: [XCTUnwrap(changeExpectation)], timeout: 20.0)
            changeExpectation = nil
        }
        // :remove-end:
        
        func changeStreamDidOpen(_ changeStream: RealmSwift.ChangeStream) {
            print("Change stream opened: \(changeStream)")
            openExpectation.fulfill() // :remove:
        }
        
        func changeStreamDidClose(with error: Error?) {
            if let anError = error {
                print("Change stream closed with error: \(anError.localizedDescription)")
            } else {
                print("Change stream closed")
            }
            closeExpectation.fulfill() // :remove:
        }
        
        func changeStreamDidReceive(error: Error) {
            print("Received error: \(error.localizedDescription)")
        }
        
        func changeStreamDidReceive(changeEvent: RealmSwift.AnyBSON?) {
            guard let changeEvent = changeEvent else { return }
            guard let document = changeEvent.documentValue else { return }
            print("Change event document received: \(document)")
            changeExpectation?.fulfill() // :remove:
        }
    }
    // :snippet-end:
    
    // MARK: Watch for Changes
    func testWatchForChangesInMDBCollection() {
        let expectation = XCTestExpectation(description: "Get notifications when documents are inserted")
        let expectation2 = XCTestExpectation(description: "Delete the test document")

        // :snippet-start: watch-collection
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
                let delegate =  MyChangeStreamDelegate(testCase: self)
                let changeStream = collection.watch(delegate: delegate, queue: queue)

                // :remove-start:
                delegate.waitForOpen()
                sleep(5)
                delegate.expectEvent()
                // :remove-end:
                // Adding a document triggers a change event.
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                
                collection.insertOne(drink) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        XCTAssertNotNil(objectId) // :remove:
                        print("Successfully inserted a document with id: \(objectId)")
                    }
                    sleep(3) // :remove:
                }
                // :remove-start:
                do {
                    try delegate.waitForEvent()
                } catch {
                    print("Error waiting for event: \(error.localizedDescription)")
                }
                // :remove-end:
                // After you're done watching for events, close the change stream.
                changeStream.close()
                // :remove-start:
                sleep(3)
                delegate.waitForClose()
                sleep(3)
                expectation.fulfill()
                collection.deleteOneDocument(filter: drink) { deletedResult in
                    switch deletedResult {
                    case .failure(let error):
                        print("Failed to delete a document: \(error.localizedDescription)")
                        return
                    case .success(let deletedResult):
                        print("Successfully deleted a document.")
                        XCTAssertEqual(deletedResult, 1)
                        expectation2.fulfill()
                    }
                }
                // :remove-end:
            }
        }
        // :snippet-end:
        wait(for: [expectation, expectation2], timeout: 75)
    }

    // MARK: Watch for Changes with Filter
    func testWatchForChangesInMDBCollectionWithFilter() {
        let expectation = XCTestExpectation(description: "Insert a test document")
        let expectation2 = XCTestExpectation(description: "Get a notification when a specific document is updated")
        let expectation3 = XCTestExpectation(description: "Delete the test document")

        // :snippet-start: watch-collection-with-filter
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
                // :remove-start:
                // Populate test data so we have something to watch
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                var drinkObjectId: ObjectId = ObjectId()
                collection.insertOne(drink) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        XCTAssertNotNil(objectId)
                        print("Successfully inserted a document with id: \(objectId)")
                        let objectIdValue = objectId.objectIdValue
                        guard let unwrappedObjectIdValue = objectIdValue else { return }
                        drinkObjectId.self = unwrappedObjectIdValue
                        expectation.fulfill()
                    }
                    sleep(2)
                }
                sleep(3)
                // :remove-end:
                
                // Watch the collection. In this example, we use a queue and delegate,
                // both of which are optional arguments.
                // `filterIds` is an array of specific document ObjectIds you want to watch.
                let queue = DispatchQueue(label: "io.realm.watchQueue")
                let delegate =  MyChangeStreamDelegate(testCase: self)
                let changeStream = collection.watch(filterIds: [drinkObjectId], delegate: delegate, queue: queue)

                // :remove-start:
                delegate.waitForOpen()
                sleep(3)
                delegate.expectEvent()
                // :remove-end:
                // An update to a relevant document triggers a change event.
                let queryFilter: Document = ["_id": AnyBSON(drinkObjectId) ]
                let documentUpdate: Document = ["$set": ["containsDairy": true]]

                collection.updateOneDocument(filter: queryFilter, update: documentUpdate) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        XCTAssertNotNil(updateResult) // :remove:
                        print("Successfully updated the document")
                    }
                    sleep(5) // :remove:
                }
                // :remove-start:
                do {
                    try delegate.waitForEvent()
                } catch {
                    print("Error waiting for event: \(error.localizedDescription)")
                }
                // :remove-end:
                // After you're done watching for events, close the change stream.
                changeStream.close()
                // :remove-start:
                sleep(3)
                delegate.waitForClose()
                sleep(3)
                expectation2.fulfill()
                collection.deleteOneDocument(filter: queryFilter) { deletedResult in
                    switch deletedResult {
                    case .failure(let error):
                        print("Failed to delete a document: \(error.localizedDescription)")
                        return
                    case .success(let deletedResult):
                        print("Successfully deleted a document.")
                        XCTAssertEqual(deletedResult, 1)
                        expectation3.fulfill()
                    }
                }
                // :remove-end:
            }
        }
        // :snippet-end:
        wait(for: [expectation, expectation2, expectation3], timeout: 75)
    }
    
    // MARK: Watch for Changes with Match
    func testWatchForChangesInMDBCollectionWithMatch() {
        let expectation = XCTestExpectation(description: "Insert a test document")
        let expectation2 = XCTestExpectation(description: "Get a notification when a specific document is updated")
        let expectation3 = XCTestExpectation(description: "Delete the test document")

        // :snippet-start: watch-collection-with-match
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
                // :remove-start:
                // Populate test data so we have something to watch
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                var drinkObjectId: ObjectId = ObjectId()
                collection.insertOne(drink) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectId):
                        XCTAssertNotNil(objectId)
                        print("Successfully inserted a document with id: \(objectId)")
                        let objectIdValue = objectId.objectIdValue
                        guard let unwrappedObjectIdValue = objectIdValue else { return }
                        drinkObjectId.self = unwrappedObjectIdValue
                        expectation.fulfill()
                    }
                    sleep(3)
                }
                sleep(3)
                // :remove-end:
                
                // Watch the collection. In this example, we use a queue and delegate,
                // both of which are optional arguments.
                let queue = DispatchQueue(label: "io.realm.watchQueue")
                let delegate =  MyChangeStreamDelegate(testCase: self)
                let matchFilter = [ "fullDocument.storeNumber": AnyBSON(42) ]
                let changeStream = collection.watch(matchFilter: matchFilter, delegate: delegate, queue: queue)
                // :remove-start:
                sleep(3)
                delegate.waitForOpen()
                sleep(3)
                delegate.expectEvent()
                // :remove-end:
                // An update to a relevant document triggers a change event.
                let queryFilter: Document = ["_id": AnyBSON(drinkObjectId) ]
                let documentUpdate: Document = ["$set": ["containsDairy": true]]

                collection.updateOneDocument(filter: queryFilter, update: documentUpdate) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let updateResult):
                        XCTAssertNotNil(updateResult) // :remove:
                        print("Successfully updated the document")
                    }
                    sleep(3) // :remove:
                }
                // :remove-start:
                do {
                    try delegate.waitForEvent()
                } catch {
                    print("Error waiting for event: \(error.localizedDescription)")
                }
                // :remove-end:
                // After you're done watching for events, close the change stream.
                changeStream.close()
                // :remove-start:
                sleep(5)
                delegate.waitForClose()
                sleep(5)
                expectation2.fulfill()
                collection.deleteOneDocument(filter: queryFilter) { deletedResult in
                    switch deletedResult {
                    case .failure(let error):
                        print("Failed to delete a document: \(error.localizedDescription)")
                        return
                    case .success(let deletedResult):
                        print("Successfully deleted a document.")
                        XCTAssertEqual(deletedResult, 1)
                        expectation3.fulfill()
                    }
                }
                // :remove-end:
            }
        }
        // :snippet-end:
        wait(for: [expectation, expectation2, expectation3], timeout: 75)
    }
}

// MARK: Async APIs
class MongoDBRemoteAccessTestCaseAsyncAPIs: XCTestCase {
    let appClient = App(id: "swift-flexible-vkljj")
    
    func testAsyncAwaitInsert() async {
        do {
            // Use the async method to login
            let user = try await appClient.login(credentials: Credentials.anonymous)
            print("Login as \(user) succeeded!")
        } catch {
            print("Login failed: \(error.localizedDescription)")
        }

        let client = appClient.currentUser!.mongoClient("mongodb-atlas")
        let database = client.database(named: "ios")
        let collection = database.collection(withName: "CoffeeDrinks")

        // :snippet-start: async-await-insert
        // This document represents a CoffeeDrink object
        let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 43]

        do {
            // Use the async collection method to insert the document
            let objectId = try await collection.insertOne(drink)
            // :remove-start:
            XCTAssertNotNil(objectId)
            // :remove-end:
            print("Successfully inserted a document with id: \(objectId)")
        } catch {
            print("Call to MongoDB failed: \(error.localizedDescription)")
        }
        // :snippet-end:
        do {
            let deletedCount = try await collection.deleteOneDocument(filter: drink)
            XCTAssertEqual(deletedCount, 1)
        } catch {
            print("Failed to delete the test document: \(error.localizedDescription)")
        }
    }
    
#if swift(>=5.8)
    // Per Thomas in the SDK test suite:
    // wait(for:) doesn't work in async functions because it blocks the calling
    // thread and doesn't let async tasks run. Xcode 14.3 introduced a new async
    // version of it which does work, but there doesn't appear to be a workaround
    // for older Xcode versions.
    // (DISABLING THIS TEST because it times out in CI but it passes on my machine)
    func testAsyncStreamWatchForChangesInMDBCollection() async throws {
        // :snippet-start: watch-collection-async-sequence
        let user = try await appClient.login(credentials: Credentials.anonymous)
        // Set up the client, database, and collection.
        let mongoClient = user.mongoClient("mongodb-atlas")
        let database = mongoClient.database(named: "ios")
        let collection = database.collection(withName: "CoffeeDrinks")
        // :remove-start:
        // Populate test data
        let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 43]
        let objectId = try await collection.insertOne(drink)
        XCTAssertNotNil(objectId) // :remove:
        print("Successfully inserted a document with id: \(objectId)")
        let objectIdValue = objectId.objectIdValue
        guard let unwrappedObjectIdValue = objectIdValue else { return }
        
        let openEx = expectation(description: "open watch stream")
        // :remove-end:
        
        // Set up a task you'll later await to keep the change stream open,
        // and you can cancel it when you're done watching for events.
        let task = Task {
            // Open the change stream.
            let changeEvents = collection.changeEvents(onOpen: {
                openEx.fulfill() // :remove:
                print("Successfully opened change stream")
            })
            // Await events in the change stream.
            for try await event in changeEvents {
                let doc = event.documentValue!
                // :remove-start:
                let objectId = doc["documentKey"]??.documentValue?["_id"]??.objectIdValue
                if let unwrappedObjectId = objectId {
                    XCTAssertEqual(unwrappedObjectId, objectIdValue)
                }
                // :remove-end:
                print("Received event: \(event.documentValue!)")
            }
        }
        await fulfillment(of: [openEx], timeout: 30.0) // :remove:
        
        // Updating a document in the collection triggers a change event.
        let queryFilter: Document = ["_id": AnyBSON(objectId) ]
        let documentUpdate: Document = ["$set": ["containsDairy": true]]
        let updateResult = try await collection.updateOneDocument(filter: queryFilter, update: documentUpdate)
        sleep(2) // :remove:
        // Cancel the task when you're done watching the stream.
        task.cancel()
        _ = await task.result
        // :snippet-end:
        let deletedCount = try await collection.deleteOneDocument(filter: queryFilter)
        XCTAssertEqual(deletedCount, 1)
    }
#endif
}

// :replace-end:
