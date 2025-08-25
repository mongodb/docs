let queryFilter: Document = ["name": "Bean of the Day"]
let documentUpdate: Document = ["$set": ["containsDairy": true]]

collection.updateManyDocuments(filter: queryFilter, update: documentUpdate) { result in
    switch result {
    case .failure(let error):
        print("Failed to update document: \(error.localizedDescription)")
        return
    case .success(let updateResult):
        print("Successfully updated \(updateResult.modifiedCount) documents.")
    }
}
