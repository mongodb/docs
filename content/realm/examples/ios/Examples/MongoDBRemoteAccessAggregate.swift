import XCTest
import RealmSwift

class MongoDBRemoteAccessAggregationTestCase: XCTestCase {
    let appClient = App(id: "swift-flexible-vkljj")
    
    // MARK: Aggregation Match
    func testAggregationMatch() {
        let expectation = XCTestExpectation(description: "Insert test documents to match")
        let expectation2 = XCTestExpectation(description: "Run aggregation to find matching documents")
        let expectation3 = XCTestExpectation(description: "Delete test documents")

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

                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                let drink2: Document = [ "name": "Maple Latte", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": true, "storeNumber": 42]

                // Insert test documents into the collection
                collection.insertMany([drink, drink2]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        expectation.fulfill()
                        sleep(1)
                        runAggregationMatch()
                        sleep(1)
                        deleteAggregationMatchTestDocuments()
                    }
                }
                
                func runAggregationMatch() {
                    // :snippet-start: aggregation-match
                    let pipeline: [Document] = [["$match": ["storeNumber": ["$eq": 42]]]]
                    
                    collection.aggregate(pipeline: pipeline) { result in
                        switch result {
                        case .failure(let error):
                            print("Failed to aggregate: \(error.localizedDescription)")
                            return
                        case .success(let documents):
                            print("Successfully ran the aggregation:")
                            for document in documents {
                                print("Coffee drink: \(document)")
                            }
                            // :remove-start:
                            XCTAssertEqual(documents.count, 2)
                            expectation2.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteAggregationMatchTestDocuments() {
                    let filter: Document = ["storeNumber": 42]
                    collection.deleteManyDocuments(filter: filter) { deletedResult in
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

    // MARK: Aggregation Group
    func testAggregationGroup() {
        let expectation = XCTestExpectation(description: "Insert test documents to match")
        let expectation2 = XCTestExpectation(description: "Run aggregation to group documents")
        let expectation3 = XCTestExpectation(description: "Delete test documents for store 42")
        let expectation4 = XCTestExpectation(description: "Delete test documents for store 47")

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
                
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 42]
                let drink2: Document = [ "name": "Maple Latte", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": true, "storeNumber": 42]
                let drink3: Document = [ "name": "Bean of the Day", "beanRegion": "San Marcos, Guatemala", "containsDairy": false, "storeNumber": 47]

                // Insert test documents into the collection
                collection.insertMany([drink, drink2, drink3]) { result in
                    switch result {
                    case .failure(let error):
                        print("Call to MongoDB failed: \(error.localizedDescription)")
                        return
                    case .success(let objectIds):
                        print("Successfully inserted \(objectIds.count) new documents.")
                        XCTAssertEqual(objectIds.count, 3)
                        expectation.fulfill()
                        sleep(1)
                        runAggregationGroup()
                        sleep(1)
                        deleteAggregationGroupTestDocuments()
                    }
                }
                
                func runAggregationGroup() {
                    // :snippet-start: aggregation-group
                    let pipeline: [Document] = [["$group": ["_id": "$storeNumber", "numItems": ["$sum": 1]]]]

                    collection.aggregate(pipeline: pipeline) { result in
                        switch result {
                        case .failure(let error):
                            print("Failed to aggregate: \(error.localizedDescription)")
                            return
                        case .success(let results):
                            print("Successfully ran the aggregation.")
                            for result in results {
                                print(result)
                            }
                            // :remove-start:
                            // 3 documents went in, but there should be only 2 results after this aggregation with two of the documents
                            // grouped by storeNumber 42
                            XCTAssertEqual(results.count, 2)
                            expectation2.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteAggregationGroupTestDocuments() {
                    let filter: Document = ["storeNumber": 42]
                    collection.deleteManyDocuments(filter: filter) { deletedResult in
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
                    let filter2: Document = ["storeNumber": 47]
                    collection.deleteManyDocuments(filter: filter2) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            print("Successfully deleted \(deletedResult) documents.")
                            XCTAssertEqual(deletedResult, 1)
                            expectation4.fulfill()
                        }
                    }
                }
            }
        }
        wait(for: [expectation, expectation2, expectation3, expectation4], timeout: 35)
    }

    // MARK: Aggregation Project
    func testAggregationProject() {
        let expectation = XCTestExpectation(description: "Insert test documents")
        let expectation2 = XCTestExpectation(description: "Run aggregation to project")
        let expectation3 = XCTestExpectation(description: "Delete test documents")

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
                let collection = database.collection(withName: "CoffeeDrinkAlt")
                
                // :snippet-start: store-document-example
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "store": "Store 42"]
                let drink2: Document = [ "name": "Bean of the Day", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": true, "store": "Store 47"]
                // :snippet-end:
                
                // Insert test documents into the collection
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
                        runAggregationProject()
                        sleep(1)
                        deleteAggregationProjectTestDocuments()
                    }
                }
                
                func runAggregationProject() {
                    // :snippet-start: aggregation-project
                    let pipeline: [Document] = [["$project": ["_id": 0, "name": 1, "storeNumber": ["$arrayElemAt": [["$split": ["$store", " "]], 1]]]]]

                    collection.aggregate(pipeline: pipeline) { result in
                        switch result {
                        case .failure(let error):
                            print("Failed to aggregate: \(error.localizedDescription)")
                            return
                        case .success(let results):
                            print("Successfully ran the aggregation.")
                            for result in results {
                                print(result)
                                // :remove-start:
                                let possibleStoreNumber = result["storeNumber"]
                                if let bsonStoreNumber = possibleStoreNumber {
                                    let possibleStringStoreNumber = bsonStoreNumber?.stringValue
                                    if let storeNumberString = possibleStringStoreNumber {
                                        XCTAssert(storeNumberString == "42" || storeNumberString == "47" )
                                        expectation2.fulfill()
                                    }
                                }
                                // :remove-end:
                            }
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteAggregationProjectTestDocuments() {
                    let filter: Document = ["name": "Bean of the Day"]
                    collection.deleteManyDocuments(filter: filter) { deletedResult in
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
        wait(for: [expectation, expectation2, expectation3], timeout: 45)
    }

    // MARK: Aggregation Add Fields
    func testAggregationAddFields() {
        let expectation = XCTestExpectation(description: "Insert test documents")
        let expectation2 = XCTestExpectation(description: "Run aggregation to add the storeNumber field")
        let expectation3 = XCTestExpectation(description: "Delete test documents")

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
                let collection = database.collection(withName: "CoffeeDrinkAlt")
                
                let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "store": "Store 42"]
                let drink2: Document = [ "name": "Bean of the Day", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": true, "store": "Store 47"]
                
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
                        runAddFieldsAggregation()
                        sleep(1)
                        deleteAddFieldsAggregationTestDocuments()
                    }
                }

                func runAddFieldsAggregation() {
                    // :snippet-start: aggregation-add-fields
                    let pipeline: [Document] = [["$addFields": ["storeNumber": ["$arrayElemAt": [["$split": ["$store", " "]], 1]]]]]

                    collection.aggregate(pipeline: pipeline) { result in
                        switch result {
                        case .failure(let error):
                            print("Failed to aggregate: \(error.localizedDescription)")
                            return
                        case .success(let results):
                            print("Successfully ran the aggregation.")
                            for result in results {
                                print(result)
                                // :remove-start:
                                // There should now be a `storeNumber` field on this document, so confirm it exists
                                let newStoreNumberField = result["storeNumber"]
                                XCTAssertNotNil(newStoreNumberField)
                                // :remove-end:
                            }
                            expectation2.fulfill() // :remove:
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteAddFieldsAggregationTestDocuments() {
                    let filter: Document = ["name": "Bean of the Day"]
                    collection.deleteManyDocuments(filter: filter) { deletedResult in
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
        wait(for: [expectation, expectation2, expectation3], timeout: 35)
    }

    // MARK: Aggregation Unwind
    func testAggregationUnwind() {
        let expectation = XCTestExpectation(description: "Insert test document")
        let expectation2 = XCTestExpectation(description: "Run aggregation to unwind")
        let expectation3 = XCTestExpectation(description: "Delete the test document")

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

                // :snippet-start: unwind-test-document
                let drink: Document = [
                    "name": "Maple Latte",
                    "beanRegion": "Yirgacheffe, Ethiopia",
                    "containsDairy": true,
                    "storeNumber": 42,
                    "featuredInPromotions": [
                        "Spring into Spring",
                        "Tastes of Fall",
                        "Winter Delights"
                    ]
                ]
                // :snippet-end:
                
                // Insert a test document into the collection
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
                        runAggregationUnwind()
                        sleep(1)
                        deleteAggregationUnwindTestDocuments()
                    }
                }
                
                func runAggregationUnwind() {
                    // :snippet-start: aggregation-unwind
                    let pipeline: [Document] = [["$unwind": ["path": "$featuredInPromotions", "includeArrayIndex": "itemIndex"]]]

                    collection.aggregate(pipeline: pipeline) { result in
                        switch result {
                        case .failure(let error):
                            print("Failed to aggregate: \(error.localizedDescription)")
                            return
                        case .success(let results):
                            print("Successfully ran the aggregation.")
                            for result in results {
                                print("Coffee drink: \(result)")
                            }
                            // :remove-start:
                            XCTAssertNotNil(results)
                            expectation2.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                }
                
                func deleteAggregationUnwindTestDocuments() {
                    let filter: Document = ["name": "Maple Latte"]
                    collection.deleteManyDocuments(filter: filter) { deletedResult in
                        switch deletedResult {
                        case .failure(let error):
                            print("Failed to delete a document: \(error.localizedDescription)")
                            return
                        case .success(let deletedResult):
                            print("Successfully deleted \(deletedResult) documents.")
                            XCTAssertEqual(deletedResult, 1)
                            expectation3.fulfill()
                        }
                    }
                }
            }
        }
        wait(for: [expectation, expectation2, expectation3], timeout: 35)
    }
}
