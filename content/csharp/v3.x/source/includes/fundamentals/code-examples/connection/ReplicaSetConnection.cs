// Connects to a specific replica set by using a URI

// start-replica-set-connection-rs-name
using MongoDB.Driver;

// Sets the connection URI than includes the replica set name
const string connectionUri = "mongodb://host1:27017/?replicaSet=sampleRS";

// Creates a new client and connects to the server
var client = new MongoClient(connectionUri);
// end-replica-set-connection-rs-name

// start-replica-set-connection-list
using MongoDB.Driver;

// Sets the connection URI than includes the list of hosts in the replica set
const string connectionUri = "mongodb://host1:27017,host2:27017,host3:27017";

// Creates a new client and connects to the server
var client = new MongoClient(connectionUri);
// end-replica-set-connection-list

// start-replica-set-direct-connection-string
using MongoDB.Driver;

const string connectionUri = "mongodb://host1:27017/?directConnection=true";
var client = new MongoClient(connectionUri);
// end-replica-set-direct-connection-string

// start-replica-set-direct-connection-settings
using MongoDB.Driver;

var settings = MongoClientSettings.FromConnectionString("mongodb://host1:27017");
settings.DirectConnection = true;
var client = new MongoClient(settings);
// end-replica-set-direct-connection-settings

