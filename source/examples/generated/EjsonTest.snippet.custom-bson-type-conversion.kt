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
