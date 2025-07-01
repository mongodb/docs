using MongoDB.Bson;
using MongoDB.Driver;

public class Program
{
    public static void Main(string[] args)
    {
        // connect to your Atlas cluster
        var client = new MongoClient("<connection-string>");

        // define namespace
        var database = client.GetDatabase("sample_training");
        var collection = database.GetCollection<BsonDocument>("companies");

        // define pipeline
        var pipeline = new BsonDocument[]
        {
        new BsonDocument("$search", new BsonDocument{
          { "text", new BsonDocument{
            { "query", "mobile" }, { "path", "name" },
            { "score", new BsonDocument{
                { "boost", new BsonDocument{ { "value", 1.6 } }}
            }}
          }}
        }),
        new BsonDocument("$project", new BsonDocument{
          { "score", new BsonDocument("$meta", "searchScore") },
          { "_id", 0 }, 
          { "number_of_employees", 1 }, { "founded_year", 1 }, { "name", 1 }
        }),
        new BsonDocument("$addFields", new BsonDocument{
          { "source", "companies" },
          { "source_count", "$$SEARCH_META.count.lowerBound" }
        }),
        new BsonDocument("$limit", 3),
        new BsonDocument("$unionWith", new BsonDocument{
          { "coll", "inspections" },
          { "pipeline", new BsonArray{
            new BsonDocument("$search", new BsonDocument{
                { "text", new BsonDocument{
                  { "query", "mobile" },
                  { "path", "business_name" }
                }}
            }),
            new BsonDocument("$project", new BsonDocument{
                { "score", new BsonDocument("$meta", "searchScore") },
                { "business_name", 1 }, { "address", 1 }, { "_id", 0 }
            }),
            new BsonDocument("$limit", 3),
            new BsonDocument("$set", new BsonDocument{
                { "source", "inspections" },
                { "source_count", "$$SEARCH_META.count.lowerBound" }
            }),
            new BsonDocument("$sort", new BsonDocument{
                { "score", -1 }
            })
          }}
        }),
        new BsonDocument("$facet", new BsonDocument{
          { "allDocs", new BsonArray() },
          { "totalCount", new BsonArray{
            new BsonDocument("$group", new BsonDocument{
                { "_id", "$source" },
                { "firstCount", new BsonDocument("$first", "$source_count") }
            }),
            new BsonDocument("$project", new BsonDocument{
                { "totalCount", new BsonDocument("$sum", "$firstCount") }
            })
          }}
        })
        };

        // run pipeline
        var result = collection.Aggregate<BsonDocument>(pipeline).ToList();

        //print results
        foreach (var document in result)
        {
            Console.WriteLine(document);
        }
    }
}
