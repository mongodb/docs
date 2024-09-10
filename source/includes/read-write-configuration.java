// start-write-concern-client
MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString("<your connection string>"))
        .writeConcern(WriteConcern.MAJORITY)
        .build();

MongoClient client = MongoClients.create(settings);
// end-write-concern-client

// start-write-concern-collection
MongoCollection<Document> collection = database.getCollection("<collection name>");
collection = collection.withWriteConcern(WriteConcern.MAJORITY);
// end-write-concern-collection

// start-read-concern-client
MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString("<your connection string>"))
        .readConcern(ReadConcern.MAJORITY)
        .build();

MongoClient client = MongoClients.create(settings);
// end-read-concern-client

// start-read-concern-collection
MongoCollection<Document> collection = database.getCollection("<collection name>");
collection = collection.withReadConcern(ReadConcern.MAJORITY);
// end-read-concern-collection

// start-read-preference-client
MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString("<your connection string>"))
        .readPreference(ReadPreference.secondary())
        .build();
// end-read-preference-client

// start-read-preference-collection
MongoCollection<Document> collection = database.getCollection("<collection name>");
collection = collection.withReadPreference(ReadPreference.secondary());
// end-read-preference-collection