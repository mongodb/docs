using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace VectorSearch;

public class Listing
{
    [BsonId]
    public ObjectId Id { get; set; }
    
    public string Name { get; set; }
    
    public string Summary { get; set; }
    
    public Address Address { get; set; }
    
    public decimal Price { get; set; }
    
    public int Bedrooms { get; set; }
    
    [BsonIgnore]
    public double Score { get; set; }
}