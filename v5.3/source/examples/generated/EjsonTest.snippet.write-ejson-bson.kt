val settings = JsonWriterSettings.builder().outputMode(JsonMode.EXTENDED).build()

JsonWriter(BufferedWriter(OutputStreamWriter(System.out)), settings).use { jsonWriter ->
    jsonWriter.writeStartDocument()
    jsonWriter.writeObjectId("_id", ObjectId("507f1f77bcf86cd799439012"))
    jsonWriter.writeInt64("myNumber", 11223344)
    jsonWriter.writeEndDocument()
    jsonWriter.flush()
}
