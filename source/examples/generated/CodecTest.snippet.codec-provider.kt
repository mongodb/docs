class MonolightCodecProvider : CodecProvider {
    @Suppress("UNCHECKED_CAST")
    override fun <T> get(clazz: Class<T>, registry: CodecRegistry): Codec<T>? {
        return if (clazz == Monolight::class.java) {
            MonolightCodec(registry) as Codec<T>
        } else null // Return null when not a provider for the requested class
    }
}
