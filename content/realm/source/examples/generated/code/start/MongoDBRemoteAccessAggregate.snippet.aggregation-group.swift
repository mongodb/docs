let pipeline: [Document] = [["$group": ["_id": "$storeNumber", "numItems": ["$sum": 1]]]]

collection.aggregate(pipeline: pipeline) { result in
    switch result {
    case .failure(let error):
        print("Failed to aggregate: \(error.localizedDescription)")
        return
    case .success(let results):
        print("Successfully ran the aggregation.")
        for result in results {
            print(result)
        }
    }
}
