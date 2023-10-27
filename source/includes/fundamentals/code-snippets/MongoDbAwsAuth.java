package other;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Collections;
import java.util.function.Supplier;

import com.mongodb.AwsCredential;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

public class MongoDbAwsAuth {

    // Placeholder functions

    private static void encodeText() throws UnsupportedEncodingException {
        // Defines the encoding scheme used to translate a string
        // start urlEncode
        String encodedField = java.net.URLEncoder.encode("<fieldValue>".toString(), "ISO-8859-1");
        // end urlEncode
    }
    private static void connectionString() {
        // Creates a MongoClient and provides AWS credentials to enable the MONGODB-AWS authentication mechanism
        // start connectionString
        MongoClient mongoClient = MongoClients.create("mongodb://<awsKeyId>:<awsSecretKey>@<atlasUri>?authMechanism=MONGODB-AWS");
        // end connectionString
    }

    private static void mechOnlyConnectionString() {
        // Creates a MongoClient that MongoDB authenticates by using the MONGODB-AWS mechanism
        // start mechOnlyConnectionString
        MongoClient mongoClient = MongoClients.create("mongodb://<atlasUri>?authMechanism=MONGODB-AWS");
        // end mechOnlyConnectionString
    }

    private static void connectionStringSessionToken() {
        // Creates a MongoClient and provides AWS credentials and a session token to enable the MONGODB-AWS authentication mechanism
        // start connectionStringSessionToken
        MongoClient mongoClient = MongoClients.create("mongodb://<awsKeyId>:<awsSecretKey>@<atlasUri>?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<awsSessionToken>");
        // end connectionStringSessionToken
    }

    private static void mongoCredential() {
        // Creates a MongoCredential instance to specify the AWS credentials
        // start mongoCredential
        MongoCredential credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray());

        // Creates a MongoClient that receives AWS credentials from the MongoCredential instance
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                builder.hosts(Arrays.asList(new ServerAddress("<hostname>"))))
                .credential(credential)
                .build());
        // end mongoCredential
    }

    private static void mechOnlyMongoCredential() {
        // Creates a MongoCredential instance to specify the authentication mechanism
        // start mechOnlyMongoCredential
        MongoCredential credential = MongoCredential.createAwsCredential(null, null);

        // Creates a MongoClient that receives configuration information from a MongoCredential and environment variables
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                builder.hosts(Arrays.asList(new ServerAddress("<hostname>"))))
                .credential(credential)
                .build());
        // end mechOnlyMongoCredential
    }

    private static void mongoCredentialSessionTokenConnString() {
        // Creates a MongoCredential instance to specify the AWS credentials
        // start mongoCredentialSessionTokenConnString
        MongoCredential credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray());

        // Specifies the authentication mechanism and session token in a connection string
        ConnectionString connectionString = new ConnectionString("mongodb://<atlasUri>/?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<awsSessionToken>");

        // Creates a MongoClient that receives configuration information from a MongoCrediential and connection string
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .credential(credential)
                .build());
        // end mongoCredentialSessionTokenConnString
    }

    private static void mongoCredentialSessionTokenCredential() {
        // Creates a MongoCredential instance to specify the AWS credentials and a session token
        // start mongoCredentialSessionTokenCredential
        MongoCredential credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray()).withMechanismProperty("AWS_SESSION_TOKEN",  "<awsSessionToken>");

         // Creates a MongoClient that receives configuration information from a MongoCredential instance
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                builder.hosts(Arrays.asList(new ServerAddress("<hostname>"))))
                .credential(credential)
                .build());
        // end mongoCredentialSessionTokenCredential
    }

    private static void mongoCredentialECSorEC2() {
        // Creates a MongoCredential instance to specify the authentication mechanism
        // start mongoCredentialECSorEC2
        MongoCredential credential = MongoCredential.createAwsCredential(null, null);
        // end mongoCredentialECSorEC2
    }

    private static void refreshCredentials() {
        // Creates a lambda expression that returns new AWS credentials
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
    public static void main(String[] args) { }
}
