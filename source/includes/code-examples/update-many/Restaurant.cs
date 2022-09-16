using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace UsageExamples.UpdateMany;

// start-model
public class Restaurant
{
    public ObjectId Id { get; set; }

    [BsonElement("cuisine")]
    public string Cuisine { get; set; }
}
// end-model
