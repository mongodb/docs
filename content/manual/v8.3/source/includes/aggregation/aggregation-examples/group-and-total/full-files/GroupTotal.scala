package org.example

import org.mongodb.scala.MongoClient
import org.mongodb.scala.bson.Document
import org.mongodb.scala.model._

import java.text.SimpleDateFormat

object GroupTotal {

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

    val dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")

    orders.insertMany(Seq(
      Document("customer_id" -> "elise_smith@myemail.com",
        "orderdate" -> dateFormat.parse("2020-05-30T08:35:52"),
        "value" -> 231),
      Document("customer_id" -> "elise_smith@myemail.com",
        "orderdate" -> dateFormat.parse("2020-01-13T09:32:07"),
        "value" -> 99),
      Document("customer_id" -> "oranieri@warmmail.com",
        "orderdate" -> dateFormat.parse("2020-01-01T08:25:37"),
        "value" -> 63),
      Document("customer_id" -> "tj@wheresmyemail.com",
        "orderdate" -> dateFormat.parse("2019-05-28T19:13:32"),
        "value" -> 2),
      Document("customer_id" -> "tj@wheresmyemail.com",
        "orderdate" -> dateFormat.parse("2020-11-23T22:56:53"),
        "value" -> 187),
      Document("customer_id" -> "tj@wheresmyemail.com",
        "orderdate" -> dateFormat.parse("2020-08-18T23:04:48"),
        "value" -> 4),
      Document("customer_id" -> "elise_smith@myemail.com",
        "orderdate" -> dateFormat.parse("2020-12-26T08:55:46"),
        "value" -> 4),
      Document("customer_id" -> "tj@wheresmyemail.com",
        "orderdate" -> dateFormat.parse("2021-02-28T07:49:32"),
        "value" -> 1024),
      Document("customer_id" -> "elise_smith@myemail.com",
        "orderdate" -> dateFormat.parse("2020-10-03T13:49:44"),
        "value" -> 102)
    )).subscribe(
      _ => {},
      e => println("Error: " + e.getMessage),
    )
    // end-insert-orders

    Thread.sleep(1000)

    val pipeline = Seq(
      // start-match
      Aggregates.filter(Filters.and(
        Filters.gte("orderdate", dateFormat.parse("2020-01-01T00:00:00")),
        Filters.lt("orderdate", dateFormat.parse("2021-01-01T00:00:00"))
      )),
      // end-match
      // start-sort1
      Aggregates.sort(Sorts.ascending("orderdate")),
      // end-sort1
      // start-group
      Aggregates.group(
        "$customer_id",
        Accumulators.first("first_purchase_date", "$orderdate"),
        Accumulators.sum("total_value", "$value"),
        Accumulators.sum("total_orders", 1),
        Accumulators.push("orders", Document("orderdate" -> "$orderdate", "value" -> "$value"))
      ),
      // end-group
      // start-sort2
      Aggregates.sort(Sorts.ascending("first_purchase_date")),
      // end-sort2
      // start-set
      Aggregates.set(Field("customer_id", "$_id")),
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
