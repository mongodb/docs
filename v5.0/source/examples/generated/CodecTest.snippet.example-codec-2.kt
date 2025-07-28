class MonolightCodec(registry: CodecRegistry) : Codec<Monolight> {
    private val powerStatusCodec: Codec<PowerStatus>
    private val integerCodec: Codec<Int>

    init {
        powerStatusCodec = registry[PowerStatus::class.java]
        integerCodec = registry.get(Int::class.java)
    }

    override fun encode(writer: BsonWriter, value: Monolight, encoderContext: EncoderContext) {
        writer.writeStartDocument()
        writer.writeName("powerStatus")
        powerStatusCodec.encode(writer, value.powerStatus, encoderContext)
        writer.writeName("colorTemperature")
        integerCodec.encode(writer, value.colorTemperature, encoderContext)
        writer.writeEndDocument()
    }

    override fun decode(reader: BsonReader, decoderContext: DecoderContext): Monolight {
        val monolight = Monolight()
        reader.readStartDocument()
        while (reader.readBsonType() != BsonType.END_OF_DOCUMENT) {
            when (reader.readName()) {
                "powerStatus" -> monolight.powerStatus = powerStatusCodec.decode(reader, decoderContext)
                "colorTemperature" -> monolight.colorTemperature = integerCodec.decode(reader, decoderContext)
                "_id" -> reader.readObjectId()
            }
        }
        reader.readEndDocument()
        return monolight
    }

    override fun getEncoderClass(): Class<Monolight> = Monolight::class.java
}
