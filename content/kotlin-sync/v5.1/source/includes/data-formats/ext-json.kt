package org.example

import org.bson.json.JsonWriter
import org.bson.json.JsonWriterSettings
import java.util.Date
import org.bson.Document
import org.bson.json.JsonMode
import org.bson.json.JsonReader
import org.bson.types.ObjectId
import java.time.Instant
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.io.BufferedWriter
import java.io.OutputStreamWriter

fun main() {

    // start-read-doc
    val ejsonStr = """
        {
            "_id": { "$${"oid"}": "507f1f77bcf86cd799439011" },
            "myNumber": { "$${"numberLong"}": "4794261" }
        }
    """.trimIndent()

    val doc = Document.parse(ejsonStr)
    println(doc)
    // end-read-doc

    // start-read-bson
    val string = """
        {
            "_id": { "$${"oid"}": "507f1f77bcf86cd799439011" },
            "myNumber": { "$${"numberLong"}": "4794261" }
        }
    """.trimIndent()

    val jsonReader = JsonReader(string)
    jsonReader.readStartDocument()

    // Reads the "_id" field value
    jsonReader.readName("_id")
    val id = jsonReader.readObjectId()

    // Reads the "myNumber" field value 
    jsonReader.readName("myNumber")
    val myNumber = jsonReader.readInt64()

    jsonReader.readEndDocument()

    println("$id is type: ${id::class.qualifiedName}")
    println("$myNumber is type: ${myNumber::class.qualifiedName}")

    jsonReader.close()
    // end-read-bson

    // start-write-doc
    val doc = Document()
        .append("_id", ObjectId("507f1f77bcf86cd799439012"))
        .append("createdAt", Date.from(Instant.ofEpochMilli(1601499609000L)))
        .append("myNumber", 4794261)

    val settings = JsonWriterSettings.builder()
        .outputMode(JsonMode.RELAXED)
        .build()

    println(doc.toJson(settings))
    // end-write-doc

    // start-write-bson
     val settings = JsonWriterSettings.builder()
        .outputMode(JsonMode.EXTENDED)
        .build()

    JsonWriter(BufferedWriter(OutputStreamWriter(System.out)), settings).use { jsonWriter ->
        jsonWriter.writeStartDocument()
        jsonWriter.writeName("_id")
        jsonWriter.writeObjectId(ObjectId("507f1f77bcf86cd799439012"))
        jsonWriter.writeName("myNumber")
        jsonWriter.writeInt64(11223344L)
        jsonWriter.writeEndDocument()
        jsonWriter.flush()
    }
    // end-write-bson

    // start-custom-conversion
    val settings = JsonWriterSettings.builder()
        .outputMode(JsonMode.RELAXED)
        .objectIdConverter { value, writer ->
            writer.writeString(value.toHexString())
        }
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
    // end-custom-conversion
}