let queryFilter: Document = ["name": "Bean of the Day"]

collection.count(filter: queryFilter) { result in
    switch result {
    case .failure(let error):
        print("Call to MongoDB failed: \(error.localizedDescription)")
        return
    case .success(let count):
        print("Found this many documents in the collection matching the filter: \(count)")
    }
}
