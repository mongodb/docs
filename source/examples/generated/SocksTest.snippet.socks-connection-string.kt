val connectionString = ConnectionString(
    "mongodb+srv://<db_username>:<db_password>@<cluster-url>/?" +
        "proxyHost=<proxyHost>" +
        "&proxyPort=<proxyPort>" +
        "&proxyUsername=<proxyUsername>" +
        "&proxyPassword=<proxyPassword>"
)

val mongoClient = MongoClient.create(connectionString)
