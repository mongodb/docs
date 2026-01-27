var pipeline = new BsonDocument[]
{
    new("$setWindowFields",
        new BsonDocument
        {
            { "partitionBy", new BsonDocument("symbol", "$symbol") },
            { "sortBy", new BsonDocument("date", 1) },
            { "output", new BsonDocument("averageMonthClosingPrice",
                new BsonDocument
                {
                    { "$avg", "$close" },
                    { "window", new BsonDocument
                        {
                            { "range", new BsonArray { -1, "current" } },
                            { "unit", "month" }
                        }
                    }
                })
            }
        })
};

var pipelineDefinition = PipelineDefinition<Stocks, BsonDocument>.Create(pipeline);
var result = await _stocks?.Aggregate(pipelineDefinition).ToListAsync()!;
