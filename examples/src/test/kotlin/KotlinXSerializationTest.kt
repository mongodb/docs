
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Filters.eq
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Contextual
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.datetime.*
import kotlinx.serialization.KSerializer
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.encodeToJsonElement
import org.bson.BsonDateTime
import org.bson.Document
import org.bson.codecs.configuration.CodecRegistries
import org.bson.codecs.kotlinx.BsonConfiguration
import org.bson.codecs.kotlinx.BsonDecoder
import org.bson.codecs.kotlinx.BsonEncoder
import org.bson.codecs.kotlinx.BsonNamingStrategy
import org.bson.codecs.kotlinx.KotlinSerializerCodec
import org.bson.codecs.kotlinx.ObjectIdSerializer
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.util.Date
import kotlin.test.assertTrue

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class KotlinXSerializationTest {

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("serialization")

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                database.drop()
                client.close()
            }
        }
    }


    @Test
    fun basicEncodeToJsonTest() = runBlocking {
        @Serializable
        data class PaintOrder(
            @SerialName("_id")
            val id: Int,
            val color: String,
            val qty: Int
        )

        val paintOrder = PaintOrder(1, "red", 5)
        val collection = database.getCollection<PaintOrder>("orders")

        val insertOneResult = collection.insertOne(paintOrder)
        println(insertOneResult)
        println(Json.encodeToJsonElement(paintOrder)) // Only works if you don't have BSON properties (e.g. ObjectId)

        assertEquals(paintOrder.id, 1)

        collection.drop()
    }
    @Test
    fun basicSerializationTest() = runBlocking {
        // :snippet-start: basic-serialization
        @Serializable
        data class PaintOrder(
            @SerialName("_id") // Use instead of @BsonId
            @Contextual val id: ObjectId?,
            val color: String,
            val qty: Int,
            @SerialName("brand")
            val manufacturer: String = "Acme" // Use instead of @BsonProperty
        )
        // :snippet-end:

        val collection = database.getCollection<PaintOrder>("orders")
        val paintOrder = PaintOrder(ObjectId(), "red", 5, "Acme")
        val insertOneResult = collection.insertOne(paintOrder)
        assertEquals(paintOrder.id, insertOneResult.insertedId?.asObjectId()?.value)

        collection.drop()
    }

    @OptIn(ExperimentalSerializationApi::class)
    @Test
    fun customSerializationTest() = runBlocking {
        @Serializable
        data class PaintOrder(
            @SerialName("_id")
            @Contextual val id: @Serializable(with = ObjectIdSerializer::class) ObjectId?,
            val color: String,
            val qty: Int,
            @SerialName("brand")
            val manufacturer: String = "Acme"
        )

        val collection = database.getCollection<PaintOrder>("orders2")

        // :snippet-start: custom-serialization
        val myCustomCodec = KotlinSerializerCodec.create<PaintOrder>(
            bsonConfiguration = BsonConfiguration(encodeDefaults = false)
        )

        val registry = CodecRegistries.fromRegistries(
            CodecRegistries.fromCodecs(myCustomCodec), collection.codecRegistry
        )
        // :snippet-end:

        val paint = PaintOrder(ObjectId(), "red", 5)
        val insertOneResult = collection.withCodecRegistry(registry).insertOne(paint)
        assertEquals(paint.id, insertOneResult.insertedId?.asObjectId()?.value)
        val result = collection.withDocumentClass<Document>().find().first().toJson()
        assertFalse(result.contains("manufacturer"))
        collection.drop()
    }

    @Test
    fun snakeCaseNamingTest() = runBlocking {
        @Serializable
        data class PaintOrder(
            val ManufacturerName: String,
            val QuantityOfCans: Int,
        )

        val collection = database.getCollection<PaintOrder>("orders2")

        // :snippet-start: snake-case-naming
        val myCustomCodec = KotlinSerializerCodec.create<PaintOrder>(
            bsonConfiguration = BsonConfiguration(bsonNamingStrategy = BsonNamingStrategy.SNAKE_CASE)
        )

        val registry = CodecRegistries.fromRegistries(
            CodecRegistries.fromCodecs(myCustomCodec), collection.codecRegistry
        )
        // :snippet-end:

        val paint = PaintOrder("Acme", 10)
        collection.withCodecRegistry(registry).insertOne(paint)
        val result = collection.withDocumentClass<Document>().find().first().toJson()
        assertTrue(result.contains("quantity_of_cans"))
        assertFalse(result.contains("ManufacturerName"))
        collection.drop()
    }

    // :snippet-start: kserializer
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
    // :snippet-end:

    @Test
    fun customKSerializerTest() = runBlocking {
        // :snippet-start: kserializer-dataclass
        @Serializable
        data class PaintOrder(
            val color: String,
            val qty: Int,
            @Serializable(with = InstantAsBsonDateTime::class)
            val orderDate: Instant,
        )
        // :snippet-end:

        val collection = database.getCollection<PaintOrder>("orders")
        val paintOrder = PaintOrder("magenta", 5, Instant.parse("2024-01-15T00:00:00Z"))
        val insertOneResult = collection.insertOne(paintOrder)

        val resultsFlow = collection.withDocumentClass<Document>()
            .find(eq(PaintOrder::color.name, "magenta"))
            .firstOrNull()

        if (resultsFlow != null) {
            assertEquals(resultsFlow["orderDate"], Date.from(java.time.Instant.parse("2024-01-15T00:00:00Z")))
        }

        collection.drop()
    }

    // :snippet-start: polymorphic-dataclasses
    @Serializable
    sealed interface Person {
        val name: String
    }

    @Serializable
    data class Student(
        @Contextual
        @SerialName("_id")
        val id: ObjectId,
        override val name: String,
        val grade: Int,
    ) : Person

    @Serializable
    data class Teacher(
        @Contextual
        @SerialName("_id")
        val id: ObjectId,
        override val name: String,
        val department: String,
    ) : Person
    // :snippet-end:
    @Test
    fun polymorphicSerializationTest() = runBlocking {

        // :snippet-start: polymorphic-example
        val collection = database.getCollection<Person>("school")

        val teacherDoc = Teacher(ObjectId(), "Vivian Lee", "History")
        val studentDoc = Student(ObjectId(), "Kate Parker", 10)

        collection.insertOne(teacherDoc)
        collection.insertOne(studentDoc)

        println("Retrieving by using data classes")
        collection.withDocumentClass<Teacher>()
            .find(Filters.exists("department"))
            .first().also { println(it) }

        collection.withDocumentClass<Student>()
            .find(Filters.exists("grade"))
            .first().also { println(it) }

        println("\nRetrieving by using Person interface")
        val resultsFlow = collection.withDocumentClass<Person>().find()
        resultsFlow.collect { println(it) }

        println("\nRetrieving as Document type")
        val resultsDocFlow = collection.withDocumentClass<Document>().find()
        resultsDocFlow.collect { println(it) }
        // :snippet-end:

        if (resultsFlow != null) {
            assertTrue(resultsFlow.firstOrNull() is Teacher)
        }

        collection.drop()
    }

    // :snippet-start: datetime-data-class
    @Serializable
    data class Appointment(
        val name: String,
        @Contextual val date: LocalDate,
        val time: LocalTime,
    )
    // :snippet-end:

    @Test
    fun dateTimeSerializationTest() = runBlocking {

        // :snippet-start: datetime-insertone
        val collection = database.getCollection<Appointment>("appointments")

        val apptDoc = Appointment(
            "Daria Smith",
            LocalDate(2024, 10, 15),
            LocalTime(hour = 11, minute = 30)
        )

        collection.insertOne(apptDoc)
        // :snippet-end:

        assertEquals(apptDoc.name, "Daria Smith")

        collection.drop()
    }

}

