import com.mongodb.*
import com.mongodb.kotlin.client.MongoClient
import org.bson.BsonInt64
import org.bson.Document

// SCRAM Authentication
// start-default-cred-string
val mongoClient =
    MongoClient.create("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>")
// end-default-cred-string

// start-default-mongo-cred
val credential = MongoCredential.createCredential(
    "<db_username>", "<authenticationDb>", "<db_password>".toCharArray()
)
val settings = MongoClientSettings.builder()
        .applyToClusterSettings { builder: ClusterSettings.Builder ->
            builder.hosts(
                listOf(ServerAddress("<hostname>", <port>))
            )
        }
        .credential(credential)
        .build()

val mongoClient = MongoClient.create(settings)
// end-default-mongo-cred

// start-scramsha256-cred-string
val mongoClient =  
    MongoClient.create("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=admin&authMechanism=SCRAM-SHA-256")
// end-scramsha256-cred-string

// start-scramsha256-mongo-cred
val credential = MongoCredential.createScramSha256Credential(
    "<db_username>", "<authenticationDb>", "<db_password>".toCharArray()
)
val settings = MongoClientSettings.builder()
        .applyToClusterSettings { builder: ClusterSettings.Builder ->
            builder.hosts(
                listOf(ServerAddress("<hostname>", <port>))
            )
        }
        .credential(credential)
        .build()

val mongoClient = MongoClient.create(settings)
// end-scramsha256-mongo-cred

// start-scramsha1-cred-string
val mongoClient =
    MongoClient.create("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=admin&authMechanism=SCRAM-SHA-1")
// end-scramsha1-cred-string

// start-scramsha1-mongo-cred
val credential = MongoCredential.createScramSha1Credential(
    "<db_username>", "<authenticationDb>", "<db_password>".toCharArray()
)
val settings = MongoClientSettings.builder()
        .applyToClusterSettings { builder: ClusterSettings.Builder ->
            builder.hosts(
                listOf(ServerAddress("<hostname>", <port>))
            )
        }
        .credential(credential)
        .build()

val mongoClient = MongoClient.create(settings)
// end-scramsha1-mongo-cred

// AWS Authentication

// start-aws-sdk-mcred
val credential = MongoCredential.createAwsCredential(null, null)

val settings = MongoClientSettings.builder()
    .applyToClusterSettings { builder: ClusterSettings.Builder ->
        builder.hosts(
            listOf(ServerAddress("<atlasUri>"))
        )
    }
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
// end-aws-sdk-mcred

// start-aws-sdk-cred-string
val mongoClient =
    MongoClient.create("mongodb://<atlasUri>?authMechanism=MONGODB-AWS")
// end-aws-sdk-cred-string


// start-aws-env-mcred
val credential = MongoCredential.createAwsCredential(null, null)

val settings = MongoClientSettings.builder()
    .applyToClusterSettings { builder: ClusterSettings.Builder ->
        builder.hosts(
            listOf(ServerAddress("<atlasUri>"))
        )
    }
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
// end-aws-env-mcred

// start-aws-env-cred-string
val mongoClient =
    MongoClient.create("mongodb://<atlasUri>?authMechanism=MONGODB-AWS")
// end-aws-env-cred-string

// start-aws-mcred
val credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray())

val settings = MongoClientSettings.builder()
        .applyToClusterSettings { builder: ClusterSettings.Builder ->
            builder.hosts(
                listOf(ServerAddress("<atlasUri>"))
            )
        }
        .credential(credential)
        .build()

val mongoClient = MongoClient.create(settings)
// end-aws-mcred

// start-aws-mcred-wmechprop
val credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray())
    .withMechanismProperty("AWS_SESSION_TOKEN", "<awsSessionToken>")

val settings = MongoClientSettings.builder()
        .applyToClusterSettings { builder: ClusterSettings.Builder ->
            builder.hosts(
                listOf(ServerAddress("<atlasUri>"))
            )
        }
        .credential(credential)
        .build()

val mongoClient = MongoClient.create(settings)
// end-aws-mcred-wmechprop

// start-aws-lambda-expression
val awsFreshCredentialSupplier: Supplier<AwsCredential> = Supplier {
    // Add your code here to fetch new credentials

    // Return the new credentials
    AwsCredential("<awsKeyId>", "<awsSecretKey>", "<awsSessionToken>")
}

val credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray())
    .withMechanismProperty(MongoCredential.AWS_CREDENTIAL_PROVIDER_KEY, awsFreshCredentialSupplier)

val settings = MongoClientSettings.builder()
    .applyToClusterSettings { builder ->
        builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
    }
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
// end-aws-lambda-expression

// start-aws-apply-connect-string
val credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray())
val connectionString = ConnectionString("mongodb://<atlasUri>/?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<awsSessionToken>")

val settings = MongoClientSettings.builder()
    .applyConnectionString(connectionString)
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
// end-aws-apply-connect-string

// X.509

// start-x509-connect-string
val mongoClient =
    MongoClient.create("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=MONGODB-X509&tls=true")
// end-x509-connect-string

// start-x509-mcred
val credential = MongoCredential.createMongoX509Credential()

val settings = MongoClientSettings.builder()
    .applyToClusterSettings { builder ->
        builder.hosts(listOf(
            ServerAddress("<hostname>", <port>))
        )
    }
    .applyToSslSettings { builder ->
        builder.enabled(true)
    }
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
// end-x509-mcred
