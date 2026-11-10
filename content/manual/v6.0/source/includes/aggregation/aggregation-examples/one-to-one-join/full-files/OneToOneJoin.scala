package org.example

import org.mongodb.scala.MongoClient
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.{Aggregates, Field, Filters}

import java.text.SimpleDateFormat

object OneToOneJoin {
  def main(args: Array[String]): Unit = {

    val uri = "<connection string>"
    val mongoClient = MongoClient(uri)
    Thread.sleep(1000)

    val aggDB = mongoClient.getDatabase("agg_tutorials_db")

    // start-insert-sample-data
    val orders = aggDB.getCollection("orders")
    val products = aggDB.getCollection("products")

    orders.deleteMany(Filters.empty()).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )

    products.deleteMany(Filters.empty()).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )

    val dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")

    orders.insertMany(
      Seq(
        Document(
          "customer_id" -> "elise_smith@myemail.com",
          "orderdate" -> dateFormat.parse("2020-05-30T08:35:52"),
          "product_id" -> "a1b2c3d4",
          "value" -> 431.43
        ),
        Document(
          "customer_id" -> "tj@wheresmyemail.com",
          "orderdate" -> dateFormat.parse("2019-05-28T19:13:32"),
          "product_id" -> "z9y8x7w6",
          "value" -> 5.01
        ),
        Document(
          "customer_id" -> "oranieri@warmmail.com",
          "orderdate" -> dateFormat.parse("2020-01-01T08:25:37"),
          "product_id" -> "ff11gg22hh33",
          "value" -> 63.13
        ),
        Document(
          "customer_id" -> "jjones@tepidmail.com",
          "orderdate" -> dateFormat.parse("2020-12-26T08:55:46"),
          "product_id" -> "a1b2c3d4",
          "value" -> 429.65
        )
      )
    ).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )

    products.insertMany(
      Seq(
        Document(
          "id" -> "a1b2c3d4",
          "name" -> "Asus Laptop",
          "category" -> "ELECTRONICS",
          "description" -> "Good value laptop for students"
        ),
        Document(
          "id" -> "z9y8x7w6",
          "name" -> "The Day Of The Triffids",
          "category" -> "BOOKS",
          "description" -> "Classic post-apocalyptic novel"
        ),
        Document(
          "id" -> "ff11gg22hh33",
          "name" -> "Morphy Richardds Food Mixer",
          "category" -> "KITCHENWARE",
          "description" -> "Luxury mixer turning good cakes into great"
        ),
        Document(
          "id" -> "pqr678st",
          "name" -> "Karcher Hose Set",
          "category" -> "GARDEN",
          "description" -> "Hose + nosels + winder for tidy storage"
        )
      )
    ).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )
    // end-insert-sample-data

    Thread.sleep(1000)

    val pipeline = Seq(
      // start-match
      Aggregates.filter(Filters.and(
        Filters.gte("orderdate", dateFormat.parse("2020-01-01T00:00:00")),
        Filters.lt("orderdate", dateFormat.parse("2021-01-01T00:00:00"))
      )),
      // end-match

      // start-lookup
      Aggregates.lookup(
        "products",
        "product_id",
        "id",
        "product_mapping"
      ),
      // end-lookup

      // start-set
      Aggregates.set(Field("product_mapping", Document("$first" -> "$product_mapping"))),
      Aggregates.set(
        Field("product_name", "$product_mapping.name"),
        Field("product_category", "$product_mapping.category")
      ),
      // end-set

      // start-unset
      Aggregates.unset("_id", "product_id", "product_mapping")
      // end-unset
    )

    // start-run-agg
    orders.aggregate(pipeline)
      .subscribe(
        (doc: Document) => println(doc.toJson()),
        (e: Throwable) => println(s"Error: $e"),
      )
    // end-run-agg

    Thread.sleep(1000)
    mongoClient.close()
  }
}
