val settings = JsonWriterSettings.builder()
    .outputMode(JsonMode.RELAXED)
    .objectIdConverter { value, writer -> writer.writeString(value.toHexString()) }
    .timestampConverter { value, writer ->
        val ldt = LocalDateTime.ofInstant(Instant.ofEpochSecond(value.time.toLong()), ZoneOffset.UTC)
        writer.writeString(ldt.format(DateTimeFormatter.ISO_DATE_TIME))
    }
    .build()

val doc = Document()
    .append("_id", ObjectId("507f1f77bcf86cd799439012"))
    .append("createdAt", BsonTimestamp(1601516589,1))
    .append("myNumber", 4794261)

println(doc.toJson(settings))
