package quickstart

import org.mongodb.scala._
import org.mongodb.scala.model.Filters._
import com.mongodb.client.cursor.TimeoutMode

import scala.concurrent.duration.MILLISECONDS

object CsotExample {

  def main(args: Array[String]): Unit = {

    {
      // start-mongoclientsettings
      val settings = MongoClientSettings.builder
        .applyConnectionString(ConnectionString("<connection string>"))
        .timeout(200L, MILLISECONDS)
        .build

      val mongoClient = MongoClient(settings)
      // end-mongoclientsettings
    }
    {
      // start-string
      val uri = "<connection string>/?timeoutMS=200"
      val mongoClient = MongoClient(uri)
      // end-string
    }
    {
      // start-operation-timeout
      val settings = MongoClientSettings.builder
        .applyConnectionString(ConnectionString("<connection string>"))
        .timeout(200L, MILLISECONDS)
        .build

      val mongoClient = MongoClient(settings)
      val database = mongoClient.getDatabase("db")
      val collection = database.getCollection("people")
      collection.insertOne(Document("name" -> "Francine Loews"))
      // end-operation-timeout
    }
    {
      // start-override
      val settings = MongoClientSettings.builder
        .applyConnectionString(ConnectionString("<connection string>"))
        .timeout(200L, MILLISECONDS)
        .build

      val mongoClient = MongoClient(settings)
      val database = mongoClient.getDatabase("db")
      val collection = database
        .getCollection("people")
        .withTimeout(300L, MILLISECONDS)
      // ... perform operations on MongoCollection
      // end-override
    }
    {
      val settings = MongoClientSettings.builder
        .applyConnectionString(ConnectionString("<connection string>"))
        .timeout(200L, MILLISECONDS)
        .build

      val mongoClient = MongoClient(settings)

      // start-session-timeout
      val opts = ClientSessionOptions.builder
        .defaultTimeout(200L, MILLISECONDS)
        .build

      val session = mongoClient.startSession(opts)
      // ... perform operations on ClientSession
      // end-session-timeout

      // start-transaction-timeout
      val transactionOptions = TransactionOptions.builder
        .timeout(200L, MILLISECONDS)
        .build
      // end-transaction-timeout
    }
    {
      val settings = MongoClientSettings.builder
        .applyConnectionString(ConnectionString("<connection string>"))
        .timeout(200L, MILLISECONDS)
        .build

      val mongoClient = MongoClient(settings)
      val database = mongoClient.getDatabase("db")
      val collection = database.getCollection("people")

      // start-cursor-lifetime
      val observableWithLifetimeTimeout = collection
        .find(gte("age", 40))
        .timeoutMode(TimeoutMode.CURSOR_LIFETIME)
      // end-cursor-lifetime
    }


  }
}
