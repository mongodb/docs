package org.example

import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Field
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.bson.Document
import org.bson.conversions.Bson

// start-data-classes
@Serializable
data class Order(
    val customerID: String,
    @Contextual val orderDate: LocalDateTime,
    val productID: String,
    val value: Double
)

@Serializable
data class Product(
    val ID: String,
    val name: String,
    val category: String,
    val description: String
)
// end-data-classes

suspend fun main() {
    val uri = "<connection string>"

    MongoClient.create(uri).use { mongoClient ->
        val aggDB = mongoClient.getDatabase("agg_tutorials_db")
        // start-insert-sample-data
        val orders = aggDB.getCollection<Order>("orders")
        val products = aggDB.getCollection<Product>("products")

        orders.deleteMany(Filters.empty());
        products.deleteMany(Filters.empty());

        orders.insertMany(
            listOf(
                Order("elise_smith@myemail.com", LocalDateTime.parse("2020-05-30T08:35:52"), "a1b2c3d4", 431.43),
                Order("tj@wheresmyemail.com", LocalDateTime.parse("2019-05-28T19:13:32"), "z9y8x7w6", 5.01),
                Order("oranieri@warmmail.com", LocalDateTime.parse("2020-01-01T08:25:37"), "ff11gg22hh33", 63.13),
                Order("jjones@tepidmail.com", LocalDateTime.parse("2020-12-26T08:55:46"), "a1b2c3d4", 429.65)
            )
        )

        products.insertMany(
            listOf(
                Product("a1b2c3d4", "Asus Laptop", "ELECTRONICS", "Good value laptop for students"),
                Product("z9y8x7w6", "The Day Of The Triffids", "BOOKS", "Classic post-apocalyptic novel"),
                Product(
                    "ff11gg22hh33",
                    "Morphy Richardds Food Mixer",
                    "KITCHENWARE",
                    "Luxury mixer turning good cakes into great"
                ),
                Product("pqr678st", "Karcher Hose Set", "GARDEN", "Hose + nosels + winder for tidy storage")
            )
        )
        // end-insert-sample-data

        val pipeline = mutableListOf<Bson>()

        // start-match
        pipeline.add(
            Aggregates.match(
                Filters.and(
                    Filters.gte(
                        Order::orderDate.name,
                        LocalDateTime.parse("2020-01-01T00:00:00").toJavaLocalDateTime()
                    ),
                    Filters.lt(Order::orderDate.name, LocalDateTime.parse("2021-01-01T00:00:00").toJavaLocalDateTime())
                )
            )
        )
        // end-match

        // start-lookup
        pipeline.add(
            Aggregates.lookup(
                "products",
                Order::productID.name,
                Product::ID.name,
                "product_mapping"
            )
        )
        // end-lookup

        // start-set
        pipeline.add(
            Aggregates.set(Field("product_mapping", Document("\$first", "\$product_mapping")))
        )

        pipeline.add(
            Aggregates.set(
                Field("product_name", "\$product_mapping.name"),
                Field("product_category", "\$product_mapping.category")
            )
        )
        // end-set

        // start-unset
        pipeline.add(Aggregates.unset("_id", Order::productID.name, "product_mapping"))
        // end-unset

        // start-run-agg
        val aggregationResult = orders.aggregate<Document>(pipeline)
        // end-run-agg

        aggregationResult.collect { println(it) }
    }
}
