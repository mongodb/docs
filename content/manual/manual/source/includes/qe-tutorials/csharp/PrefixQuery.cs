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
                        { "queryType", "prefix" },
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
var filter = Builders<Patient>.Filter.EncStrStartsWith("patientRecord.ssn", "987");

var findResult = encryptedCollection.Find(filter).FirstOrDefault();
Console.WriteLine(findResult.ToJson());
// end-query-prefix