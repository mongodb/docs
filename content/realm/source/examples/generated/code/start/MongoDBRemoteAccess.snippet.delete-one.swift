let queryFilter: Document = ["name": "Mocha", "storeNumber": 17]
collection.deleteOneDocument(filter: queryFilter) { deletedResult in
    switch deletedResult {
    case .failure(let error):
        print("Failed to delete a document: \(error.localizedDescription)")
        return
    case .success(let deletedResult):
        print("Successfully deleted a document.")
    }
}
