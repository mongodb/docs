// start-enable-range
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
                { "queries", new BsonDocument("queryType", "equality") }
            },
            new BsonDocument
            {
                { "keyId", BsonNull.Value },
                { "path", "patientRecord.billing" },
                { "bsonType", "object" }
            },
            new BsonDocument
            {
                { "keyId", BsonNull.Value },
                { "path", "patientRecord.billAmount" },
                { "bsonType", "int" },
                { "queries", new BsonDocument
                    {
                        { "queryType", "range" },
                        { "sparsity", 1 },
                        { "min", 100 },
                        { "max", 2000 },
                        { "trimFactor", 4 }
                    }
                },
            }
        }
    }
};
// end-enable-range

// start-query-range
var filter = Builders<Patient>.Filter.Gt("patientRecord.billAmount", 1000) &
             Builders<Patient>.Filter.Lt("patientRecord.billAmount", 2000);

var findResult = encryptedCollection.Find(filter).FirstOrDefault();
Console.WriteLine(findResult.ToJson());
// end-query-range