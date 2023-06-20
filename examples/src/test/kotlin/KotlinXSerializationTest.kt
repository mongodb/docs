
import com.mongodb.kotlin.client.coroutine.MongoClient
import config.getConfig
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Contextual
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.encodeToJsonElement
import org.bson.Document
import org.bson.codecs.configuration.CodecRegistries
import org.bson.codecs.kotlinx.BsonConfiguration
import org.bson.codecs.kotlinx.KotlinSerializerCodec
import org.bson.codecs.kotlinx.ObjectIdSerializer
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.util.*
import kotlin.test.*

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

}

