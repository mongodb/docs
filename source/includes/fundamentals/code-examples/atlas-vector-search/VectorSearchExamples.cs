// start-bson-arrays
public class BsonArrayVectors
{
    public BsonArray BsonArrayVector { get; set; }

    public Memory<float> MemoryVector { get; set; }

    public ReadOnlyMemory<float> ReadOnlyMemoryVector { get; set; }

    public float[] FloatArrayVector { get; set; }
}
// end-bson-arrays

// start-binary-vectors
public class BinaryVectors
{
    public BinaryVectorInt8 ValuesInt8 { get; set; }

    public BinaryVectorPackedBit ValuesPackedBit { get; set; }

    public BinaryVectorFloat32 ValuesFloat { get; set; }

    [BinaryVector(BinaryVectorDataType.Int8)]
    public Memory<byte> ValuesByte { get; set; }

    [BinaryVector(BinaryVectorDataType.Float32)]
    public float[] ValuesFloat { get; set; }

}
// end-binary-vectors

// start-binary-int-float-serialize
[BinaryVector(BinaryVectorDataType.Int8)]
public Memory<byte> ValuesByte { get; set; }

[BinaryVector(BinaryVectorDataType.Int8)]
public Memory<sbyte> ValuesSByte { get; set; }

[BinaryVector(BinaryVectorDataType.Float32)]
public float[] ValuesFloat { get; set; }
// end-binary-int-float-serialize

    // start-to-query-vector
var binaryVector = new BinaryVectorInt8(new sbyte[] { 0, 1, 2, 3, 4 });

var queryVector = binaryVector.ToQueryVector();
// end-to-query-vector

// start-array-query-vector
QueryVector v = new QueryVector(new ReadOnlyMemory<float>([1.2f, 2.3f]));
// end-array-query-vector