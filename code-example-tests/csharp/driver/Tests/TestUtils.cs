using MongoDB.Bson;

public static class TestUtils
{
    public static BsonDocument[] ReadBsonDocumentsFromFile(string filePath)
    {
        var bsonDocuments = new List<BsonDocument>();

        foreach (var line in File.ReadLines(filePath))
        {
            if (!string.IsNullOrWhiteSpace(line))
            {
                var bsonDoc = BsonDocument.Parse(line);
                bsonDocuments.Add(bsonDoc);
            }
        }

        return bsonDocuments.ToArray();
    }
}
