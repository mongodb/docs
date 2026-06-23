package org.example;

import org.bson.Document;
import org.bson.json.JsonMode;
import org.bson.json.JsonReader;
import org.bson.json.JsonWriter;
import org.bson.json.JsonWriterSettings;
import org.bson.types.ObjectId;

import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class ExtendedJson {

    private static void readDoc() {
        // start-read-doc
        String ejsonStr = "{ \"_id\": { \"$oid\": \"507f1f77bcf86cd799439011\" },"
                + " \"myNumber\": { \"$numberLong\": \"4794261\" } }";

        Document doc = Document.parse(ejsonStr);
        System.out.println(doc);
        // end-read-doc
    }

    private static void readBson() {
        // start-read-bson
        String string = "{ \"_id\": { \"$oid\": \"507f1f77bcf86cd799439011\" },"
                + " \"myNumber\": { \"$numberLong\": \"4794261\" } }";

        JsonReader jsonReader = new JsonReader(string);
        jsonReader.readStartDocument();

        // Reads the "_id" field value
        jsonReader.readName("_id");
        ObjectId id = jsonReader.readObjectId();

        // Reads the "myNumber" field value
        jsonReader.readName("myNumber");
        long myNumber = jsonReader.readInt64();

        jsonReader.readEndDocument();

        System.out.println(id + " is type: " + id.getClass().getName());
        System.out.println(myNumber + " is type: " + Long.class.getName());

        jsonReader.close();
        // end-read-bson
    }

    private static void writeDoc() {
        // start-write-doc
        Document doc = new Document()
                .append("_id", new ObjectId("507f1f77bcf86cd799439012"))
                .append("createdAt", Date.from(Instant.ofEpochMilli(1601499609000L)))
                .append("myNumber", 4794261);

        JsonWriterSettings settings = JsonWriterSettings.builder()
                .outputMode(JsonMode.RELAXED)
                .build();

        System.out.println(doc.toJson(settings));
        // end-write-doc
    }

    private static void writeBson() {
        // start-write-bson
        JsonWriterSettings settings = JsonWriterSettings.builder()
                .outputMode(JsonMode.EXTENDED)
                .build();

        JsonWriter jsonWriter = new JsonWriter(
                new BufferedWriter(new OutputStreamWriter(System.out)), settings);
        jsonWriter.writeStartDocument();
        jsonWriter.writeName("_id");
        jsonWriter.writeObjectId(new ObjectId("507f1f77bcf86cd799439012"));
        jsonWriter.writeName("myNumber");
        jsonWriter.writeInt64(11223344L);
        jsonWriter.writeEndDocument();
        jsonWriter.flush();
        // end-write-bson
    }

    private static void customConversion() {
        // start-custom-conversion
        JsonWriterSettings settings = JsonWriterSettings.builder()
                .outputMode(JsonMode.RELAXED)
                .objectIdConverter((value, writer) -> writer.writeString(value.toHexString()))
                .dateTimeConverter((value, writer) -> {
                    ZonedDateTime zonedDateTime = Instant.ofEpochMilli(value).atZone(ZoneOffset.UTC);
                    writer.writeString(DateTimeFormatter.ISO_DATE_TIME.format(zonedDateTime));
                })
                .build();

        Document doc = new Document()
                .append("_id", new ObjectId("507f1f77bcf86cd799439012"))
                .append("createdAt", Date.from(Instant.ofEpochMilli(1601499609000L)))
                .append("myNumber", 4794261);

        System.out.println(doc.toJson(settings));
        // end-custom-conversion
    }

    public static void main(String[] args) {
        readDoc();
        readBson();
        writeDoc();
        writeBson();
        customConversion();
    }
}

