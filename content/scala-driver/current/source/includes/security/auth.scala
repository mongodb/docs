import org.mongodb.scala._

import java.util.Collections

object StableAPI {

  def main(args: Array[String]): Unit = {

    {
      // start-default
      val user = "<db_username>"          // the username
      val source = "<authenticationDb>"   // the authentication database
      val password = ...                  // the password as a character array

      val credential = MongoCredential.createCredential(user, source, password)
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(Collections.singletonList(ServerAddress("<hostname>", <port>))))
          .credential(credential)
          .build())
      // end-default
    }

    {
      // start-default-connection-string
      val mongoClient = MongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>")
      // end-default-connection-string
    }

    {
      // start-scram-sha-256
      val user = "<db_username>"          // the username
      val source = "<authenticationDb>"   // the authentication database
      val password = ...                  // the password as a character array

      val credential = MongoCredential.createScramSha256Credential(user, source, password)
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(Collections.singletonList(ServerAddress("<hostname>", <port>))))
          .credential(credential)
          .build())
      // end-scram-sha-256
    }

    {
      // start-scram-sha-256-connection-string
      val mongoClient = MongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=SCRAM-SHA-256")
      // end-scram-sha-256-connection-string
    }

    {
      // start-scram-sha-1
      val user = "<db_username>"          // the username
      val source = "<authenticationDb>"   // the authentication database
      val password = ...                  // the password as a character array

      val credential = MongoCredential.createScramSha1Credential(user, source, password)
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(Collections.singletonList(ServerAddress("<hostname>", <port>))))
          .credential(credential)
          .build())
      // end-scram-sha-1
    }

    {
      // start-scram-sha-1-connection-string
      val mongoClient = MongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=SCRAM-SHA-1")
      // end-scram-sha-1-connection-string
    }

    {
      // start-mongodb-x509
      val credential = MongoCredential.createMongoX509Credential()
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(Collections.singletonList(ServerAddress("<hostname>", <port>))))
          .applyToSslSettings(builder =>
              builder.enabled(true))
          .credential(credential)
          .build())
      // end-mongodb-x509
    }

    {
      // start-mongodb-x509-connection-string
      val mongoClient = MongoClient("mongodb://<hostname>:<port>/?authMechanism=MONGODB-X509&tls=true")
      // end-mongodb-x509-connection-string
    }

    {
      // start-ldap-connection-string
      val mongoClient = MongoClient("mongodb://<ldap_username>:<password>@<hostname>:<port>/?authSource=$external&authMechanism=PLAIN")
      // end-ldap-connection-string
    }

    {
      // start-ldap-mongo-credential
      val credential = MongoCredential.createPlainCredential(
          "<ldap_username>", "$external", "<password>".toCharArray())
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(Collections.singletonList(
                  ServerAddress("<hostname>", <port>))))
          .credential(credential)
          .build())
      // end-ldap-mongo-credential
    }
  }
}
