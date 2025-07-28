val myCustomCodec = KotlinSerializerCodec.create<PaintOrder>(
    bsonConfiguration = BsonConfiguration(bsonNamingStrategy = BsonNamingStrategy.SNAKE_CASE)
)

val registry = CodecRegistries.fromRegistries(
    CodecRegistries.fromCodecs(myCustomCodec), collection.codecRegistry
)
