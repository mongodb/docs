import org.mongodb.scala._
import org.mongodb.scala.bson.{Document, ObjectId}
import org.mongodb.scala.gridfs.GridFSBucket
import org.mongodb.scala.model._

import java.nio.ByteBuffer
import java.nio.charset.StandardCharsets
import java.util.concurrent.TimeUnit
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import scala.jdk.CollectionConverters.SeqHasAsJava

object DatabasesCollections {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string URI>")

    // start-access-database
    val database = mongoClient.getDatabase("test_database")
    // end-access-database

    {
      // start-access-collection
      val collection = database.getCollection("test_collection")
      // end-access-collection
    }

    {
      // start-create-collection
      val createObservable = database.createCollection("example_collection")
      Await.result(createObservable.toFuture(), Duration(10, TimeUnit.SECONDS))
      // end-create-collection
    }

    {
      // start-find-collections
      val results = Await.result(database.listCollections().toFuture(), Duration(10, TimeUnit.SECONDS))
      results.foreach(println)
      // end-find-collections
    }

    {
      // start-find-collection-names
      val results = Await.result(database.listCollectionNames().toFuture(), Duration(10, TimeUnit.SECONDS))
      results.foreach(println)
      // end-find-collection-names
    }

    {
      // start-delete-collection
      val deleteObservable = database.getCollection("test_collection").drop()
      Await.result(deleteObservable.toFuture(), Duration(10, TimeUnit.SECONDS))
      // end-delete-collection
    }

    {

      // start-database-read-prefs
      val databaseWithReadPrefs =
          mongoClient.getDatabase("test_database").withReadPreference(ReadPreference.secondary())
      // end-database-read-prefs

      // start-collection-read-prefs
      val collectionWithReadPrefs =
          database.getCollection("test_collection").withReadPreference(ReadPreference.secondary())
      // end-collection-read-prefs

    }

    {
      // start-tags
      val tag1 = new Tag("dc", "ny")
      val tag2 = new Tag("dc", "sf")
      val tagSet = new TagSet(List(tag1, tag2).asJava)

      val connectionString = ConnectionString("<connection string URI>")
      val readPreference = ReadPreference.primaryPreferred(tagSet)

      val mongoClientSettings = MongoClientSettings.builder()
        .applyConnectionString(connectionString)
        .readPreference(readPreference)
        .build()

      val clientWithTags = MongoClient(mongoClientSettings)
      // end-tags
    }

    {
      // start-local-threshold
      val connectionString = ConnectionString("mongodb://localhost:27017")

      val mongoClientSettings = MongoClientSettings.builder()
        .applyConnectionString(connectionString)
        .applyToClusterSettings(builder => builder.localThreshold(35, TimeUnit.MILLISECONDS))
        .build()

      val client = MongoClient(mongoClientSettings)
      // end-local-threshold
    }

    Thread.sleep(1000)
    mongoClient.close()
  }
}
