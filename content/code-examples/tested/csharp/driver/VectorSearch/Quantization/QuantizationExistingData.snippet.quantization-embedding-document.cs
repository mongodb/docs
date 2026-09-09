public class QuantizationEmbeddingsFile
{
    [BsonElement("data")]
    public List<QuantizationEmbeddingDocument> Data { get; set; } = null!;
}

public class QuantizationEmbeddingDocument
{
    [BsonElement("text")]
    public string Text { get; set; } = null!;

    [BsonElement("embeddings_float32")]
    public BinaryVectorFloat32 EmbeddingsFloat32 { get; set; } = null!;

    [BsonElement("embeddings_int8")]
    public BinaryVectorInt8 EmbeddingsInt8 { get; set; } = null!;

    [BsonElement("embeddings_int1")]
    public BinaryVectorPackedBit EmbeddingsInt1 { get; set; } = null!;
}
