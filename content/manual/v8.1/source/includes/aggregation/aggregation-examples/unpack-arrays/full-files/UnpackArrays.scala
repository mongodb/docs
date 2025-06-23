package org.example

import org.mongodb.scala.MongoClient
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.{Accumulators, Aggregates, Field, Filters}

object UnpackArrays {
  def main(args: Array[String]): Unit = {

    val uri = "<connection string>"
    val mongoClient = MongoClient(uri)
    Thread.sleep(1000)

    val aggDB = mongoClient.getDatabase("agg_tutorials_db")

    // start-insert-orders
    val orders = aggDB.getCollection("orders")

    orders.deleteMany(Filters.empty()).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )

    orders.insertMany(Seq(
      Document(
        "order_id" -> 6363763262239L,
        "products" -> Seq(
          Document(
            "prod_id" -> "abc12345",
            "name" -> "Asus Laptop",
            "price" -> 431
          ),
          Document(
            "prod_id" -> "def45678",
            "name" -> "Karcher Hose Set",
            "price" -> 22
          )
        )
      ),
      Document(
        "order_id" -> 1197372932325L,
        "products" -> Seq(
          Document(
            "prod_id" -> "abc12345",
            "name" -> "Asus Laptop",
            "price" -> 429
          )
        )
      ),
      Document(
        "order_id" -> 9812343774839L,
        "products" -> Seq(
          Document(
            "prod_id" -> "pqr88223",
            "name" -> "Morphy Richards Food Mixer",
            "price" -> 431
          ),
          Document(
            "prod_id" -> "def45678",
            "name" -> "Karcher Hose Set",
            "price" -> 21
          )
        )
      ),
      Document(
        "order_id" -> 4433997244387L,
        "products" -> Seq(
          Document(
            "prod_id" -> "def45678",
            "name" -> "Karcher Hose Set",
            "price" -> 23
          ),
          Document(
            "prod_id" -> "jkl77336",
            "name" -> "Picky Pencil Sharpener",
            "price" -> 1
          ),
          Document(
            "prod_id" -> "xyz11228",
            "name" -> "Russell Hobbs Chrome Kettle",
            "price" -> 16
          )
        )
      )
    )).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )
    // end-insert-orders

    Thread.sleep(1000)

    val pipeline = Seq(
      // start-unwind
      Aggregates.unwind("$products"),
      // end-unwind

      // start-match
      Aggregates.filter(Filters.gt("products.price", 15)),
      // end-match

      // start-group
      Aggregates.group(
        "$products.prod_id",
        Accumulators.first("product", "$products.name"),
        Accumulators.sum("total_value", "$products.price"),
        Accumulators.sum("quantity", 1)
      ),
      // end-group

      // start-set
      Aggregates.set(Field("product_id", "$_id")),
      // end-set

      // start-unset
      Aggregates.unset("_id")
      // end-unset
    )

    // start-run-agg
    orders.aggregate(pipeline)
      .subscribe((doc: Document) => println(doc.toJson()),
        (e: Throwable) => println(s"Error: $e"))
    // end-run-agg

    Thread.sleep(1000)
    mongoClient.close()
  }
}
