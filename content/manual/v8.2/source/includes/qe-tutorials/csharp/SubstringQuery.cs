// start-enable-substring
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
                        { "queryType", "substringPreview" },
                        { "strMaxLength", 12 },
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
// end-enable-substring

// start-query-substring
var filter = new BsonDocument("$expr", new BsonDocument("$encStrContains", 
    new BsonDocument
    {
        { "input", "$patientRecord.ssn" },
        { "substring", "-65-432" }
    }));

var findResult = await encryptedCollection.Find(filter).ToCursorAsync();
Console.WriteLine(findResult.FirstOrDefault().ToJson());
// end-query-substring