
import org.bson.*
import org.bson.json.JsonMode
import org.bson.json.JsonReader
import org.bson.json.JsonWriter
import org.bson.json.JsonWriterSettings
import org.bson.types.ObjectId
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.TestInstance
import java.io.BufferedWriter
import java.io.OutputStreamWriter
import java.time.Instant
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.util.*
import kotlin.test.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class EjsonTest {

    @Test
    fun readEjsonDocumentTest() {
        // :snippet-start: read-ejson-document
        val ejsonStr = """
                { "_id": { "${"$"}oid": "507f1f77bcf86cd799439011"},
                "myNumber": {"${"$"}numberLong": "4794261" }}
            """.trimIndent()

        val doc = Document.parse(ejsonStr)

        println(doc)
        // :snippet-end:
        assertEquals("507f1f77bcf86cd799439011", doc.getObjectId("_id").toString())
    }

    @Test
    fun readEjsonBsonTest() {
        // :snippet-start: read-ejson-bson
        val ejsonStr = """
            { "_id": { "${"$"}oid": "507f1f77bcf86cd799439011"},
              "myNumber": {"${"$"}numberLong": "4794261" }}
            """.trimIndent()

        val jsonReader = JsonReader(ejsonStr)

        jsonReader.readStartDocument()

        jsonReader.readName("_id")
        val id = jsonReader.readObjectId()
        jsonReader.readName("myNumber")
        val myNumber = jsonReader.readInt64()

        jsonReader.readEndDocument()

        println(id.toString() + " is type: " + id.javaClass.name)
        println(myNumber.toString() + " is type: " + myNumber.javaClass.name)

        jsonReader.close()
        // :snippet-end:
        assertEquals("507f1f77bcf86cd799439011", id.toString())
    }

    @Test
    fun writeEjsonDocumentTest() {
        // :snippet-start: write-ejson-document
        val myDoc = Document().append("_id", ObjectId("507f1f77bcf86cd799439012"))
            .append("myNumber", 11223344)

        val settings = JsonWriterSettings.builder().outputMode(JsonMode.RELAXED).build()
        myDoc.toJson(settings)
        // :snippet-end:
        assertEquals(11223344, myDoc.getInteger("myNumber"))
    }

    // Note: no assertions here since this example is just writing to stdout
    @Test
    fun writeEjsonBsonTest() {
        // :snippet-start: write-ejson-bson
        val settings = JsonWriterSettings.builder().outputMode(JsonMode.EXTENDED).build()

        JsonWriter(BufferedWriter(OutputStreamWriter(System.out)), settings).use { jsonWriter ->
            jsonWriter.writeStartDocument()
            jsonWriter.writeObjectId("_id", ObjectId("507f1f77bcf86cd799439012"))
            jsonWriter.writeInt64("myNumber", 11223344)
            jsonWriter.writeEndDocument()
            jsonWriter.flush()
        }
        // :snippet-end:
    }

    @Test
    fun customBsonTypeConversionTest() {
        // :snippet-start: custom-bson-type-conversion
        val settings = JsonWriterSettings.builder()
            .outputMode(JsonMode.RELAXED)
            .objectIdConverter { value, writer -> writer.writeString(value.toHexString()) }
            .dateTimeConverter { value, writer ->
                val zonedDateTime = Instant.ofEpochMilli(value).atZone(ZoneOffset.UTC)
                writer.writeString(DateTimeFormatter.ISO_DATE_TIME.format(zonedDateTime))
            }
            .build()

        val doc = Document()
            .append("_id", ObjectId("507f1f77bcf86cd799439012"))
            .append("createdAt", Date.from(Instant.ofEpochMilli(1601499609000L)))
            .append("myNumber", 4794261)

        println(doc.toJson(settings))
        // :snippet-end:
        assertEquals("507f1f77bcf86cd799439012", doc.getObjectId("_id").toString())
    }

}
