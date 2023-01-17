using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CSharpExamples.UsageExamples.DeleteMany;

// start-model
public class Restaurant
{
    public ObjectId Id { get; set; }

    public string Name { get; set; }

    [BsonElement("restaurant_id")]
    public string RestaurantId { get; set; }

    public string Cuisine { get; set; }

    public Address Address { get; set; }

    public string Borough { get; set; }

    public List<GradeEntry> Grades { get; set; }
}
// end-model