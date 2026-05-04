// start-enable-prefix
var encryptedFields = new BsonDocument
{
    {
        "fields", new BsonArray
        {
            new BsonDocument
            {
                { "keyId", BsonNull.Value },
                { "path", "patientRecord.ssn" },
                { "bsonType", "string" },
                { "queries", new BsonDocument
                    {
                        { "queryType", "prefixPreview" },
                        { "strMinQueryLength", 3 },
                        { "strMaxQueryLength", 10 },
                        { "caseSensitive", true },
                        { "diacriticSensitive", true }
                    }
                }
            }
        }
    }
};
// end-enable-prefix

// start-query-prefix
var filter = new BsonDocument("$expr", new BsonDocument("$encStrStartsWith", 
    new BsonDocument
    {
        { "input", "$patientRecord.ssn" },
        { "prefix", "987" }
    }));

var findResult = await encryptedCollection.Find(filter).ToCursorAsync();
Console.WriteLine(findResult.FirstOrDefault().ToJson());
// end-query-prefix