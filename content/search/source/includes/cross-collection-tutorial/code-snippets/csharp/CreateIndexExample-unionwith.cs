using MongoDB.Bson;
using MongoDB.Driver;

// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_training");

// Create index for the companies collection
var companiesCollection = db.GetCollection<BsonDocument>("companies");

// Create the MongoDB Search index definition for companies
var companiesIndex = new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true }
      }
    }
  });

var companiesResult = companiesCollection.SearchIndexes.CreateOne(companiesIndex);
Console.WriteLine($"New index name for companies: {companiesResult}");

// Create index for the inspections collection
var inspectionsCollection = db.GetCollection<BsonDocument>("inspections");

// Create the MongoDB Search index definition for inspections
var inspectionsIndex = new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true }
      }
    }
  });

var inspectionsResult = inspectionsCollection.SearchIndexes.CreateOne(inspectionsIndex);
Console.WriteLine($"New index name for inspections: {inspectionsResult}");
