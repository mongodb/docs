import com.mongodb.MongoCredential;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.ConnectionString;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoClient;

public class Ldap {

    public void runLdapConnectionString() {
        // start-ldap-connection-string
        MongoClient mongoClient = MongoClients
            .create("<LDAP username>:<password>@<hostname>:<port>/?authSource=$external&authMechanism=PLAIN");
        // end-ldap-connection-string
    }

    public void runLdapCredential() {
        // start-ldap-mongo-credential
        MongoCredential credential = MongoCredential
            .createPlainCredential("<LDAP username>", "$external", "<password>".toCharArray());

        MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                        builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
                .credential(credential)
                .build());
        // end-ldap-mongo-credential
    }

}