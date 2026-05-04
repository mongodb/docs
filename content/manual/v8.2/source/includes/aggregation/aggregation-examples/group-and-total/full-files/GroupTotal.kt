package org.example

import com.mongodb.client.model.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.bson.Document
import org.bson.conversions.Bson

// start-data-class
@Serializable
data class Order(
    val customerID: String,
    @Contextual val orderDate: LocalDateTime,
    val value: Int
)
// end-data-class

suspend fun main() {
    val uri = "<connection string>"

    MongoClient.create(uri).use { mongoClient ->
        val aggDB = mongoClient.getDatabase("agg_tutorials_db")
        // start-insert-orders
        val orders = aggDB.getCollection<Order>("orders")
        orders.deleteMany(Filters.empty())

        orders.insertMany(
            listOf(
                Order("elise_smith@myemail.com", LocalDateTime.parse("2020-05-30T08:35:52"), 231),
                Order("elise_smith@myemail.com", LocalDateTime.parse("2020-01-13T09:32:07"), 99),
                Order("oranieri@warmmail.com", LocalDateTime.parse("2020-01-01T08:25:37"), 63),
                Order("tj@wheresmyemail.com", LocalDateTime.parse("2019-05-28T19:13:32"), 2),
                Order("tj@wheresmyemail.com", LocalDateTime.parse("2020-11-23T22:56:53"), 187),
                Order("tj@wheresmyemail.com", LocalDateTime.parse("2020-08-18T23:04:48"), 4),
                Order("elise_smith@myemail.com", LocalDateTime.parse("2020-12-26T08:55:46"), 4),
                Order("tj@wheresmyemail.com", LocalDateTime.parse("2021-02-28T07:49:32"), 1024),
                Order("elise_smith@myemail.com", LocalDateTime.parse("2020-10-03T13:49:44"), 102)
            )
        )
        // end-insert-orders

        val pipeline = mutableListOf<Bson>()

        // start-match
        pipeline.add(
            Aggregates.match(
                Filters.and(
                    Filters.gte(Order::orderDate.name, LocalDateTime.parse("2020-01-01T00:00:00").toJavaLocalDateTime()),
                    Filters.lt(Order::orderDate.name, LocalDateTime.parse("2021-01-01T00:00:00").toJavaLocalDateTime())
                )
            )
        )
        // end-match

        // start-sort1
        pipeline.add(Aggregates.sort(Sorts.ascending(Order::orderDate.name)))
        // end-sort1

        // start-group
        pipeline.add(
            Aggregates.group(
                "\$${Order::customerID.name}",
                Accumulators.first("first_purchase_date", "\$${Order::orderDate.name}"),
                Accumulators.sum("total_value", "\$${Order::value.name}"),
                Accumulators.sum("total_orders", 1),
                Accumulators.push(
                    "orders",
                    Document("orderdate", "\$${Order::orderDate.name}")
                        .append("value", "\$${Order::value.name}")
                )
            )
        )
        // end-group

        // start-sort2
        pipeline.add(Aggregates.sort(Sorts.ascending("first_purchase_date")))
        // end-sort2

        // start-set
        pipeline.add(Aggregates.set(Field("customer_id", "\$_id")))
        // end-set

        // start-unset
        pipeline.add(Aggregates.unset("_id"))
        // end-unset

        // start-run-agg
        val aggregationResult = orders.aggregate<Document>(pipeline)
        // end-run-agg

        aggregationResult.collect { println(it) }
    }
}
