
import com.mongodb.ConnectionString
import com.mongodb.KerberosSubjectProvider
import com.mongodb.MongoClientSettings
import com.mongodb.MongoCredential
import com.mongodb.ServerAddress
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
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
        val credential = MongoCredential.createGSSAPICredential("<username>")

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
        val credential = MongoCredential.createGSSAPICredential("<username>")
            .withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "myService")
        // :snippet-end:
    }

    fun javaSubjectKey() = runBlocking {
        // :snippet-start: java-subject-key
        val loginContext = LoginContext(LOGINMODULE)
        loginContext.login()
        val subject: Subject = loginContext.subject

        val credential = MongoCredential.createGSSAPICredential("<username>")
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
        val credential = MongoCredential.createGSSAPICredential("<username>")
            .withMechanismProperty(
                MongoCredential.JAVA_SUBJECT_PROVIDER_KEY,
                KerberosSubjectProvider(myLoginContext)
            )
        // :snippet-end:
    }

    fun ldapCredential() = runBlocking {
        // :snippet-start: ldap-mongo-credential
        val credential = MongoCredential.createPlainCredential("<username>", "$external", "<password>".toCharArray())

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
        val connectionString = ConnectionString("<username>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }

    fun gssapiPropertiesConnectionString() = runBlocking {
        // :snippet-start: gssapi-properties-connection-string
        val connectionString = ConnectionString("<username>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:myService")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }

    fun ldapConnectionString() = runBlocking {
        // :snippet-start: ldap-connection-string
        val connectionString = ConnectionString("<username>:<password>@<hostname>:<port>/?authSource=$external&authMechanism=PLAIN")
        val mongoClient = MongoClient.create(connectionString)
        // :snippet-end:
    }
}
// :replace-end:

