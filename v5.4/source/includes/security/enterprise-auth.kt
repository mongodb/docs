import com.mongodb.*
import com.mongodb.kotlin.client.MongoClient
import org.bson.BsonInt64
import org.bson.Document

// GSSAPI

// start-gssapi-connect-string
val connectionString = ConnectionString("<Kerberos principal>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI")
val mongoClient = MongoClient.create(connectionString)
// end-gssapi-connect-string

// start-gssapi-mongo-cred
val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")

val settings = MongoClientSettings.builder()
        .applyToClusterSettings { builder ->
            builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
        }
        .credential(credential)
        .build()

val mongoClient = MongoClient.create(settings)
// end-gssapi-mongo-cred

// start-gssapi-properties-connect-string
val connectionString = ConnectionString("<Kerberos principal>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:myService")
val mongoClient = MongoClient.create(connectionString)
// end-gssapi-properties-connect-string

// start-gssapi-service-name-key
val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
    .withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "myService")
// end-gssapi-service-name-key

// start-gssapi-java-subject-key
val loginContext = LoginContext("<LoginModule implementation from JAAS config>")
loginContext.login()
val subject: Subject = loginContext.subject

val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
    .withMechanismProperty(MongoCredential.JAVA_SUBJECT_KEY, subject)
// end-gssapi-java-subject-key

// start-gssapi-java-subject-provider
/* All MongoClient instances sharing this instance of KerberosSubjectProvider
will share a Kerberos ticket cache */
val myLoginContext = "myContext"
/* Login context defaults to "com.sun.security.jgss.krb5.initiate"
if unspecified in KerberosSubjectProvider */
val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
    .withMechanismProperty(
        MongoCredential.JAVA_SUBJECT_PROVIDER_KEY,
        KerberosSubjectProvider(myLoginContext)
    )
// end-gssapi-java-subject-provider

// LDAP

// start-ldap-connect-string
val connectionString = ConnectionString("<LDAP username>:<password>@<hostname>:<port>/?authSource=$external&authMechanism=PLAIN")
val mongoClient = MongoClient.create(connectionString)
// end-ldap-connect-string

// start-ldap-mongo-cred
val credential = MongoCredential.createPlainCredential("<LDAP username>", "$external", "<password>".toCharArray())

val settings = MongoClientSettings.builder()
    .applyToClusterSettings { builder ->
        builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
    }
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
// end-ldap-mongo-cred

// OIDC

// start-oidc-azure-connect-str
val connectionString = ConnectionString(
    "mongodb://<OIDC principal>@<hostname>:<port>/?" +
        "?authMechanism=MONGODB-OIDC" +
        "&authMechanismProperties=ENVIRONMENT:azure,TOKEN_RESOURCE:<percent-encoded audience>")
val mongoClient = MongoClient.create(connectionString)
// end-oidc-azure-connect-str

// start-oidc-azure-mongo-cred
val credential = MongoCredential.createOidcCredential("<OIDC principal>")
    .withMechanismProperty("ENVIRONMENT", "azure")
    .withMechanismProperty("TOKEN_RESOURCE", "<audience>")

val mongoClient = MongoClient.create(
        MongoClientSettings.builder()
            .applyToClusterSettings { builder ->
                builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
            }
        .credential(credential)
        .build())
// end-oidc-azure-mongo-cred

// start-oidc-gcp-connect-str
val connectionString = ConnectionString(
    "mongodb://<OIDC principal>@<hostname>:<port>/?" +
            "authMechanism=MONGODB-OIDC" +
            "&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:<percent-encoded audience>")
val mongoClient = MongoClient.create(connectionString)
// end-oidc-gcp-connect-str

// start-oidc-gcp-mongo-cred
val credential = MongoCredential.createOidcCredential("<OIDC principal>")
    .withMechanismProperty("ENVIRONMENT", "gcp")
    .withMechanismProperty("TOKEN_RESOURCE", "<audience>")

val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyToClusterSettings { builder ->
            builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
        }
        .credential(credential)
        .build())
// end-oidc-gcp-mongo-cred

// start-oidc-k8s-connect-str
val connectionString = ConnectionString(
    "mongodb://<OIDC principal>@<hostname>:<port>/?" +
            "authMechanism=MONGODB-OIDC" +
            "&authMechanismProperties=ENVIRONMENT:k8s,TOKEN_RESOURCE:<percent-encoded audience>")
val mongoClient = MongoClient.create(connectionString)
// end-oidc-k8s-connect-str

// start-oidc-k8s-mongo-cred
val credential = MongoCredential.createOidcCredential("<OIDC principal>")
    .withMechanismProperty("ENVIRONMENT", "k8s")
    .withMechanismProperty("TOKEN_RESOURCE", "<audience>")

val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyToClusterSettings { builder ->
            builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
        }
        .credential(credential)
        .build())
// end-oidc-k8s-mongo-cred

// start-oidc-custom-callback
val credential = MongoCredential.createOidcCredential(null)
    .withMechanismProperty("OIDC_CALLBACK") { context: Context ->
        val accessToken = "..."
        OidcCallbackResult(accessToken)
    }
// end-oidc-custom-callback

// start-oidc-custom-callback-ex
val credential = MongoCredential.createOidcCredential(null)
    .withMechanismProperty("OIDC_CALLBACK") { context: Context ->
        val accessToken = String(Files.readAllBytes(Paths.get("access-token.dat")))
        OidcCallbackResult(accessToken)
    }

val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyToClusterSettings { builder ->
            builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
        }
        .credential(credential)
        .build()
)
// end-oidc-custom-callback-ex
