val connectionString = ConnectionString(
    "mongodb+srv://<user>:<password>@<cluster-url>/?" +
        "proxyHost=<proxyHost>" +
        "&proxyPort=<proxyPort>" +
        "&proxyUsername=<proxyUsername>" +
        "&proxyPassword=<proxyPassword>"
)

val mongoClient = MongoClient.create(connectionString)
