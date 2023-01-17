using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CSharpExamples.UsageExamples;

public class Address
{
    public string Building { get; set; }

    [BsonElement("coord")]
    public float[] Coordinates { get; set; }

    public string Street { get; set; }

    [BsonElement("zipcode")]
    public string ZipCode { get; set; }
}