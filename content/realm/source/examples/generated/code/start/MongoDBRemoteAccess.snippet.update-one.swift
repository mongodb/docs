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
    }
