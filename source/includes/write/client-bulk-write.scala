package quickstart

import org.mongodb.scala._
import org.mongodb.scala.model.Filters._
import com.mongodb.client.model.bulk.{ClientBulkWriteOptions, ClientBulkWriteResult, ClientNamespacedWriteModel}
import org.mongodb.scala.model.Updates._

object Main {

  def main(args: Array[String]): Unit = {
    val mongoClient = MongoClient("<connection string>")

    {
      // start-insert-models
      val personToInsert = ClientNamespacedWriteModel.insertOne(
        MongoNamespace("db", "people"),
        Document("name" -> "Julia Smith")
      )

      val thingToInsert = ClientNamespacedWriteModel.insertOne(
        MongoNamespace("db", "things"),
        Document("object" -> "washing machine")
      );
      // end-insert-models
    }
    {
      // start-update-models
      val personUpdate = ClientNamespacedWriteModel.updateOne(
        MongoNamespace("db", "people"),
        equal("name", "Freya Polk"),
        inc("age", 1)
      )

      val thingUpdate = ClientNamespacedWriteModel.updateMany(
        MongoNamespace("db", "things"),
        equal("category", "electronic"),
        set("manufacturer", "Premium Technologies")
      )
      // end-update-models
    }

    {
      // start-replace-models
      val personReplacement = ClientNamespacedWriteModel.replaceOne(
        MongoNamespace("db", "people"),
        equal("_id", 1),
        Document("name" -> "Frederic Hilbert")
      )

      val thingReplacement = ClientNamespacedWriteModel.replaceOne(
        MongoNamespace("db", "things"),
        equal("_id", 1),
        Document("object" -> "potato")
      )
      // end-replace-models
    }

    {
      // start-perform
      val peopleNamespace = MongoNamespace("db", "people")
      val thingsNamespace = MongoNamespace("db", "things")

      val writeModels = List(
        ClientNamespacedWriteModel.insertOne(
          peopleNamespace,
          Document("name" -> "Corey Kopper")
        ),
        ClientNamespacedWriteModel.replaceOne(
          thingsNamespace,
          equal("_id", 1),
          Document("object" -> "potato")
        )
      )

      val observable = mongoClient.bulkWrite(writeModels)

      observable.subscribe(
        (result: ClientBulkWriteResult) => println(result.toString),
        (error: Throwable) => println(s"Error: ${error.getMessage}"),
        () => println("Completed")
      )
      // end-perform
    }
    {
      // start-options
      val namespace = MongoNamespace("db", "people")

      val options = ClientBulkWriteOptions.clientBulkWriteOptions().ordered(false)

      val writeModels = List(
        ClientNamespacedWriteModel.insertOne(namespace, Document("_id" -> 1, "name" -> "Rudra Suraj")),
        // Causes a duplicate key error
        ClientNamespacedWriteModel.insertOne(namespace, Document("_id" -> 1, "name" -> "Mario Bianchi")),
        ClientNamespacedWriteModel.insertOne(namespace, Document("name" -> "Wendy Zhang"))
      )

      val observable = mongoClient.bulkWrite(writeModels, options)
      // end-options
    }

    Thread.sleep(1000)
    mongoClient.close()

  }

}
