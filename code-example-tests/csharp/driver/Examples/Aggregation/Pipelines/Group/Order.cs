using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Examples.Aggregation.Pipelines.Group;

// :snippet-start: model
public class Order
{
    [BsonId]
    public ObjectId Id { get; set; }

    public string CustomerId { get; set; } = "";
    public DateTime OrderDate { get; set; }
    public int Value { get; set; }
}
// :snippet-end:
