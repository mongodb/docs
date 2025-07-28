val myCustomCodec = KotlinSerializerCodec.create<PaintOrder>(
    bsonConfiguration = BsonConfiguration(encodeDefaults = false)
)

val registry = CodecRegistries.fromRegistries(
    CodecRegistries.fromCodecs(myCustomCodec), collection.codecRegistry
)
