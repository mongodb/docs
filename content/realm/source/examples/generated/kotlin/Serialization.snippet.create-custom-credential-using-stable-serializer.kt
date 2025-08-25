val credentials = Credentials.customFunction(
    mapOf(
        "userId" to 500,
        "password" to "securePassword"
    )
)

val bsonCredentials = Credentials.customFunction(
    BsonDocument(
        mapOf(
            "userId" to BsonInt32(500),
            "password" to BsonString("securePassword")
        )
    )
)
app.login(credentials)
