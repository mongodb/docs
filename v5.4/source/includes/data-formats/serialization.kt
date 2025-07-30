import com.mongodb.client.model.Filters
import com.mongodb.client.model.Filters.*
import com.mongodb.client.model.Updates.*
import com.mongodb.kotlin.client.MongoClient
import kotlinx.serialization.*
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import org.bson.BsonDateTime
import org.bson.Document
import org.bson.codecs.kotlinx.BsonDecoder
import org.bson.codecs.kotlinx.BsonEncoder
import java.time.Instant
import org.bson.codecs.configuration.CodecRegistries
import org.bson.codecs.kotlinx.BsonConfiguration
import org.bson.codecs.kotlinx.KotlinSerializerCodec
import org.bson.types.ObjectId
import kotlinx.serialization.Serializable

// start-kserializer
object InstantAsBsonDateTime : KSerializer<Instant> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("InstantAsBsonDateTime", PrimitiveKind.LONG)

    override fun serialize(encoder: Encoder, value: Instant) {
        when (encoder) {
            is BsonEncoder -> encoder.encodeBsonValue(BsonDateTime(value.toEpochMilli()))
            else -> throw SerializationException("Instant is not supported by ${encoder::class}")
        }
    }

    override fun deserialize(decoder: Decoder): Instant {
        return when (decoder) {
            is BsonDecoder -> Instant.ofEpochMilli(decoder.decodeBsonValue().asDateTime().value)
            else -> throw SerializationException("Instant is not supported by ${decoder::class}")
        }
    }
}
// end-kserializer

// start-ks-dataclass
@Serializable
data class PaintOrder(
    val color: String,
    val qty: Int,
    @Serializable(with = InstantAsBsonDateTime::class)
    val orderDate: Instant,
)
// end-ks-dataclass

// start-poly-classes
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
// end-poly-classes

// start-datetime-data-class
@Serializable
data class Appointment(
    val name: String,
    @Contextual val date: LocalDate,
    val time: LocalTime,
)
// end-datetime-data-class

fun main() {

    val uri = "<connection string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_db")
    val collection = database.getCollection<PaintOrder>("orders")

    // start-codec
    val myCustomCodec = KotlinSerializerCodec.create<PaintOrder>(
        bsonConfiguration = BsonConfiguration(encodeDefaults = false)
    )

    val registry = CodecRegistries.fromRegistries(
        CodecRegistries.fromCodecs(myCustomCodec), collection.codecRegistry
    )
    // end-codec

    // start-snake-case
    val myCustomCodec = KotlinSerializerCodec.create<PaintOrder>(
        bsonConfiguration = BsonConfiguration(bsonNamingStrategy = BsonNamingStrategy.SNAKE_CASE)
    )

    val registry = CodecRegistries.fromRegistries(
        CodecRegistries.fromCodecs(myCustomCodec), collection.codecRegistry
    )
    // end-snake-case

    // start-poly-operations
    val collection = database.getCollection<Person>("school")

    val teacherDoc = Teacher(ObjectId(), "Vivian Lee", "History")
    val studentDoc = Student(ObjectId(), "Kate Parker", 10)

    collection.insertOne(teacherDoc)
    collection.insertOne(studentDoc)

    println("Retrieving by using data classes")
    val resultTeacher = collection.withDocumentClass<Teacher>()
        .find(Filters.exists("department"))
        .firstOrNull()
    println(resultTeacher)

    val resultStudent = collection.withDocumentClass<Student>()
        .find(Filters.exists("grade"))
        .firstOrNull()
    println(resultStudent)

    println("\nRetrieving by using Person interface")
    val resultsPerson = collection.withDocumentClass<Person>().find()
    resultsPerson.forEach { result ->
        println(result)
    }

    println("\nRetrieving as Document type")
    val resultsDocument = collection.withDocumentClass<Document>().find()
    resultsDocument.forEach { result ->
        println(result)
    }
    // end-poly-operations

    // start-datetime-insertone
    val collection = database.getCollection<Appointment>("appointments")

    val apptDoc = Appointment(
        "Daria Smith",
        LocalDate(2024, 10, 15),
        LocalTime(hour = 11, minute = 30)
    )

    collection.insertOne(apptDoc)
    // end-datetime-insertone

}

