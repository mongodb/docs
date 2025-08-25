using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Realms;

namespace Examples.Models
{
    // :snippet-start: plant-class
    public partial class Plant : IRealmObject
    {
        //:remove-start:
        [PrimaryKey]
        [MapTo("_id")]
        //:remove-end:
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [BsonElement("name")]
        public string? Name { get; set; }

        [BsonElement("sunlight")]
        [BsonRepresentation(BsonType.String)]
        public string? Sunlight { get; set; }

        [BsonElement("color")]
        [BsonRepresentation(BsonType.String)]
        public string? Color { get; set; }

        [BsonElement("type")]
        [BsonRepresentation(BsonType.String)]
        public string? Type { get; set; }

        [BsonElement("_partition")]
        public string? Partition { get; set; }
    }
    public enum Sunlight
    {
        Full,
        Partial
    }
    public enum PlantColor
    {
        White,
        Green,
        Yellow,
        Purple
    }
    public enum PlantType
    {
        Perennial,
        Annual
    }
    // :snippet-end:
}
