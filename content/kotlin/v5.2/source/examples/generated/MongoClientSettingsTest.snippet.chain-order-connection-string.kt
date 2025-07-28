val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("mongodb+srv:/<db_username>:<db_password>@<hostname>:<port>?connectTimeoutMS(2000)"))
        .applyToSocketSettings{ builder ->
            builder.connectTimeout(5, TimeUnit.SECONDS)
        }
        .build()
)
