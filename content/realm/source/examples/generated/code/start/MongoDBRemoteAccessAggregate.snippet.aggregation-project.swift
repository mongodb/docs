let pipeline: [Document] = [["$project": ["_id": 0, "name": 1, "storeNumber": ["$arrayElemAt": [["$split": ["$store", " "]], 1]]]]]

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
