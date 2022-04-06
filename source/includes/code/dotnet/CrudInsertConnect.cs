using System.Security.Cryptography;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

var client = new MongoClient(uri);

// database and collection code goes here
// insert code goes here
// display insert ids code goes here
