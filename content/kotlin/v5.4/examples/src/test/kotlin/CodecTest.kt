
import com.mongodb.MongoClientSettings
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.BsonReader
import org.bson.BsonType
import org.bson.BsonWriter
import org.bson.codecs.BsonTypeClassMap
import org.bson.codecs.Codec
import org.bson.codecs.DecoderContext
import org.bson.codecs.EncoderContext
import org.bson.codecs.IntegerCodec
import org.bson.codecs.configuration.CodecProvider
import org.bson.codecs.configuration.CodecRegistries
import org.bson.codecs.configuration.CodecRegistry
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import kotlin.test.assertEquals


// :replace-start: {
//    "terms": {
//       "CONNECTION_URI_PLACEHOLDER": "\"<connection string uri>\""
//    }
// }

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class CodecTest {
    // :snippet-start: example-enum
    enum class PowerStatus {
        ON,
        OFF
    }
    // :snippet-end:

    // :snippet-start: example-codec
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
    // :snippet-end:

    // :snippet-start: example-class
    data class Monolight(
        var powerStatus: PowerStatus = PowerStatus.OFF,
        var colorTemperature: Int? = null
    ) {
        override fun toString(): String = "Monolight [powerStatus=$powerStatus, colorTemperature=$colorTemperature]"
    }
    // :snippet-end:

    // :snippet-start: example-codec-2
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
    // :snippet-end:

    // TODO: is there a more kotlin semantic way to do this?
    // :snippet-start: codec-provider
    class MonolightCodecProvider : CodecProvider {
        @Suppress("UNCHECKED_CAST")
        override fun <T> get(clazz: Class<T>, registry: CodecRegistry): Codec<T>? {
            return if (clazz == Monolight::class.java) {
                MonolightCodec(registry) as Codec<T>
            } else null // Return null when not a provider for the requested class
        }
    }
    // :snippet-end:

    @Test
    fun overrideDefaultCodecTest() {
        class MyEnumCodec : Codec<PowerStatus> {
            override fun encode(writer: BsonWriter, value: PowerStatus, encoderContext: EncoderContext) = writer.writeBoolean(value == PowerStatus.ON)

            override fun decode(reader: BsonReader, decoderContext: DecoderContext): PowerStatus {
                return when (reader.readBoolean()) {
                    true -> PowerStatus.ON
                    false -> PowerStatus.OFF
                }
            }

            override fun getEncoderClass(): Class<PowerStatus> = PowerStatus::class.java
        }
        // :snippet-start: override-default-codec
        val newRegistry = CodecRegistries.fromRegistries(
            CodecRegistries.fromCodecs(MyEnumCodec()),
            MongoClientSettings.getDefaultCodecRegistry()
        )
        // :snippet-end:
        // TODO assertions to test
    }

    @Test
    fun bsonTypeClassMapTest() {
        // :snippet-start: bson-type-class-map
        val bsonTypeClassMap = BsonTypeClassMap()
        val clazz = bsonTypeClassMap[BsonType.ARRAY]
        println("Class name: " + clazz.name)
        // :snippet-end:
        assertEquals(clazz, List::class.java)
    }

    @Test
    fun bsonTypeClassMapReplacementTest() {
        // :snippet-start: bson-type-class-map-replacement
        val replacements = mutableMapOf<BsonType, Class<*>>(BsonType.ARRAY to MutableSet::class.java)
        val bsonTypeClassMap = BsonTypeClassMap(replacements)
        val clazz = bsonTypeClassMap[BsonType.ARRAY]
        println("Class name: " + clazz.name)
        // :snippet-end:
        assertEquals(clazz, MutableSet::class.java)
    }


    @Test
    fun initCodecRegistryTest() {
        // :snippet-start: init-codec-registry
        val codecRegistry = CodecRegistries.fromCodecs(IntegerCodec(), PowerStatusCodec())
        // :snippet-end:
        // :snippet-start: get-codec-from-registry
        val powerStatusCodec = codecRegistry.get(PowerStatus::class.java)
        val integerCodec = codecRegistry.get(Integer::class.java)
        // :snippet-end:
        // Just asserting true b/c if the above doesn't throw an exception, it worked
        assert(true)
    }

    @Test
    fun fullExampleTest() = runBlocking {
        // :snippet-start: full-example
        fun main() = runBlocking {
            // :remove-start:
            val config = getConfig()
            val CONNECTION_URI_PLACEHOLDER = config.connectionUri
            // :remove-end:
            val mongoClient = MongoClient.create(CONNECTION_URI_PLACEHOLDER)
            val codecRegistry = CodecRegistries.fromRegistries(
                CodecRegistries.fromCodecs(IntegerCodec(), PowerStatusCodec()),
                CodecRegistries.fromProviders(MonolightCodecProvider()),
                MongoClientSettings.getDefaultCodecRegistry()
            )
            val database = mongoClient.getDatabase("codecs_example_products")
            val collection = database.getCollection<Monolight>("monolights")
                .withCodecRegistry(codecRegistry)

            // Construct and insert an instance of Monolight
            val myMonolight = Monolight(PowerStatus.ON, 5200)
            collection.insertOne(myMonolight)

            // Retrieve one or more instances of Monolight
            val lights =  collection.find().toList()
            println(lights)
            // :remove-start:
            assertEquals(1, lights.size)
            assertEquals(myMonolight, lights.first())
            collection.drop()
            mongoClient.close()
            // :remove-end:
        }
        // :snippet-end:
        main()
    }
}
// :replace-end:

