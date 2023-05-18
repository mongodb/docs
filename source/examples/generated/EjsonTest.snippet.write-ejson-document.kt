val myDoc = Document().append("_id", ObjectId("507f1f77bcf86cd799439012"))
    .append("myNumber", 11223344)

val settings = JsonWriterSettings.builder().outputMode(JsonMode.RELAXED).build()
(myDoc.toJson(settings))
