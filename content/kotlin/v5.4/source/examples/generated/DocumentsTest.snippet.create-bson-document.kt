val author = BsonDocument()
    .append("_id", BsonObjectId())
    .append("name", BsonString("Gabriel García Márquez"))
    .append(
        "dateOfDeath",
        BsonDateTime(
            LocalDateTime.of(2014, 4, 17, 0, 0).atZone(ZoneId.of("America/New_York")).toInstant().toEpochMilli()
        )
    )
    .append(
        "novels", BsonArray(
            listOf(
                BsonDocument().append("title", BsonString("One Hundred Years of Solitude"))
                    .append("yearPublished", BsonInt32(1967)),
                BsonDocument().append("title", BsonString("Chronicle of a Death Foretold"))
                    .append("yearPublished", BsonInt32(1981)),
                BsonDocument().append("title", BsonString("Love in the Time of Cholera"))
                    .append("yearPublished", BsonInt32(1985))
            )
        )
    )
