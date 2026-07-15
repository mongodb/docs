// start-client-settings
MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString("<your connection string>"))
        .readPreference(ReadPreference.secondary())
        .readConcern(ReadConcern.LOCAL)
        .writeConcern(WriteConcern.W2)
        .build();

MongoClient client = MongoClients.create(settings);
// end-client-settings

// start-client-settings-uri
MongoClient client = MongoClients.create(
        "mongodb://<host>:<port>/?readPreference=secondary&readConcernLevel=local&w=2");
// end-client-settings-uri

// start-transaction-settings
ClientSession clientSession = Mono.from(client.startSession()).block();
TransactionOptions txnOptions = TransactionOptions.builder()
        .readPreference(ReadPreference.primary())
        .readConcern(ReadConcern.MAJORITY)
        .writeConcern(WriteConcern.W1)
        .build();

clientSession.startTransaction(txnOptions);
// end-transaction-settings

// start-database-settings
MongoDatabase database = client.getDatabase("test_database")
        .withReadPreference(ReadPreference.primaryPreferred())
        .withReadConcern(ReadConcern.AVAILABLE)
        .withWriteConcern(WriteConcern.MAJORITY);
// end-database-settings

// start-collection-settings
MongoCollection<Document> collection = database.getCollection("test_collection")
        .withReadPreference(ReadPreference.secondaryPreferred())
        .withReadConcern(ReadConcern.AVAILABLE)
        .withWriteConcern(WriteConcern.UNACKNOWLEDGED);
// end-collection-settings

// start-sharded-cluster-uri
MongoClient client = MongoClients.create(
        "mongodb://<host>:<port>/?readPreference=secondary");
// end-sharded-cluster-uri

// start-tag-set
List<TagSet> tagSetList = Arrays.asList(
        new TagSet(new Tag("dc", "ny")),
        new TagSet(new Tag("dc", "sf")),
        new TagSet()
);

MongoDatabase database = client.getDatabase("test_database")
        .withReadPreference(ReadPreference.secondary(tagSetList));
// end-tag-set

// start-local-threshold-settings
MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString("<your connection string>"))
        .applyToClusterSettings(builder ->
                builder.localThreshold(35, TimeUnit.MILLISECONDS))
        .build();

MongoClient client = MongoClients.create(settings);
// end-local-threshold-settings

// start-local-threshold-uri
MongoClient client = MongoClients.create(
        "mongodb://<host>:<port>/?localThresholdMS=35");
// end-local-threshold-uri

// start-retryable-reads-writes
MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString("<your connection string>"))
        .retryReads(false)
        .retryWrites(false)
        .build();

MongoClient client = MongoClients.create(settings);
// end-retryable-reads-writes

// start-retryable-reads-writes-uri
MongoClient client = MongoClients.create(
        "mongodb://<host>:<port>/?retryReads=false&retryWrites=false");
// end-retryable-reads-writes-uri