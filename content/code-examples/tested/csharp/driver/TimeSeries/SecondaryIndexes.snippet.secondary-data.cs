var sampleDocuments = new List<BsonDocument>
{
    new BsonDocument
    {

            "metadata", new BsonDocument
            {
                { "sensorId", 5578 },
                { "type", "omni" },
                { "location", new BsonDocument
                    {
                        { "type", "Point" },
                        { "coordinates", new BsonArray { -77.40711, 39.03335 } }
                    }
                }
            }
        }

        ,
        { "timestamp", new DateTime(2022, 1, 15, 0, 0, 0, DateTimeKind.Utc) } ,
        { "currentConditions", new BsonDocument
            {
                { "windDirection", 127.0 },
                { "tempF", 71.0 },
                { "windSpeed", 2.0 },
                { "cloudCover", BsonNull.Value },
                { "precip", 0.1 },
                { "humidity", 94.0 }
            }
        }
    },
    new BsonDocument
    {
        { "metadata", new BsonDocument
            {
                { "sensorId", 5578 },
                { "type", "omni" },
                { "location", new BsonDocument
                    {
                        { "type", "Point" },
                        { "coordinates", new BsonArray { -77.40711, 39.03335 } }
                    }
                }
            }
        },
        { "timestamp", new DateTime(2022, 1, 15, 0, 1, 0, DateTimeKind.Utc) },
        { "currentConditions", new BsonDocument
            {
                { "windDirection", 128.0 },
                { "tempF", 69.8 },
                { "windSpeed", 2.2 },
                { "cloudCover", BsonNull.Value },
                { "precip", 0.1 },
                { "humidity", 94.3 }
            }
        }
    },
    new BsonDocument
    {
        { "metadata", new BsonDocument
            {
                { "sensorId", 5579 },
                { "type", "omni" },
                { "location", new BsonDocument
                    {
                        { "type", "Point" },
                        { "coordinates", new BsonArray { -80.19773, 25.77481 } }
                    }
                }
            }
        },
        { "timestamp", new DateTime(2022, 1, 15, 0, 1, 0, DateTimeKind.Utc) },
        { "currentConditions", new BsonDocument
            {
                { "windDirection", 115.0 },
                { "tempF", 88.0 },
                { "windSpeed", 1.0 },
                { "cloudCover", BsonNull.Value },
                { "precip", 0.0 },
                { "humidity", 99.0 }
            }
        }
    }
};
