using MongoDB.Driver;

// Replace the placeholder with your connection string.
var uri = "<connection string>";

try
{
    var client = new MongoClient(uri);
    // start example code here

    // end example code here
}
catch (MongoException me)
{
    Console.Error.WriteLine(me.Message);
}
