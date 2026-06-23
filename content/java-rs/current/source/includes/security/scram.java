import com.mongodb.MongoCredential;
import com.mongodb.ConnectionString;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoClient;
import org.bson.Document;

public class Scram {

    public void runDefault() {
        //  start-scram-default
        String user = "<db_username>";     // the user name
        String source = "<authenticationDb>";   // the source where the user is defined
        char[] password = "<db_password>".toCharArray(); // the password as a character array
        // ...
        MongoCredential credential = MongoCredential.createCredential(user, source, password);
            
        MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                    builder.hosts(Arrays.asList(new ServerAddress("<hostname>", "<port>"))))
                .credential(credential)
                .build());
        //  end-scram-default
    }

    public void runDefaultWithString() {
        //  start-scram-default-connection-string
        MongoClient mongoClient = MongoClients.create("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>");
        //  end-scram-default-connection-string
    }

    public void runScram256() {
        //  start-scram-256
        String user = "<db_username>";     // the user name
        String source = "<authenticationDb>";   // the source where the user is defined
        char[] password = "<db_password>".toCharArray(); // the password as a character array
        // ...
        MongoCredential credential = MongoCredential.createScramSha256Credential(user, source, password);
            
        MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                    builder.hosts(Arrays.asList(new ServerAddress("<hostname>", "<port>"))))
                .credential(credential)
                .build());
        //  end-scram-256
    }

    public void runScram256WithString() {
        //  start-scram-256-connection-string
        MongoClient mongoClient = MongoClients.create("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=SCRAM-SHA-256");
        //  end-scram-256-connection-string
    }

    public void runScram1() {
        //  start-scram-1
        String user = "<db_username>";     // the user name
        String source = "<authenticationDb>";   // the source where the user is defined
        char[] password = "<db_password>".toCharArray(); // the password as a character array
        // ...
        MongoCredential credential = MongoCredential.createScramSha1Credential(user, source, password);
            
        MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                    builder.hosts(Arrays.asList(new ServerAddress("<hostname>", "<port>"))))
                .credential(credential)
                .build());
        //  end-scram-1
    }

    public void runScram1WithString() {
        //  start-scram-1-connection-string
        MongoClient mongoClient = MongoClients.create("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=SCRAM-SHA-1");
        //  end-scram-1-connection-string
    }
}
