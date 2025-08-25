// This document represents a CoffeeDrink object
let drink: Document = [ "name": "Bean of the Day", "beanRegion": "Timbio, Colombia", "containsDairy": false, "storeNumber": 43]

do {
    // Use the async collection method to insert the document
    let objectId = try await collection.insertOne(drink)
    print("Successfully inserted a document with id: \(objectId)")
} catch {
    print("Call to MongoDB failed: \(error.localizedDescription)")
}
