// Modifies a BSON document by using the C# driver

using MongoDB.Driver;

namespace DataFormats.Bson;

public class Bson
{
    public static void Main(string[] args)
    {
        // Creates a new document, adds "restaurant_id" field, removes the
        // "cuisine" field and sets the "name" value
        //start-create
        var newRestaurant = new BsonDocument
        {
            { "address", new BsonDocument
                {
                    { "street", "Pizza St" },
                    { "zipcode", "10003" }
                }
            },
            { "coord", new BsonArray
                {-73.982419, 41.579505 }
            },
            { "cuisine", "Pizza" },
            { "name", "Mongo's Pizza"}
        };
        newRestaurant.Add(new BsonElement("restaurant_id", "12345"));
        newRestaurant.Remove("cuisine");
        newRestaurant.Set("name", "Mongo's Pizza Palace");
        //end-change
    }
}
