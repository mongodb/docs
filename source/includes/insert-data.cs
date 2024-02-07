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
    
    // Create new documents
    var newPerson = new List<Person>() {
        new Person {
            Name = new Name { First = "Alan", Last = "Turing" },
            Birth = new DateTime(1912, 5, 23), // May 23, 1912                                                                                                                            
            Death = new DateTime(1954, 5, 7),  // May 7, 1954                                                                                                                                 
            Contribs = new string[] {"Turing machine", "Turing test", "Turingery"},
            Views = 1250000
        },new Person {
            Name = new Name { First = "Grace", Last = "Hopper" },
            Birth = new DateTime(1906, 12, 9), // Dec 9, 1906                                                                                                                            
            Death = new DateTime(1992, 1, 1),  // Jan 1, 1992                                                                                                                                 
            Contribs = new string[] {"Mark I", "UNIVAC", "COBOL"},
            Views = 3860000
        }
    };
    
    // Insert the documents into the specified collection
    peopleCollection.InsertMany(newPerson);

    // Find the document
    var filter = Builders<Person>.Filter
      .Eq(person => person.Name.Last, "Turing");

    var document = peopleCollection.Find(filter).FirstOrDefault();

    // Print the result
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

