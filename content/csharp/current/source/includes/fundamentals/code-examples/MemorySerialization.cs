using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

public class Program
{
  public static void Main(string[] args)
  {
    // Replace with your connection string
    const string uri = "<connection string>";

    var mongoClient = new MongoClient(uri);
    var database = mongoClient.GetDatabase("db");
    var _collection = database.GetCollection<Line>("lines");

    var line = new Line
    {
      X = new Memory<int>(new[] { 1, 2, 3, 4, 5 }),
      Y = new ReadOnlyMemory<float>(new[] { 1f, 1.41f, 1.73f, 2f, 2.24f })
    };

    var filter = Builders<Line>.Filter.Empty;

    var result = _collection.Find(filter).FirstOrDefault().ToJson();
    Console.WriteLine(result);
  }

}

// start-line-class
public class Line
{
  public ObjectId Id { get; set; }
  public Memory<int> X { get; set; }
  public ReadOnlyMemory<float> Y { get; set; }
}
// end-line-class
