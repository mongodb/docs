using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class Program
{
    public static void Main(string[] args)
    {
        // connect to your Atlas cluster
        string connectionString = "<connection-string>";
        var client = new MongoClient(connectionString);
        
        // define namespace
        var database = client.GetDatabase("sample_training");
        var collection = database.GetCollection<BsonDocument>("companies");
        
        // define pipeline stage
        var searchStage1 = new BsonDocument("$search", new BsonDocument{{ "text", new BsonDocument
            {{ "query", "Mobile" },{ "path", "name" }}
        }});
        var projectStage1 = new BsonDocument("$project", new BsonDocument{
            { "score", new BsonDocument("$meta", "searchScore") },
            { "_id", 0 },{ "number_of_employees", 1 },{ "founded_year", 1 },{ "name", 1 }
        });
        var setStage1 = new BsonDocument("$set", new BsonDocument{{ "source", "companies" }});
        var limitStage1 = new BsonDocument("$limit", 3);
        
        // define subpipeline
        var searchStage2 = new BsonDocument("$search", new BsonDocument{{ "text", new BsonDocument
            {{ "query", "Mobile" },{ "path", "business_name" }}
        }});
        var setStage2 = new BsonDocument("$set", new BsonDocument{ { "source", "inspections" } });
        var projectStage2 = new BsonDocument("$project", new BsonDocument{
            { "score", new BsonDocument("$meta", "searchScore") }, 
            { "source", 1 }, { "_id", 0 }, { "business_name", 1 }, { "address", 1 }
        });
        var limitStage2 = new BsonDocument("$limit", 3);
        var sortStage2 = new BsonDocument("$sort", new BsonDocument{{ "score", -1 }});
        var unionWithPipeline = new List<BsonDocument>{searchStage2, setStage2, projectStage2, limitStage2, sortStage2};
        var unionWithStage = new BsonDocument("$unionWith", new BsonDocument
        {
            { "coll", "inspections" },
            { "pipeline", new BsonArray(unionWithPipeline) }
        });
        var aggregationPipeline = new List<BsonDocument> {searchStage1, projectStage1, setStage1, limitStage1,unionWithStage};
        
        // run pipeline
        var result = collection.Aggregate<BsonDocument>(aggregationPipeline).ToList();
        
        //print results
        foreach (var document in result)
        {
            Console.WriteLine(document);
        }
    }
}
