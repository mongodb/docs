using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class DivideQueryResults
{
    public static void Main(string[] args)
    {
        // connect to your Atlas cluster
        var client = new MongoClient("<connection-string>");

        // define namespace
        var database = client.GetDatabase("sample_mflix");
        var collection = database.GetCollection<BsonDocument>("movies");

        // define pipeline
        var pipeline = new BsonDocument[]{
          new BsonDocument("$search", new BsonDocument{
            { "index", "pagination-tutorial" }, { "text", new BsonDocument{
                { "query", "tom hanks" }, 
                { "path", "cast" }
            } }
          }),
          new BsonDocument("$project", new BsonDocument{
            { "_id", 0 }, { "title", 1 }, { "cast", 1 }
          }),
          new BsonDocument("$set", new BsonDocument("score", new BsonDocument("$meta", "searchScore"))),
          new BsonDocument("$facet", new BsonDocument{
            { "rows", new BsonArray
              {
                new BsonDocument("$skip", 10),
                new BsonDocument("$limit", 10)
              } 
            }, 
            { "totalRows", new BsonArray
              {
                new BsonDocument("$replaceWith", "$$SEARCH_META"),
                new BsonDocument("$limit", 1)
              } 
            }
          }),
          new BsonDocument("$set", new BsonDocument(
            "totalRows", new BsonDocument("$arrayElemAt", new BsonArray
              {
                "$totalRows", 0
              }
            )
          ))
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
