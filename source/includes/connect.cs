using MongoDB.Bson;
using MongoDB.Driver;

public class Connect
{
  // Replace the following with your Atlas connection string               
  private static string _mongoConnectionString = "mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority";

  public static void Main(string[] args)
  {
    // Connect to your Atlas cluster
    var client = new MongoClient(_mongoConnectionString);

    // Send a ping to confirm a successful connection
    try {
        var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
        Console.WriteLine("Successfully connected to Atlas");
    } 
    catch (Exception e) { Console.WriteLine(e);}
  }
}
