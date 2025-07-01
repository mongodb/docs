using MongoDB.Bson;
using MongoDB.Driver;

public class Connect
{
  // Replace the following with your Atlas connection string               
  private const string MongoConnectionString = "mongodb+srv://<db_username>:<db_password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority";

  public static void Main(string[] args)
  {
    // Connect to your Atlas cluster
    var client = new MongoClient(MongoConnectionString);

    // Send a ping to confirm a successful connection
    try {
        var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
        Console.WriteLine("Successfully connected to Atlas");
    } 
    catch (Exception e) { Console.WriteLine(e);}
  }
}
