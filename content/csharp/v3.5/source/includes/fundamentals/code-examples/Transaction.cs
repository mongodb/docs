using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

public class BookTransaction
{
    // Replace with your connection string
    private const string MongoConnectionString = "<YOUR_CONNECTION_STRING>";

    public static void Main(string[] args)
    {   
        // Establishes the connection to MongoDB and accesses the library database
        var mongoClient = new MongoClient(MongoConnectionString);
        var database = mongoClient.GetDatabase("library");

        // Cleans up the collections we'll be using
        Setup(database);

        // begin-transaction
        var books = database.GetCollection<Book>("books");
        var films = database.GetCollection<Film>("films");
        
        // Begins transaction
        using (var session = mongoClient.StartSession())
        {
            session.StartTransaction();

            try
            {
                // Creates sample data
                var book = new Book
                {
                    Title = "Beloved",
                    Author = "Toni Morrison",
                    InStock = true
                };

                var film = new Film
                {
                    Title = "Star Wars",
                    Director = "George Lucas",
                    InStock = true
                };

                // Inserts sample data
                books.InsertOne(session, book);
                films.InsertOne(session, film);

                // Commits our transaction
                session.CommitTransaction();
            } 
            catch (Exception e)
            {
                Console.WriteLine("Error writing to MongoDB: " + e.Message);
                return;
            }

            // Prints a success message if no error thrown
            Console.WriteLine("Successfully committed transaction!");
        }
        // end-transaction
    }

    public static void Setup(IMongoDatabase database)
    {
        database.DropCollection("books");
        database.CreateCollection("books");

        database.DropCollection("films");
        database.CreateCollection("films");
    }
}

public class Book
{
    public ObjectId Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }

    [BsonElement("author")]
    public string Author { get; set; }

    [BsonElement("inStock")]
    public bool InStock { get; set; }
}

public class Film
{
    public ObjectId Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }

    [BsonElement("director")]
    public string Director { get; set; }

    [BsonElement("inStock")]
    public bool InStock { get; set; }
}
