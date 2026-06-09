using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Core;
using MongoDB.Driver.Search;

public class MaterializedViewSearchQuery {

  static void Main(string[] args) {
    // allow automapping of the camelCase database fields
    var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
    ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

    // connect to your MongoDB deployment
    var mongoClient = new MongoClient("<connection-string>");
    
    // define namespace
    var suppliesDatabase = mongoClient.GetDatabase("sample_supplies");
    var transactionsCollection = suppliesDatabase.GetCollection<BsonDocument>("monthlyPhoneTransactions");

    // define pipeline stages
    var searchStage = new BsonDocument("$search", new BsonDocument{
      { "index", "monthlySalesIndex" },
      { "range", new BsonDocument{
        { "gt", 10000 },
        { "path", new BsonArray{ "sales_price" } }
      }}
    });
    
    var countStage = new BsonDocument("$count", "months_w_over_10000");
    
    var aggregationPipeline = new List<BsonDocument> { searchStage, countStage };

    // run pipeline
    var results = transactionsCollection.Aggregate<BsonDocument>(aggregationPipeline).ToList();

    // print results
    foreach (var result in results) {
        Console.WriteLine(result.ToJson());
    }
  }            
}

// Define a class to represent the materialized view document structure if needed
[BsonIgnoreExtraElements]
public class MonthlyTransactionDocument {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public string Id { get; set; }

    [BsonElement("month")]
    public string Month { get; set; }

    [BsonElement("sales_price")]
    public double SalesPrice { get; set; }
}
