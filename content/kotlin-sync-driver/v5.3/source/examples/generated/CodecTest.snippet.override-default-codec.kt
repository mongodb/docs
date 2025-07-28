val newRegistry = CodecRegistries.fromRegistries(
    CodecRegistries.fromCodecs(MyEnumCodec()),
    MongoClientSettings.getDefaultCodecRegistry()
)
