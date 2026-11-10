package org.example

import com.mongodb.client.model.Accumulators
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Field
import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.serialization.Serializable
import org.bson.Document
import org.bson.conversions.Bson

// start-data-classes
@Serializable
data class Order(
    val orderID: Float,
    val products: List<Product>
)

@Serializable
data class Product(
    val prodID: String,
    val name: String,
    val price: Int
)
// end-data-classes

suspend fun main() {
    val uri = "<connection string>"

    MongoClient.create(uri).use { mongoClient ->
        val aggDB = mongoClient.getDatabase("agg_tutorials_db")
        // start-insert-orders
        val orders = aggDB.getCollection<Order>("orders")
        orders.deleteMany(Filters.empty())

        orders.insertMany(
            listOf(
                Order(
                    6363763262239f, listOf(
                        Product("abc12345", "Asus Laptop", 431),
                        Product("def45678", "Karcher Hose Set", 22)
                    )
                ),
                Order(
                    1197372932325f, listOf(
                        Product("abc12345", "Asus Laptop", 429)
                    )
                ),
                Order(
                    9812343774839f, listOf(
                        Product("pqr88223", "Morphy Richards Food Mixer", 431),
                        Product("def45678", "Karcher Hose Set", 21)
                    )
                ),
                Order(
                    4433997244387f, listOf(
                        Product("def45678", "Karcher Hose Set", 23),
                        Product("jkl77336", "Picky Pencil Sharpener", 1),
                        Product("xyz11228", "Russell Hobbs Chrome Kettle", 16)
                    )
                )
            )
        )
        // end-insert-orders

        val pipeline = mutableListOf<Bson>()

        // start-unwind
        pipeline.add(
            Aggregates.unwind("\$${Order::products.name}")
        )
        // end-unwind

        // start-match
        pipeline.add(
            Aggregates.match(
                Filters.gt("${Order::products.name}.${Product::price.name}", 15)
            )
        )
        // end-match

        // start-group
        pipeline.add(
            Aggregates.group(
                "\$${Order::products.name}.${Product::prodID.name}",
                Accumulators.first("product", "\$${Order::products.name}.${Product::name.name}"),
                Accumulators.sum("total_value", "\$${Order::products.name}.${Product::price.name}"),
                Accumulators.sum("quantity", 1)
            )
        )
        // end-group

        // start-set
        pipeline.add(Aggregates.set(Field("product_id", "\$_id")))
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
