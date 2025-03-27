using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Core;
using MongoDB.Driver.Search;

public class LookupWithSearch{

  static void Main(string[] args) {// allow automapping of the camelCase database fields to our MovieDocument
    var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
    ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

    // connect to your Atlas cluster
    var mongoClient = new MongoClient("<connection-string>");
    
    // define namespace
    var analyticsDatabase = mongoClient.GetDatabase("sample_analytics");
    var accountsCollection = analyticsDatabase.GetCollection<AccountDocument>("accounts");
    var customersCollection = analyticsDatabase.GetCollection<CustomerDocument>("customers");

    // define pipeline stages
    var lookupStage = new BsonDocument("$lookup", new BsonDocument{
      { "from", "accounts" }, { "localField", "accounts" }, { "foreignField", "account_id" }, 
      { "as", "purchases" }, { "pipeline", new BsonArray{
        new BsonDocument("$search", new BsonDocument{
          { "index", "lookup-with-search-tutorial" }, { "compound", new BsonDocument{
            { "must", new BsonArray{
              new BsonDocument("queryString", new BsonDocument{
                { "defaultPath", "products" }, { "query", "products: (CurrencyService AND InvestmentStock)" }
              })
            }}, 
            { "should", new BsonArray{
              new BsonDocument("range", new BsonDocument{
                { "path", "limit" }, { "gte", 5000 }, { "lte", 10000 }
              })
            }}
          }}
        })
      }}
    });
    var projectStage1 = new BsonDocument("$project", new BsonDocument("_id", 0));
    var limitStage = new BsonDocument("$limit", 5);
    var projectStage2 = new BsonDocument("$project", new BsonDocument{
      { "_id", 0 }, { "address", 0 }, { "birthdate", 0 }, { "username", 0 }, { "tier_and_details", 0 }
    });
    var aggregationPipeline = new List<BsonDocument> {lookupStage, projectStage1, limitStage, projectStage2};

    // run pipeline
    var results = customersCollection.Aggregate<BsonDocument>(aggregationPipeline).ToList();

    // print results
    foreach (var acct in results) {
        Console.WriteLine(acct.ToJson());
    }
  }            
}

// define fields in the accounts collection
[BsonIgnoreExtraElements]
public class AccountDocument {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public string Id { get; set; }

    [BsonElement("account_id")]
    public int AccountId { get; set; }

    [BsonElement("limit")]
    public int Limit { get; set; }
}

// define fields in the customers collection
[BsonIgnoreExtraElements]
public class CustomerDocument {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("active")]
    public bool Active { get; set; }

    [BsonElement("accounts")]
    public List<int> Accounts { get; set; }
}

// define new array field for matching documents
public class CustomerLookedUp: CustomerDocument{
    public List<CustomerDocument> Purchases { get; set; }
}