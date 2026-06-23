import com.mongodb.AwsCredential;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;

import java.util.Collections;
import java.util.function.Supplier;

public class MongoDbAwsAuth {

    public void connectionString() {
        // start connectionString
        MongoClient mongoClient = MongoClients.create("mongodb://<awsKeyId>:<awsSecretKey>@<atlasUri>?authMechanism=MONGODB-AWS");
        // end connectionString
    }

    public void mechOnlyConnectionString() {
        // start mechOnlyConnectionString
        MongoClient mongoClient = MongoClients.create("mongodb://<atlasUri>?authMechanism=MONGODB-AWS");
        // end mechOnlyConnectionString
    }

    public void connectionStringSessionToken() {
        // start connectionStringSessionToken
        MongoClient mongoClient = MongoClients.create("mongodb://<awsKeyId>:<awsSecretKey>@<atlasUri>?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<awsSessionToken>");
        // end connectionStringSessionToken
    }

    public void mongoCredential() {
        // start mongoCredential
        MongoCredential credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray());

        // Creates a MongoClient that receives AWS credentials from the MongoCredential instance
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                        .applyToClusterSettings(builder ->
                                builder.hosts(Collections.singletonList(new ServerAddress("<hostname>"))))
                        .credential(credential)
                        .build());
        // end mongoCredential
    }

    public void mechOnlyMongoCredential() {
        // start mechOnlyMongoCredential
        MongoCredential credential = MongoCredential.createAwsCredential(null, null);

        // Creates a MongoClient that receives configuration information from a MongoCredential and environment variables
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                        .applyToClusterSettings(builder ->
                                builder.hosts(Collections.singletonList(new ServerAddress("<hostname>"))))
                        .credential(credential)
                        .build());
        // end mechOnlyMongoCredential
    }

    public void mongoCredentialSessionTokenConnString() {
        // start mongoCredentialSessionTokenConnString
        MongoCredential credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray());

        // Specifies the authentication mechanism and session token in a connection string
        ConnectionString connectionString = new ConnectionString("mongodb://<atlasUri>/?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<awsSessionToken>");

        // Creates a MongoClient that receives configuration information from a MongoCredential and connection string
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                        .applyConnectionString(connectionString)
                        .credential(credential)
                        .build());
        // end mongoCredentialSessionTokenConnString
    }

    public void mongoCredentialSessionTokenCredential() {
        // start mongoCredentialSessionTokenCredential
        MongoCredential credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray())
                .withMechanismProperty("AWS_SESSION_TOKEN", "<awsSessionToken>");

        // Creates a MongoClient that receives configuration information from a MongoCredential instance
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                        .applyToClusterSettings(builder ->
                                builder.hosts(Collections.singletonList(new ServerAddress("<hostname>"))))
                        .credential(credential)
                        .build());
        // end mongoCredentialSessionTokenCredential
    }

    public void mongoCredentialECSorEC2() {
        // start mongoCredentialECSorEC2
        MongoCredential credential = MongoCredential.createAwsCredential(null, null);
        // end mongoCredentialECSorEC2
    }

    public void refreshCredentials() {
        // start refreshCredentials
        Supplier<AwsCredential> awsFreshCredentialSupplier = () -> {
            // Add your code to fetch new credentials
            return new AwsCredential("<awsKeyId>", "<awsSecretKey>", "<awsSessionToken>");
        };

        // Creates a MongoCredential instance to specify the new AWS credentials
        MongoCredential credential = MongoCredential.createAwsCredential(null, null)
                .withMechanismProperty(MongoCredential.AWS_CREDENTIAL_PROVIDER_KEY, awsFreshCredentialSupplier);

        // Creates a MongoClient that receives new configuration information from a MongoCredential instance
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                        .applyToClusterSettings(builder ->
                                builder.hosts(Collections.singletonList(new ServerAddress("<hostname>", <port>))))
                        .credential(credential)
                        .build());
        // end refreshCredentials
    }

}
