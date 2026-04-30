using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Examples.Aggregation.Linq;

public class Restaurant
{
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = "";

    [BsonElement("cuisine")]
    public string Cuisine { get; set; } = "";
}
