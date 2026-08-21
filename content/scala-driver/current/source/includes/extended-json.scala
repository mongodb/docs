import org.mongodb.scala.bson.{BsonDocument, BsonInt64, BsonObjectId, BsonTimestamp, Document, ObjectId}
import org.bson.json.{JsonMode, JsonReader, JsonWriter, JsonWriterSettings}

import java.io.StringWriter
import java.time.{Instant, ZoneOffset}
import java.time.format.DateTimeFormatter

object ExtendedJson {

  def main(args: Array[String]): Unit = {

    {
      // start-read-document
      val ejsonStr = """{"_id": {"$oid": "507f1f77bcf86cd799439011"}, "myNumber": {"$numberLong": "4794261"}}"""
      val document = Document(BsonDocument.parse(ejsonStr))
      println(document)
      // end-read-document
    }

    {
      // start-read-bson
      val ejsonStr = """{"_id": {"$oid": "507f1f77bcf86cd799439011"}, "myNumber": {"$numberLong": "4794261"}}"""
      val reader = new JsonReader(ejsonStr)
      reader.readStartDocument()
      val id = reader.readObjectId("_id")
      val myNumber = reader.readInt64("myNumber")
      reader.readEndDocument()
      println(s"$id is type: ${id.getClass.getName}")
      println(s"$myNumber is type: ${myNumber.getClass.getName}")
      // end-read-bson
    }

    {
      // start-write-document
      val document = Document(
        "_id" -> BsonObjectId(new ObjectId("507f1f77bcf86cd799439012")),
        "myNumber" -> BsonInt64(11223344L)
      )
      val ejsonStr = document.toJson()
      println(ejsonStr)
      // end-write-document
    }

    {
      // start-write-bson
      val writer = new StringWriter()
      val jsonWriter = new JsonWriter(writer,
          JsonWriterSettings.builder().outputMode(JsonMode.EXTENDED).build())
      jsonWriter.writeStartDocument()
      jsonWriter.writeObjectId("_id", new ObjectId("507f1f77bcf86cd799439012"))
      jsonWriter.writeInt64("myNumber", 11223344L)
      jsonWriter.writeEndDocument()
      println(writer.toString())
      // end-write-bson
    }

    {
      // start-custom-converters
      val settings = JsonWriterSettings.builder()
        .outputMode(JsonMode.RELAXED)
        .objectIdConverter((value, writer) => writer.writeString(value.toHexString))
        .timestampConverter((value, writer) => {
          val instant = Instant.ofEpochSecond(value.getTime.toLong)
          writer.writeString(
            DateTimeFormatter.ISO_LOCAL_DATE_TIME.withZone(ZoneOffset.UTC).format(instant))
        })
        .build()

      val document = Document(
        "_id" -> BsonObjectId(new ObjectId("507f1f77bcf86cd799439012")),
        "createdAt" -> new BsonTimestamp(1601516589, 1),
        "myNumber" -> BsonInt64(4794261L)
      )
      println(document.toJson(settings))
      // end-custom-converters
    }
  }
}
