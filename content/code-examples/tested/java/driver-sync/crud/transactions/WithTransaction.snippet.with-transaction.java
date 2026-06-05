String uri = "<your-connection-string>";
/*
  For a replica set, include the replica set name and a seedlist of the members in the URI string; e.g.
  String uri = "mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017/admin?replicaSet=myRepl";
  For a sharded cluster, connect to the mongos instances.
  For example:
  String uri = "mongodb://mongos0.example.com:27017,mongos1.example.com:27017:27017/admin";
 */

final MongoClient client = MongoClients.create(uri);

/*
    Create collections.
 */

client.getDatabase("sample_mflix").getCollection("movies")
        .withWriteConcern(WriteConcern.MAJORITY).insertOne(new Document("title", "test"));
client.getDatabase("sample_mflix").getCollection("comments")
        .withWriteConcern(WriteConcern.MAJORITY).insertOne(new Document("text", "test"));

/* Step 1: Start a client session. */

final ClientSession clientSession = client.startSession();

/* Step 2: Optional. Define options to use for the transaction. */

TransactionOptions txnOptions = TransactionOptions.builder()
        .writeConcern(WriteConcern.MAJORITY)
        .build();

/* Step 3: Define the sequence of operations to perform inside the transactions. */

TransactionBody<String> txnBody = new TransactionBody<String>() {
    public String execute() {
        MongoCollection<Document> coll1 = client.getDatabase("sample_mflix").getCollection("movies");
        MongoCollection<Document> coll2 = client.getDatabase("sample_mflix").getCollection("comments");

        /*
           Important:: You must pass the session to the operations.
         */
        coll1.insertOne(clientSession, new Document("title", "test 2"));
        coll2.insertOne(clientSession, new Document("text", "test 2"));
        return "Inserted into collections in the same database";
    }
};
try {
    /*
       Step 4: Use .withTransaction() to start a transaction,
       execute the callback, and commit (or abort on error).
    */

    clientSession.withTransaction(txnBody, txnOptions);
} catch (RuntimeException e) {
    // some error handling
} finally {
    clientSession.close();
}
