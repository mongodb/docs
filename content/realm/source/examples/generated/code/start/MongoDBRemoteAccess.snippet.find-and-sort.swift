let queryFilter: Document = ["name": "Americano"]
let findOptions = FindOptions(0, nil, [["beanRegion": 1]])

collection.find(filter: queryFilter, options: findOptions) { result in
    switch result {
    case .failure(let error):
        print("Call to MongoDB failed: \(error.localizedDescription)")
        return
    case .success(let documents):
        print("Results: ")
        for document in documents {
            print("Coffee drink: \(document)")
        }
    }
}
