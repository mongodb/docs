using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace VectorSearch;

public class Address
{
    public string Street { get; set; }
    
    public string Country { get; set; }
    
    [BsonExtraElements]
    public BsonDocument ExtraElements {get; set;}
}