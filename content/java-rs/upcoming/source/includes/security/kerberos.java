import com.mongodb.KerberosSubjectProvider;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import java.util.Arrays;
import javax.security.auth.Subject;
import javax.security.auth.login.LoginContext;

public class Kerberos {

    public void runGssapiConnectionString() {
        // start-gssapi-connection-string
        MongoClient mongoClient = MongoClients
            .create("<username>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI");
        // end-gssapi-connection-string
    }

    public void runGssapiMongoCredential() {
        // start-gssapi-mongocredential
        MongoCredential credential = MongoCredential.createGSSAPICredential("<username>");

        MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                        builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
                .credential(credential)
                .build());
        // end-gssapi-mongocredential
    }

    public void runGssapiConnectionStringProperties() {
        // start-gssapi-connection-string-properties
        MongoClient mongoClient = MongoClients
            .create("<username>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:myService");
        // end-gssapi-connection-string-properties
    }

    public void runGssapiServiceKey() {
        // start-gssapi-service-key
        MongoCredential credential = MongoCredential
            .createGSSAPICredential("<username>");
        credential = credential
            .withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "<myService>");
        // end-gssapi-service-key
    }

    public void runGssapiSubjectKey() throws Exception {
        // start-gssapi-subject-key
        LoginContext loginContext = new LoginContext(<LoginModule implementation from JAAS config>);
        loginContext.login();
        Subject subject = loginContext.getSubject();

        MongoCredential credential = MongoCredential
            .createGSSAPICredential("<username>");
        credential = credential
            .withMechanismProperty(MongoCredential.JAVA_SUBJECT_KEY, subject);
        // end-gssapi-subject-key
    }

    public void runGssapiTicketCache() {
        // start-gssapi-ticket-cache
        /* All MongoClient instances sharing this instance of KerberosSubjectProvider
        will share a Kerberos ticket cache */
        String myLoginContext = "myContext";
        MongoCredential credential = MongoCredential
            .createGSSAPICredential("<username>");

        /* Login context defaults to "com.sun.security.jgss.krb5.initiate"
        if unspecified in KerberosSubjectProvider */
        credential = credential
            .withMechanismProperty(MongoCredential.JAVA_SUBJECT_PROVIDER_KEY,
                new KerberosSubjectProvider(myLoginContext));
        // end-gssapi-ticket-cache
    }

}