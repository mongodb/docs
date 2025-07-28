
import com.mongodb.ConnectionString
import com.mongodb.KerberosSubjectProvider
import com.mongodb.MongoClientSettings
import com.mongodb.MongoCredential
import com.mongodb.MongoCredential.OidcCallbackResult
import com.mongodb.ServerAddress
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import java.nio.file.Files
import java.nio.file.Paths
import javax.naming.Context
import javax.security.auth.Subject
import javax.security.auth.login.LoginContext
import kotlin.test.Ignore

// :replace-start: {
//    "terms": {
//       "PORT": "<port>",
//       "LOGINMODULE": "\"<LoginModule implementation from JAAS config>\""
//    }
// }


/* NOTE: Enterprise authentication examples will not be tested.
*  Like the Java examples, we're relying on technical reviewers
*  to ensure accuracy.
*/

@Ignore
internal class EnterpriseAuthTest {

    val PORT = 27017
    val LOGINMODULE = "loginModule"
    val external = "external"


    fun createGSSAPICred() = runBlocking {
        // :snippet-start: auth-creds-gssapi
        val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")

        val settings = MongoClientSettings.builder()
                .applyToClusterSettings { builder ->
                    builder.hosts(listOf(ServerAddress("<hostname>", PORT)))
                }
                .credential(credential)
                .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
    }

    fun serviceNameKey() = runBlocking {
        // :snippet-start: service-name-key
        val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
            .withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "myService")
        // :snippet-end:
    }

    fun javaSubjectKey() = runBlocking {
        // :snippet-start: java-subject-key
        val loginContext = LoginContext(LOGINMODULE)
        loginContext.login()
        val subject: Subject = loginContext.subject

        val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
            .withMechanismProperty(MongoCredential.JAVA_SUBJECT_KEY, subject)
        // :snippet-end:
    }

    fun kerberosSubjectProvider() = runBlocking {
        // :snippet-start: kerberos-subject-provider
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
        // :snippet-end:
    }

    fun ldapCredential() = runBlocking {
        // :snippet-start: ldap-mongo-credential
        val credential = MongoCredential.createPlainCredential("<LDAP username>", "$external", "<password>".toCharArray())

        val settings = MongoClientSettings.builder()
            .applyToClusterSettings { builder ->
                builder.hosts(listOf(ServerAddress("<hostname>", PORT)))
            }
            .credential(credential)
            .build()

        val mongoClient = MongoClient.create(settings)
        // :snippet-end:
    }

    fun gssapiConnectionString() = runBlocking {
        // :snippet-start: gssapi-connection-string
        val connectionString = ConnectionString("<Kerberos principal>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }

    fun gssapiPropertiesConnectionString() = runBlocking {
        // :snippet-start: gssapi-properties-connection-string
        val connectionString = ConnectionString("<Kerberos principal>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:myService")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }

    fun ldapConnectionString() = runBlocking {
        // :snippet-start: ldap-connection-string
        val connectionString = ConnectionString("<LDAP username>:<password>@<hostname>:<port>/?authSource=$external&authMechanism=PLAIN")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }

    fun oidcAzureConnectionString() = runBlocking {
        // :snippet-start: oidc-azure-connection-string
        val connectionString = ConnectionString(
            "mongodb://<OIDC principal>@<hostname>:<port>/?" +
                "?authMechanism=MONGODB-OIDC" +
                "&authMechanismProperties=ENVIRONMENT:azure,TOKEN_RESOURCE:<percent-encoded audience>")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }

    fun oidcAzureCredential() = runBlocking {
        // :snippet-start: oidc-azure-credential
        val credential = MongoCredential.createOidcCredential("<OIDC principal>")
            .withMechanismProperty("ENVIRONMENT", "azure")
            .withMechanismProperty("TOKEN_RESOURCE", "<audience>")

        val mongoClient = MongoClient.create(
                MongoClientSettings.builder()
                    .applyToClusterSettings { builder ->
                        builder.hosts(listOf(ServerAddress("<hostname>", PORT)))
                    }
                .credential(credential)
                .build())
        // :snippet-end:
    }

    fun oidcGCPConnectionString() = runBlocking {
        // :snippet-start: oidc-gcp-connection-string
        val connectionString = ConnectionString(
            "mongodb://<OIDC principal>@<hostname>:<port>/?" +
                    "authMechanism=MONGODB-OIDC" +
                    "&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:<percent-encoded audience>")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }

    fun oidcGCPCredential() = runBlocking {
        // :snippet-start: oidc-gcp-credential
        val credential = MongoCredential.createOidcCredential("<OIDC principal>")
            .withMechanismProperty("ENVIRONMENT", "gcp")
            .withMechanismProperty("TOKEN_RESOURCE", "<audience>")

        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyToClusterSettings { builder ->
                    builder.hosts(listOf(ServerAddress("<hostname>", PORT)))
                }
                .credential(credential)
                .build())
        // :snippet-end:
    }

    fun oidcKubernetesConnectionString() = runBlocking {
        // :snippet-start: oidc-k8s-connection-string
        val connectionString = ConnectionString(
            "mongodb://<OIDC principal>@<hostname>:<port>/?" +
                    "authMechanism=MONGODB-OIDC" +
                    "&authMechanismProperties=ENVIRONMENT:k8s,TOKEN_RESOURCE:<percent-encoded audience>")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }

    fun oidcKubernetesCredential() = runBlocking {
        // :snippet-start: oidc-k8s-credential
        val credential = MongoCredential.createOidcCredential("<OIDC principal>")
            .withMechanismProperty("ENVIRONMENT", "k8s")
            .withMechanismProperty("TOKEN_RESOURCE", "<audience>")

        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyToClusterSettings { builder ->
                    builder.hosts(listOf(ServerAddress("<hostname>", PORT)))
                }
                .credential(credential)
                .build())
        // :snippet-end:
    }

    fun oidcCallback() = runBlocking {
        // :snippet-start: oidc-callback
        val credential = MongoCredential.createOidcCredential(null)
            .withMechanismProperty("OIDC_CALLBACK") { context: Context ->
                val accessToken = "..."
                OidcCallbackResult(accessToken)
            }
        // :snippet-end:
    }

    fun oidcCallbackFile() = runBlocking {
        // :snippet-start: oidc-callback-file
        val credential = MongoCredential.createOidcCredential(null)
            .withMechanismProperty("OIDC_CALLBACK") { context: Context ->
                val accessToken = String(Files.readAllBytes(Paths.get("access-token.dat")))
                OidcCallbackResult(accessToken)
            }

        val mongoClient = MongoClient.create(
            MongoClientSettings.builder()
                .applyToClusterSettings { builder ->
                    builder.hosts(listOf(ServerAddress("<hostname>", PORT)))
                }
                .credential(credential)
                .build()
        )
        // :snippet-end:
    }
}
// :replace-end:

