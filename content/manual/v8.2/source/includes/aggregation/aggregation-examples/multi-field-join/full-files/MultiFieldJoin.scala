package org.example

import org.mongodb.scala.MongoClient
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model.{Aggregates, Filters, Variable}

import java.text.SimpleDateFormat

object MultiFieldJoin {
  def main(args: Array[String]): Unit = {

    val uri = "<connection string>"
    val mongoClient = MongoClient(uri)
    Thread.sleep(1000)

    val aggDB = mongoClient.getDatabase("agg_tutorials_db")

    // start-insert-sample-data
    val products = aggDB.getCollection("products")
    val orders = aggDB.getCollection("orders")

    products.deleteMany(Filters.empty()).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )

    orders.deleteMany(Filters.empty()).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )

    val dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")

    products.insertMany(
      Seq(
        Document(
          "name" -> "Asus Laptop",
          "variation" -> "Ultra HD",
          "category" -> "ELECTRONICS",
          "description" -> "Great for watching movies"
        ),
        Document(
          "name" -> "Asus Laptop",
          "variation" -> "Standard Display",
          "category" -> "ELECTRONICS",
          "description" -> "Good value laptop for students"
        ),
        Document(
          "name" -> "The Day Of The Triffids",
          "variation" -> "1st Edition",
          "category" -> "BOOKS",
          "description" -> "Classic post-apocalyptic novel"
        ),
        Document(
          "name" -> "The Day Of The Triffids",
          "variation" -> "2nd Edition",
          "category" -> "BOOKS",
          "description" -> "Classic post-apocalyptic novel"
        ),
        Document(
          "name" -> "Morphy Richards Food Mixer",
          "variation" -> "Deluxe",
          "category" -> "KITCHENWARE",
          "description" -> "Luxury mixer turning good cakes into great"
        )
      )
    ).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )

    orders.insertMany(
      Seq(
        Document(
          "customer_id" -> "elise_smith@myemail.com",
          "orderdate" -> dateFormat.parse("2020-05-30T08:35:52"),
          "product_name" -> "Asus Laptop",
          "product_variation" -> "Standard Display",
          "value" -> 431.43
        ),
        Document(
          "customer_id" -> "tj@wheresmyemail.com",
          "orderdate" -> dateFormat.parse("2019-05-28T19:13:32"),
          "product_name" -> "The Day Of The Triffids",
          "product_variation" -> "2nd Edition",
          "value" -> 5.01
        ),
        Document(
          "customer_id" -> "oranieri@warmmail.com",
          "orderdate" -> dateFormat.parse("2020-01-01T08:25:37"),
          "product_name" -> "Morphy Richards Food Mixer",
          "product_variation" -> "Deluxe",
          "value" -> 63.13
        ),
        Document(
          "customer_id" -> "jjones@tepidmail.com",
          "orderdate" -> dateFormat.parse("2020-12-26T08:55:46"),
          "product_name" -> "Asus Laptop",
          "product_variation" -> "Standard Display",
          "value" -> 429.65
        )
      )
    ).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )
    // end-insert-sample-data

    Thread.sleep(1000)

    val embeddedPipeline = Seq(
      // start-embedded-pl-match1
      Aggregates.filter(
        Filters.expr(
          Filters.and(
            Document("$eq" -> Seq("$product_name", "$$prdname")),
            Document("$eq" -> Seq("$product_variation", "$$prdvartn"))
          )
        )
      ),
      // end-embedded-pl-match1

      // start-embedded-pl-match2
      Aggregates.filter(
        Filters.and(
          Filters.gte("orderdate", dateFormat.parse("2020-01-01T00:00:00")),
          Filters.lt("orderdate", dateFormat.parse("2021-01-01T00:00:00"))
        )
      ),
      // end-embedded-pl-match2

      // start-embedded-pl-unset
      Aggregates.unset("_id", "product_name", "product_variation"),
      // end-embedded-pl-unset
    )

    val pipeline = Seq(
      // start-lookup
      Aggregates.lookup(
        "orders",
        Seq(
          Variable("prdname", "$name"),
          Variable("prdvartn", "$variation"),
        ),
        embeddedPipeline,
        "orders"
      ),
      // end-lookup

      // start-match
      Aggregates.filter(Filters.ne("orders", Seq())),
      // end-match

      // start-unset
      Aggregates.unset("_id", "description")
      // end-unset
    )

    // start-run-agg
    products.aggregate(pipeline)
      .subscribe(
        (doc: Document) => println(doc.toJson()),
        (e: Throwable) => println(s"Error: $e"),
      )
    // end-run-agg

    Thread.sleep(1000)
    mongoClient.close()
  }
}
