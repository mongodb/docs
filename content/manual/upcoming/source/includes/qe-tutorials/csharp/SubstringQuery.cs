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
var filter = Builders<Patient>.Filter.EncStrContains("patientRecord.ssn", "-65-4");

var findResult = encryptedCollection.Find(filter).FirstOrDefault();
Console.WriteLine(findResult.ToJson());
// end-query-substring