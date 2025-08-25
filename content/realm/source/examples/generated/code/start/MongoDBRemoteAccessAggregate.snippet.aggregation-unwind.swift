let pipeline: [Document] = [["$unwind": ["path": "$featuredInPromotions", "includeArrayIndex": "itemIndex"]]]

collection.aggregate(pipeline: pipeline) { result in
    switch result {
    case .failure(let error):
        print("Failed to aggregate: \(error.localizedDescription)")
        return
    case .success(let results):
        print("Successfully ran the aggregation.")
        for result in results {
            print("Coffee drink: \(result)")
        }
    }
}
