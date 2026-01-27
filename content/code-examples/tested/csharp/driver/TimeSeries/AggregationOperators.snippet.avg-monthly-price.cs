var pipeline = new BsonDocument[]
{
    new("$group",
        new BsonDocument
        {
            {
                "_id",
                new BsonDocument
                {
                    {
                        "firstDayOfMonth",
                        new BsonDocument("$dateTrunc",
                            new BsonDocument
                            {
                                { "date", "$date" },
                                { "unit", "month" }
                            })
                    },
                    { "symbol", "$symbol" }
                }
            },
            {
                "avgMonthClose", new BsonDocument("$avg", "$close")
            }
        })
};
var pipelineDefinition = PipelineDefinition<Stocks, BsonDocument>.Create(pipeline);
var result = await _stocks?.Aggregate(pipelineDefinition).ToListAsync()!;
