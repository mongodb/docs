import com.mongodb.KerberosSubjectProvider
import org.mongodb.scala._

import javax.security.auth.Subject
import javax.security.auth.login.LoginContext

import scala.jdk.CollectionConverters._

object Kerberos {

  def main(args: Array[String]): Unit = {

    {
      // start-gssapi-connect-string
      val mongoClient = MongoClient(
        "mongodb://<Kerberos principal>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI"
      )
      // end-gssapi-connect-string
    }

    {
      // start-gssapi-mongo-cred
      val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(List(new ServerAddress("<hostname>", <port>)).asJava))
          .credential(credential)
          .build())
      // end-gssapi-mongo-cred
    }

    {
      // start-gssapi-properties-connect-string
      val mongoClient = MongoClient(
        "mongodb://<Kerberos principal>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:myService"
      )
      // end-gssapi-properties-connect-string
    }

    {
      // start-gssapi-service-name-key
      val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
          .withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "myService")
      // end-gssapi-service-name-key
    }

    {
      // start-gssapi-java-subject-key
      val loginContext = new LoginContext("<LoginModule implementation from JAAS config>")
      loginContext.login()
      val subject: Subject = loginContext.getSubject()

      val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
          .withMechanismProperty(MongoCredential.JAVA_SUBJECT_KEY, subject)
      // end-gssapi-java-subject-key
    }

    {
      // start-gssapi-java-subject-provider
      /* All MongoClient instances sharing this instance of KerberosSubjectProvider
      will share a Kerberos ticket cache */
      val myLoginContext = "myContext"
      /* Login context defaults to "com.sun.security.jgss.krb5.initiate"
      if unspecified in KerberosSubjectProvider */
      val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
          .withMechanismProperty(
              MongoCredential.JAVA_SUBJECT_PROVIDER_KEY,
              new KerberosSubjectProvider(myLoginContext)
          )
      // end-gssapi-java-subject-provider
    }

  }
}
