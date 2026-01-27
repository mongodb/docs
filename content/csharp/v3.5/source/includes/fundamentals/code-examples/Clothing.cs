using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataFormats.Poco;

// start-model
public class Clothing
{
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    [BsonDefaultValue("Generic item")]
    public string Name { get; set; }

    [BsonElement("inStock")]
    public bool InStock { get; set; }

    [BsonElement("price")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal Price { get; set; }

    [BsonElement("colorSelection")]
    public List<string> ColorSelection { get; set; }

    [BsonElement("listedDate")]
    [BsonDateTimeOptions(DateOnly = true)]
    public DateTime ListedDate { get; set; }

    [BsonElement("sizeGuide")]
    public Dictionary<string, string> SizeGuide { get; set; }
}
// end-model