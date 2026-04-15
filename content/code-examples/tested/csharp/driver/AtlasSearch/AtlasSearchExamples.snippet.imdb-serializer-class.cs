[BsonIgnoreExtraElements]
public class Imdb
{
    [BsonSerializer(typeof(FlexibleDoubleSerializer))]
    public double Rating { get; set; }

    [BsonSerializer(typeof(FlexibleInt32Serializer))]
    public int Votes { get; set; }

    public int Id { get; set; }
}
