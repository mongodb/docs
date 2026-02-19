using MongoDB.Bson;

public class ExtendedJson
{
    public static void Main(string[] args)
    {
        {
            // start-read-ejson
            var ejson = "{\n\"_id\": { \"$oid\": \"573a1391f29313caabcd9637\" },\n  \"createdAt\": { \"$date\": { \"$numberLong\": \"1601499609\" }},\n\"numViews\": { \"$numberLong\": \"36520312\" }\n}\n\n";
            
            var document = BsonDocument.Parse(ejson);
            Console.WriteLine(document.ToJson());
            // end-read-ejson
        }
        
        {
            // start-write-ejson
            var document = new MyDocument();
            document.Id = ObjectId.GenerateNewId();
            document.CreatedAt = DateTime.UtcNow;
            document.NumViews = 1234567890;
            
            var json = document.ToJson(new JsonWriterSettings
            {
                OutputMode = JsonOutputMode.CanonicalExtendedJson
            });
            Console.WriteLine(json);
            // end-write-ejson
        }
    }
}

// start-custom-class
public class MyDocument
{
    public ObjectId Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public long NumViews { get; set; }
}
// end-custom-class