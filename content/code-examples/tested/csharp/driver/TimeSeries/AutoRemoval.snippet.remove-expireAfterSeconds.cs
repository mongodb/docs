var command = new BsonDocument
{
    { "collMod", "weather24h" },
    { "expireAfterSeconds", "off" }
};

await database.RunCommandAsync<BsonDocument>(command);
