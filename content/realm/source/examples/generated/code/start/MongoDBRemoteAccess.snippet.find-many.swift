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
    }
}
