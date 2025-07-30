var embeddedPipeline = new EmptyPipelineDefinition<Order>()
    .Match(new BsonDocument("$expr",
        new BsonDocument("$and", new BsonArray
        {
            new BsonDocument("$eq", new BsonArray { "$ProductName", "$$prdname" }),
            new BsonDocument("$eq", new BsonArray { "$ProductVariation", "$$prdvartn" })
        })))
