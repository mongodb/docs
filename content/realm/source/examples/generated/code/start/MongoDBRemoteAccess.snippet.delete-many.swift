let filter: Document = ["name": "Caramel Latte"]

collection.deleteManyDocuments(filter: filter) { deletedResult in
    switch deletedResult {
    case .failure(let error):
        print("Failed to delete a document: \(error.localizedDescription)")
        return
    case .success(let deletedResult):
        print("Successfully deleted \(deletedResult) documents.")
    }
}
