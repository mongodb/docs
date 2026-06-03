using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

namespace Examples.Aggregation.Builders;

// :snippet-start: movie-class
[BsonIgnoreExtraElements]
public class Movie
{
    [BsonId]
    public ObjectId Id { get; set; }
    [BsonElement("title")]
    public string Title { get; set; } = null!;
    [BsonElement("year")]
    [BsonSerializer(typeof(TolerantInt32Serializer))] // :remove:
    public int? Year { get; set; }
    [BsonElement("runtime")]
    public int? Runtime { get; set; }
    [BsonElement("rated")]
    public string? Rated { get; set; }
    [BsonElement("metacritic")]
    public int Metacritic { get; set; }
    [BsonElement("plot")]
    public string? Plot { get; set; }
    [BsonElement("type")]
    public string? Type { get; set; }
    [BsonElement("cast")]
    public string[]? Cast { get; set; }
    [BsonElement("directors")]
    public string[]? Directors { get; set; }
    [BsonElement("writers")]
    public string[]? Writers { get; set; }
    [BsonElement("imdb")]
    public ImdbData? Imdb { get; set; }
}
// :snippet-end:

// :snippet-start: imdb-data-class
[BsonIgnoreExtraElements]
public class ImdbData
{
    [BsonElement("id")]
    public int? ImdbId { get; set; }
    [BsonElement("rating")]
    public double? Rating { get; set; }
    [BsonElement("votes")]
    public int? Votes { get; set; }
}
// :snippet-end:

// Handles documents where "year" is stored as a non-integer string (e.g. "2010è").
internal class TolerantInt32Serializer : SerializerBase<int?>
{
    public override int? Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        var bsonType = context.Reader.GetCurrentBsonType();
        if (bsonType == BsonType.Null) { context.Reader.ReadNull(); return null; }
        if (bsonType == BsonType.Int32) return context.Reader.ReadInt32();
        if (bsonType == BsonType.Int64) return (int?)context.Reader.ReadInt64();
        if (bsonType == BsonType.String)
        {
            var str = context.Reader.ReadString();
            var digits = new string(str.TakeWhile(char.IsDigit).ToArray());
            return digits.Length > 0 && int.TryParse(digits, out var n) ? n : null;
        }
        context.Reader.SkipValue();
        return null;
    }

    public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, int? value)
    {
        if (value.HasValue) context.Writer.WriteInt32(value.Value);
        else context.Writer.WriteNull();
    }
}
