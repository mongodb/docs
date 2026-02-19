using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

public class Cursor
{
    // Replace with your connection string
    private const string MongoConnectionString = "<connection URI>";

    public static async Task Main(string[] args)
    {   
        var mongoClient = new MongoClient(MongoConnectionString);
        var database = mongoClient.GetDatabase("sample_restaurants");
        var collection = database.GetCollection<Restaurant>("restaurants");

        {
            // start-cursor-iterate
            var filter = Builders<Restaurant>.Filter.Eq(r => r.Name, "Starbucks");
            
            using (var cursor = collection.FindSync(filter))
            {
                while (cursor.MoveNext())
                {
                    foreach (var restaurant in cursor.Current)
                    {
                        Console.WriteLine(restaurant.Name);
                    }
                }
            }
            // end-cursor-iterate
        }

        {
            // start-cursor-iterate-async
            var filter = Builders<Restaurant>.Filter.Eq(r => r.Name, "Starbucks");
            
            using (var cursor = await collection.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    foreach (var restaurant in cursor.Current)
                    {
                        Console.WriteLine(restaurant.Name);
                    }
                }
            }
            // end-cursor-iterate-async
        }

        {
            // start-cursor-iterate-to-cursor
            var filter = Builders<Restaurant>.Filter.Eq(r => r.Name, "Starbucks");
            
            using (var cursor = collection.Find(filter).ToCursor())
            {
                while (cursor.MoveNext())
                {
                    foreach (var restaurant in cursor.Current)
                    {
                        Console.WriteLine(restaurant.Name);
                    }
                }
            }
            // end-cursor-iterate-to-cursor
        }

        {
            // start-cursor-iterate-to-cursor-async
            var filter = Builders<Restaurant>.Filter.Eq(r => r.Name, "Starbucks");
            
            using (var cursor = await collection.Find(filter).ToCursorAsync())
            {
                while (await cursor.MoveNextAsync())
                {
                    foreach (var restaurant in cursor.Current)
                    {
                        Console.WriteLine(restaurant.Name);
                    }
                }
            }
            // end-cursor-iterate-to-cursor-async
        }

        {
            // start-cursor-to-list
            var filter = Builders<Restaurant>.Filter.Eq(r => r.Name, "Dunkin' Donuts");
            var results = collection.FindSync(filter).ToList();
            // end-cursor-to-list
        }

        {
            // start-cursor-to-list-async
            var filter = Builders<Restaurant>.Filter.Eq(r => r.Name, "Dunkin' Donuts");
            var results = (await collection.FindAsync(filter)).ToList();
            // end-cursor-to-list-async
        }

        {
            // start-tailable-cursor
            var filter = Builders<Restaurant>.Filter.Eq(r => r.Name, "Dunkin' Donuts");
            var options = new FindOptions<Restaurant>
            {
                CursorType = CursorType.TailableAwait
            };

            using (var cursor = collection.FindSync(filter, options))
            {
                while (cursor.MoveNext())
                {
                    foreach (var restaurant in cursor.Current)
                    {
                        Console.WriteLine(restaurant.Name);
                    }
                }
            }
            // end-tailable-cursor
        }

        {
            {
                // start-tailable-cursor-async
                var filter = Builders<Restaurant>.Filter.Eq(r => r.Name, "Dunkin' Donuts");
                var options = new FindOptions<Restaurant>
                {
                    CursorType = CursorType.TailableAwait
                };

                using (var cursor = await collection.FindAsync(filter, options))
                {
                    while (await cursor.MoveNext())
                    {
                        foreach (var restaurant in cursor.Current)
                        {
                            Console.WriteLine(restaurant.Name);
                        }
                    }
                }
                // end-tailable-cursor-async
            }
        }

    }
}

// start-restaurant-class
[BsonIgnoreExtraElements]
public class Restaurant
{
    public ObjectId Id { get; set; }
        
    [BsonElement("name")]
    public string Name { get; set; }
}
// end-restaurant-class