package org.example
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.*
import com.mongodb.kotlin.client.MongoClient
import org.bson.json.JsonWriterSettings
import java.util.Date
import org.bson.Document

fun main() {
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)

    // start-create-time-series
    val database = mongoClient.getDatabase("fall_weather")

    val tsOptions = TimeSeriesOptions("timestamp")
    val collectionOptions = CreateCollectionOptions().timeSeriesOptions(tsOptions)

    database.createCollection("october2024", collectionOptions)
    // end-create-time-series

    // start-print-time-series
    val results = database.listCollections()
    val jsonSettings = JsonWriterSettings.builder().indent(true).build()

    results.forEach { result ->
        println(result.toJson(jsonSettings))
    }
    // end-print-time-series

    // start-insert-time-series-data
    val collection = database.getCollection<Document>("october2024")

    // Temperature data for October 1, 2024
    val temperature1 = Document("temperature", 54)
                        .append("location", "New York City")
                        .append("timestamp", Date(1727755200000))

    // Temperature data for October 2, 2024
    val temperature2 = Document("temperature", 55)
                        .append("location", "New York City")
                        .append("timestamp", Date(1727841600000))

    collection.insertMany(listOf(temperature1, temperature2))
    // end-insert-time-series-data
}

