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
    }
}
