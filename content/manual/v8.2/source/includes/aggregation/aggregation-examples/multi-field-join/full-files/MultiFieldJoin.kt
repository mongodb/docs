package org.example

import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Variable
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.bson.Document
import org.bson.conversions.Bson

// start-data-classes
@Serializable
data class Product(
    val name: String,
    val variation: String,
    val category: String,
    val description: String
)

@Serializable
data class Order(
    val customerID: String,
    @Contextual val orderDate: LocalDateTime,
    val productName: String,
    val productVariation: String,
    val value: Double
)
// end-data-classes

suspend fun main() {
    val uri = "<connection string>"

    MongoClient.create(uri).use { mongoClient ->
        val aggDB = mongoClient.getDatabase("agg_tutorials_db")

        // start-insert-sample-data
        val products = aggDB.getCollection<Product>("products")
        val orders = aggDB.getCollection<Order>("orders")

        products.deleteMany(Filters.empty());
        orders.deleteMany(Filters.empty());

        products.insertMany(
            listOf(
                Product("Asus Laptop", "Ultra HD", "ELECTRONICS", "Great for watching movies"),
                Product("Asus Laptop", "Standard Display", "ELECTRONICS", "Good value laptop for students"),
                Product("The Day Of The Triffids", "1st Edition", "BOOKS", "Classic post-apocalyptic novel"),
                Product("The Day Of The Triffids", "2nd Edition", "BOOKS", "Classic post-apocalyptic novel"),
                Product(
                    "Morphy Richards Food Mixer",
                    "Deluxe",
                    "KITCHENWARE",
                    "Luxury mixer turning good cakes into great"
                )
            )
        )

        orders.insertMany(
            listOf(
                Order(
                    "elise_smith@myemail.com",
                    LocalDateTime.parse("2020-05-30T08:35:52"),
                    "Asus Laptop",
                    "Standard Display",
                    431.43
                ),
                Order(
                    "tj@wheresmyemail.com",
                    LocalDateTime.parse("2019-05-28T19:13:32"),
                    "The Day Of The Triffids",
                    "2nd Edition",
                    5.01
                ),
                Order(
                    "oranieri@warmmail.com",
                    LocalDateTime.parse("2020-01-01T08:25:37"),
                    "Morphy Richards Food Mixer",
                    "Deluxe",
                    63.13
                ),
                Order(
                    "jjones@tepidmail.com",
                    LocalDateTime.parse("2020-12-26T08:55:46"),
                    "Asus Laptop",
                    "Standard Display",
                    429.65
                )
            )
        )
        // end-insert-sample-data

        val pipeline = mutableListOf<Bson>()

        // start-embedded-pl-match1
        val embeddedPipeline = mutableListOf<Bson>()

        embeddedPipeline.add(
            Aggregates.match(
                Filters.expr(
                    Document(
                        "\$and", listOf(
                            Document("\$eq", listOf("\$${Order::productName.name}", "$\$prdname")),
                            Document("\$eq", listOf("\$${Order::productVariation.name}", "$\$prdvartn"))
                        )
                    )
                )
            )
        )
        // end-embedded-pl-match1

        // start-embedded-pl-match2
        embeddedPipeline.add(
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
        // end-embedded-pl-match2

        // start-embedded-pl-unset
        embeddedPipeline.add(Aggregates.unset("_id", Order::productName.name, Order::productVariation.name))
        // end-embedded-pl-unset

        // start-lookup
        pipeline.add(
            Aggregates.lookup(
                "orders",
                listOf(
                    Variable("prdname", "\$${Product::name.name}"),
                    Variable("prdvartn", "\$${Product::variation.name}")
                ),
                embeddedPipeline,
                "orders"
            )
        )
        // end-lookup

        // start-match
        pipeline.add(
            Aggregates.match(
                Filters.ne("orders", mutableListOf<Document>())
            )
        )
        // end-match

        // start-unset
        pipeline.add(Aggregates.unset("_id", "description"))
        // end-unset

        // start-run-agg
        val aggregationResult = products.aggregate<Document>(pipeline)
        // end-run-agg

        aggregationResult.collect { println(it) }
    }
}
