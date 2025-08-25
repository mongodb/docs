let queryFilter: Document = ["name": "Bean of the Day", "storeNumber": 55]
let documentUpdate: Document = ["name": "Bean of the Day", "beanRegion": "Yirgacheffe, Ethiopia", "containsDairy": false, "storeNumber": 55]

collection.updateOneDocument(filter: queryFilter, update: documentUpdate, upsert: true) { result in
    switch result {
    case .failure(let error):
        print("Failed to update document: \(error.localizedDescription)")
        return
    case .success(let updateResult):
        if let unwrappedDocumentId = updateResult.documentId {
            print("Successfully upserted a document with id: \(unwrappedDocumentId)")
        } else {
            print("Did not upsert a document")
        }
    }
}
