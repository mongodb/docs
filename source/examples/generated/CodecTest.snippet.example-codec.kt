class PowerStatusCodec : Codec<PowerStatus> {
    override fun encode(writer: BsonWriter, value: PowerStatus, encoderContext: EncoderContext) = writer.writeBoolean(value == PowerStatus.ON)

    override fun decode(reader: BsonReader, decoderContext: DecoderContext): PowerStatus {
        return when (reader.readBoolean()) {
            true -> PowerStatus.ON
            false -> PowerStatus.OFF
        }
    }

    override fun getEncoderClass(): Class<PowerStatus> = PowerStatus::class.java
}
