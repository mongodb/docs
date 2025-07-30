var results = products.Aggregate()
    .Lookup<Order, BsonDocument, IEnumerable<BsonDocument>, BsonDocument>(
        foreignCollection: orders,
        let: new BsonDocument { { "prdname", "$Name" }, { "prdvartn", "$Variation" } },
        lookupPipeline: embeddedPipeline,
        "Orders"
    )
