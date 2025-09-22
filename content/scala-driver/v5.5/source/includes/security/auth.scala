import org.mongodb.scala._

import java.util.Collections

object StableAPI {

  def main(args: Array[String]): Unit = {

    {
      // start-default
      val user = "<db_username>"     // the username
      val source = "<source>"     // the source where the user is defined
      val password = ...          // the password as a character array

      val credential = MongoCredential.createCredential(user, source, password)
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(Collections.singletonList(ServerAddress("localhost", 27017))))
          .credential(credential)
          .build())
      // end-default
    }

    {
      // start-default-connection-string
      val mongoClient = MongoClient("mongodb://user1:pwd1@host1/?authSource=db1")
      // end-default-connection-string
    }

    {
      // start-scram-sha-256
      val user = "<db_username>"     // the username
      val source = "<source>"     // the source where the user is defined
      val password = ...          // the password as a character array

      val credential = MongoCredential.createScramSha256Credential(user, source, password)
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(Collections.singletonList(ServerAddress("localhost", 27017))))
          .credential(credential)
          .build())
      // end-scram-sha-256
    }

    {
      // start-scram-sha-256-connection-string
      val mongoClient = MongoClient("mongodb://user1:pwd1@host1/?authSource=db1&authMechanism=SCRAM-SHA-256")
      // end-scram-sha-256-connection-string
    }

    {
      // start-scram-sha-1
      val user = "<db_username>"     // the username
      val source = "<source>"     // the source where the user is defined
      val password = ...          // the password as a character array

      val credential = MongoCredential.createScramSha1Credential(user, source, password)
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(Collections.singletonList(ServerAddress("localhost", 27017))))
          .credential(credential)
          .build())
      // end-scram-sha-1
    }

    {
      // start-scram-sha-1-connection-string
      val mongoClient = MongoClient("mongodb://user1:pwd1@host1/?authSource=db1&authMechanism=SCRAM-SHA-1")
      // end-scram-sha-1-connection-string
    }

    {
      // start-mongodb-x509
      val credential = MongoCredential.createMongoX509Credential()
      val mongoClient = MongoClient(MongoClientSettings
          .builder()
          .applyToClusterSettings(builder =>
              builder.hosts(Collections.singletonList(ServerAddress("localhost", 27017))))
          .credential(credential)
          .build())
      // end-mongodb-x509
    }

    {
      // start-mongodb-x509-connection-string
      val mongoClient = MongoClient("mongodb://subjectName@host1/?authMechanism=MONGODB-X509&ssl=true")
      // end-mongodb-x509-connection-string
    }
  }
}
