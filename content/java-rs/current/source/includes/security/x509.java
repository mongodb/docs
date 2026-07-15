import com.mongodb.MongoCredential;
import com.mongodb.ConnectionString;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoClient;

public class X509 {

    public void runX509String() {
        // start-x509-connection-string
        MongoClient mongoClient = MongoClients.create("mongodb://<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=MONGODB-X509&tls=true");
        // end-x509-connection-string

    }

    public void runX509Credential() {
        // start-x509-credentials
        MongoCredential credential = MongoCredential.createMongoX509Credential();

        MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                    builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
                .applyToSslSettings(builder ->
                    builder.enabled(true)
                    )
                .credential(credential)
                .build());
        // end-x509-credentials
    }

}