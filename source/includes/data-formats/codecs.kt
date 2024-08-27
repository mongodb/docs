import com.mongodb.MongoClientSettings
import com.mongodb.kotlin.client.MongoClient
import org.bson.BsonReader
import org.bson.BsonType
import org.bson.BsonWriter
import org.bson.codecs.*
import org.bson.codecs.configuration.CodecProvider
import org.bson.codecs.configuration.CodecRegistries
import org.bson.codecs.configuration.CodecRegistry

// start-powerstatus-enum
enum class PowerStatus {
    ON,
    OFF
}
// end-powerstatus-enum

// start-powerstatus-codec
class PowerStatusCodec : Codec<PowerStatus> {
    override fun encode(
        writer: BsonWriter, value: PowerStatus, encoderContext: EncoderContext
    ) = writer.writeBoolean(value == PowerStatus.ON)

    override fun decode(
        reader: BsonReader, decoderContext: DecoderContext)
    : PowerStatus {
        return when (reader.readBoolean()) {
            true -> PowerStatus.ON
            false -> PowerStatus.OFF
        }
    }

    override fun getEncoderClass(): Class<PowerStatus> = PowerStatus::class.java
}
// end-powerstatus-codec

// start-monolight-class
data class Monolight(
    var powerStatus: PowerStatus = PowerStatus.OFF,
    var colorTemperature: Int? = null
) { 
    override fun toString():
        String = "Monolight { powerStatus: $powerStatus, colorTemperature: $colorTemperature }"
}
// end-monolight-class

// start-monolight-codec
class MonolightCodec(registry: CodecRegistry) : Codec<Monolight> {
    private val powerStatusCodec: Codec<PowerStatus>
    private val integerCodec: Codec<Int>

    init {
        powerStatusCodec = registry[PowerStatus::class.java]
        integerCodec = IntegerCodec()
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
                "powerStatus" -> monolight.powerStatus =
                    powerStatusCodec.decode(reader, decoderContext)

                "colorTemperature" -> monolight.colorTemperature =
                    integerCodec.decode(reader, decoderContext)

                "_id" -> reader.readObjectId()
            }
        }
        reader.readEndDocument()
        return monolight
    }

    override fun getEncoderClass(): Class<Monolight> = Monolight::class.java
}
// end-monolight-codec

// start-monolight-provider
class MonolightCodecProvider : CodecProvider {
    @Suppress("UNCHECKED_CAST")
    override fun <T> get(clazz: Class<T>, registry: CodecRegistry): Codec<T>? {
        return if (clazz == Monolight::class.java) {
            MonolightCodec(registry) as Codec<T>
        } else null // Return null when not a provider for the requested class
    }
}
// end-monolight-provider

fun main() {
    val uri = "<connection string>"

    // start-monolight-operations
    val mongoClient = MongoClient.create(uri)
    val codecRegistry = CodecRegistries.fromRegistries(
        CodecRegistries.fromCodecs(IntegerCodec(), PowerStatusCodec()),
        CodecRegistries.fromProviders(MonolightCodecProvider()),
        MongoClientSettings.getDefaultCodecRegistry()
    )

    val database = mongoClient.getDatabase("codec_test")
    val collection = database.getCollection<Monolight>("monolights")
        .withCodecRegistry(codecRegistry)

    // Insert instances of Monolight
    val monolights = listOf(
        Monolight(PowerStatus.ON, 5200),
        Monolight(PowerStatus.OFF, 3000)
    )
    collection.insertMany(monolights)

    // Retrieve instances of Monolight
    val results =  collection.find()
    results.forEach { l ->
        println(l)
    }
    // end-monolight-operations
}



