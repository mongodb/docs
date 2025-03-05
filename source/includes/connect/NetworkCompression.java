// start-specify-connection-string
ConnectionString connectionString = new ConnectionString(
        "mongodb+srv://<db_username>:<db_password>@<cluster-url>/?compressors=snappy,zlib,zstd");

MongoClient client = MongoClients.create(connectionString);
// end-specify-connection-string

// start-specify-client-settings
MongoClientSettings settings = MongoClientSettings.builder()
        .compressorList(Arrays.asList(MongoCompressor.createSnappyCompressor(),
                        MongoCompressor.createZlibCompressor(),
                        MongoCompressor.createZstdCompressor()))
        .build();

MongoClient client = MongoClients.create(settings);
// end-specify-client-settings