object InstantAsBsonDateTime : KSerializer<Instant> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("InstantAsBsonDateTime", PrimitiveKind.LONG)

    override fun serialize(encoder: Encoder, value: Instant) {
        when (encoder) {
            is BsonEncoder -> encoder.encodeBsonValue(BsonDateTime(value.toEpochMilliseconds()))
            else -> throw SerializationException("Instant is not supported by ${encoder::class}")
        }
    }

    override fun deserialize(decoder: Decoder): Instant {
        return when (decoder) {
            is BsonDecoder -> Instant.fromEpochMilliseconds(decoder.decodeBsonValue().asDateTime().value)
            else -> throw SerializationException("Instant is not supported by ${decoder::class}")
        }
    }
}
