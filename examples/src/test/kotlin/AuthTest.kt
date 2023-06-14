
import com.mongodb.*
import com.mongodb.connection.ClusterSettings
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.runBlocking
import org.bson.BsonInt64
import org.bson.Document
import org.junit.jupiter.api.TestInstance
import java.util.*
import java.util.function.Supplier
import kotlin.test.Ignore

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class AuthTest {

    /* NOTE: Auth tests are not run by default. To run these tests,
    * set up your testing credentials and .env variables, then replace
    * the @Ignore annotation with @Test on the tests you want to run.
    *
    * To run the MONGO-AWS tests, you will need credentials with access
    * to your Atlas cluster and to add the necessary dependencies to the
    * project. Currently, these have not been tested.
    */

    companion object {
        private val dotenv = dotenv()
        // To test local connection string, update your .env file with string you want to test
        val CONNECTION_URI_PLACEHOLDER = dotenv["MONGODB_CONNECTION_URI"]

        // To test mongo credentials, update your .env file with connection variables
        val USERNAME = dotenv["MONGODB_USER_NAME"]
        val PASSWORD = dotenv["MONGODB_PASSWORD"]
        val AUTH_DB = dotenv["MONGODB_AUTH_DB"]
        val HOSTNAME = dotenv["MONGODB_HOST_NAME"]
        val PORT = dotenv["MONGODB_PORT"].toInt()
        val AWS_KEY = dotenv["AWS_KEY_ID"]
        val AWS_SECRET = dotenv["AWS_SECRET_KEY"]
        val AWS_TOKEN = dotenv["AWS_SESSION_TOKEN"]
    }

    @Ignore
    fun defaultConnectionStringTest() = runBlocking {
        // :replace-start: {
        //    "terms": {
        //       "CONNECTION_URI_PLACEHOLDER": "\"mongodb://<username>:<password>@<hostname>:<port>/?authSource=<authenticationDb>\""
        //    }
        // }
        // :snippet-start: default-cred-string
        val mongoClient =
            MongoClient.create(CONNECTION_URI_PLACEHOLDER)
        // :snippet-end:
        // :replace-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }

    @Ignore
    fun scramSha256ConnectionStringTest() = runBlocking {
        // :replace-start: {
        //    "terms": {
        //       "CONNECTION_URI_PLACEHOLDER": "\"mongodb://<username>:<password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=SCRAM-SHA-256\""
        //    }
        // }
        // :snippet-start: scram-sha-256-string
        val mongoClient =
            MongoClient.create(CONNECTION_URI_PLACEHOLDER)
        // :snippet-end:
        // :replace-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }

    @Ignore
    fun scramSha1ConnectionStringTest() = runBlocking {
        // :replace-start: {
        //    "terms": {
        //       "CONNECTION_URI_PLACEHOLDER": "\"mongodb://<username>:<password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=SCRAM-SHA-1\""
        //    }
        // }
        // :snippet-start: scram-sha-1-string
        val mongoClient =
            MongoClient.create(CONNECTION_URI_PLACEHOLDER)
        // :snippet-end:
        // :replace-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }

    @Ignore
    fun x509ConnectionStringTest() = runBlocking {
        // :replace-start: {
        //    "terms": {
        //       "CONNECTION_URI_PLACEHOLDER": "\"mongodb://<username>:<password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=MONGODB-X509&tls=true\""
        //    }
        // }
        // :snippet-start: x-509-string
        val mongoClient =
            MongoClient.create(CONNECTION_URI_PLACEHOLDER)
        // :snippet-end:
        // :replace-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }

    // :replace-start: {
    //    "terms": {
    //       "USERNAME": "\"<username>\"",
    //       "PASSWORD": "\"<password>\"",
    //       "AUTH_DB": "\"<authenticationDb>\"",
    //       "HOSTNAME": "\"<hostname>\"",
    //       "PORT": "\"<port>\""
    //    }
    // }
    @Ignore
    fun defaultMongoCredentialTest() = runBlocking {
        // :snippet-start: default-mongo-cred
        val credential = MongoCredential.createCredential(
            USERNAME, AUTH_DB, PASSWORD.toCharArray()
        )
        val settings = MongoClientSettings.builder()
                .applyToClusterSettings { builder: ClusterSettings.Builder ->
                    builder.hosts(
                        listOf(ServerAddress(HOSTNAME, PORT))
                    )
                }
                .credential(credential)
                .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }

    @Ignore
    fun scramSha256MongoCredentialTest() = runBlocking {
        // :snippet-start: scram-sha-256-cred
        val credential = MongoCredential.createScramSha256Credential(
            USERNAME, AUTH_DB, PASSWORD.toCharArray()
        )
        val settings = MongoClientSettings.builder()
                .applyToClusterSettings { builder: ClusterSettings.Builder ->
                    builder.hosts(
                        listOf(ServerAddress(HOSTNAME, PORT))
                    )
                }
                .credential(credential)
                .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }

    @Ignore
    fun scramSha1MongoCredentialTest() = runBlocking {
        // :snippet-start: scram-sha-1-cred
        val credential = MongoCredential.createScramSha1Credential(
            USERNAME, AUTH_DB, PASSWORD.toCharArray()
        )
        val settings = MongoClientSettings.builder()
                .applyToClusterSettings { builder: ClusterSettings.Builder ->
                    builder.hosts(
                        listOf(ServerAddress(HOSTNAME, PORT))
                    )
                }
                .credential(credential)
                .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }

    @Ignore
    fun sx509MongoCredentialTest() = runBlocking {
        // :snippet-start: x-509-cred
        val credential = MongoCredential.createMongoX509Credential()

        val settings = MongoClientSettings.builder()
            .applyToClusterSettings { builder ->
                builder.hosts(listOf(
                    ServerAddress(HOSTNAME, PORT))
                )
            }
            .applyToSslSettings { builder ->
                builder.enabled(true)
            }
            .credential(credential)
            .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }
    // :replace-end:


    /* NOTE: To run the AWS auth tests, you must have an
     * AWS IAM user account with role access to your Atlas cluster.
     */

    //     :replace-start: {
    //        "terms": {
    //           "AWS_KEY": "\"<awsKeyId>\"",
    //           "AWS_SECRET": "\"<awsSecretKey>\"",
    //           "AWS_TOKEN": "\"<awsSessionToken>\"",
    //           "HOSTNAME": "\"<hostname>\"",
    //           "PORT": "\"<port>\"",
    //           "CONNECTION_URI_PLACEHOLDER": "\"<atlasUri>\""
    //        }
    //     }

    @Ignore
    fun awsCredTest() = runBlocking {
        // :snippet-start: aws-credential
        val credential = MongoCredential.createAwsCredential(null, null)

        val settings = MongoClientSettings.builder()
            .applyToClusterSettings { builder: ClusterSettings.Builder ->
                builder.hosts(
                    listOf(ServerAddress(CONNECTION_URI_PLACEHOLDER))
                )
            }
            .credential(credential)
            .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
    }
    @Ignore
    fun awsMongoCredTest() = runBlocking {
        // :snippet-start: aws-credential-mongo-cred
        val credential = MongoCredential.createAwsCredential(AWS_KEY, AWS_SECRET.toCharArray())

        val settings = MongoClientSettings.builder()
                .applyToClusterSettings { builder: ClusterSettings.Builder ->
                    builder.hosts(
                        listOf(ServerAddress(CONNECTION_URI_PLACEHOLDER))
                    )
                }
                .credential(credential)
                .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
    }

    @Ignore
    fun awsSessionTokenTest() = runBlocking {
        // :snippet-start: aws-credential-session-token
        val credential = MongoCredential.createAwsCredential(AWS_KEY, AWS_SECRET.toCharArray())
            .withMechanismProperty("AWS_SESSION_TOKEN", AWS_TOKEN)

        val settings = MongoClientSettings.builder()
                .applyToClusterSettings { builder: ClusterSettings.Builder ->
                    builder.hosts(
                        listOf(ServerAddress(CONNECTION_URI_PLACEHOLDER))
                    )
                }
                .credential(credential)
                .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
    }

    @Ignore
    fun awsRefreshCredsTest() = runBlocking {
        // :snippet-start: aws-refresh-credentials
        val awsFreshCredentialSupplier: Supplier<AwsCredential> = Supplier {
            // Add your code here to fetch new credentials

            // Return the new credentials
            AwsCredential(AWS_KEY, AWS_SECRET, AWS_TOKEN)
        }

        val credential = MongoCredential.createAwsCredential(AWS_KEY, AWS_SECRET.toCharArray())
            .withMechanismProperty(MongoCredential.AWS_CREDENTIAL_PROVIDER_KEY, awsFreshCredentialSupplier)

        val settings = MongoClientSettings.builder()
            .applyToClusterSettings { builder ->
                builder.hosts(listOf(ServerAddress(HOSTNAME, PORT)))
            }
            .credential(credential)
            .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
        // :replace-end:
    }

    @Ignore
    // :replace-start: {
    //    "terms": {
    //       "CONNECTION_URI_PLACEHOLDER": "\"mongodb://<atlasUri>?authMechanism=MONGODB-AWS\""
    //    }
    // }
    fun awsStringTest() = runBlocking {
        // :snippet-start: aws-connection-string
        val mongoClient =
            MongoClient.create(CONNECTION_URI_PLACEHOLDER)
        // :snippet-end:
        // :replace-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }

    @Ignore
    // :replace-start: {
    //    "terms": {
    //       "AWS_KEY": "\"<awsKeyId>\"",
    //       "AWS_SECRET": "\"<awsSecretKey>\"",
    //       "CONNECTION_URI_PLACEHOLDER": "\"mongodb://<atlasUri>/?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<awsSessionToken>\""
    //    }
    // }
    fun awsSessionTokenStringTest() = runBlocking {
        // :snippet-start: aws-connection-string-session-token
        val credential = MongoCredential.createAwsCredential(AWS_KEY, AWS_SECRET.toCharArray())
        val connectionString = ConnectionString(CONNECTION_URI_PLACEHOLDER)

        val settings = MongoClientSettings.builder()
            .applyConnectionString(connectionString)
            .credential(credential)
            .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
        // :replace-end:
        val database = mongoClient.getDatabase("test")
        try {
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            println("Pinged your deployment. You successfully connected to MongoDB!")
        } catch (me: MongoException) {
            System.err.println(me)
        }
        mongoClient.close()
    }

}
