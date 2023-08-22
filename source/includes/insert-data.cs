using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

public class InsertData
{
  // Replace the following with your Atlas connection string      
  private const string MongoConnectionString = "<connection-string>";

  public static void Main(string[] args)
  {
    // Connect to your Atlas cluster
    var client = new MongoClient(MongoConnectionString);

    // Reference the database and collection to use
    var database = client.GetDatabase("gettingStarted");
    var peopleCollection = database.GetCollection<Person>("people");
    
    // Create a new document
    Person newPerson = new()
    {
        Name = new Name
        { 
          First = "Alan",
          Last = "Turing"
        },
        Birth = new DateTime(1912, 5, 23), // May 23, 1912                                                                                                                            
        Death = new DateTime(1954, 5, 7),  // May 7, 1954                                                                                                                                 
        Contribs = new string[] {"Turing machine", "Turing test", "Turingery"},
        Views = 1250000
    };
    
    // Insert the document into the specified collection
    peopleCollection.InsertOne(newPerson);

    // Find and return the document
    var filter = Builders<Person>.Filter
      .Eq(person => person.Name.Last, "Turing");

    var document = peopleCollection.Find(filter).FirstOrDefault();
    Console.WriteLine($"Document found:\n{document.ToBsonDocument()}");
  }
}

public class Person
{
    public ObjectId Id { get; set; }
    public Name Name { get; set; }
    public DateTime Birth { get; set; }
    public DateTime Death { get; set; }
    public string[] Contribs { get; set; }
    public int Views { get; set; }
}
public class Name
{
    public string First { get; set; }
    public string Last { get; set; }
}
