let queryFilter: Document = ["name": "Colombian Blend"]

collection.findOneDocument(filter: queryFilter) { result in
    switch result {
    case .failure(let error):
        print("Did not find matching documents: \(error.localizedDescription)")
        return
    case .success(let document):
        print("Found a matching document: \(String(describing: document))")
    }
}
