package org.example

import com.mongodb.ConnectionString
import com.mongodb.kotlin.client.MongoClient
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Aggregates.searchMeta
import com.mongodb.client.model.search.SearchOperator
import com.mongodb.client.model.search.SearchPath.fieldPath
import com.mongodb.kotlin.client.MongoCollection
import org.bson.Document

fun runAtlasTextSearchMeta(collection: MongoCollection<Document>) {
    val textSearchMeta =
        // begin atlasSearchMeta
        searchMeta(
            SearchOperator.near(2010, 1, fieldPath("year"))
        )
        // end atlasSearchMeta

    val aggregateStages = listOf(textSearchMeta)
    println("aggregateStages: $aggregateStages")

    collection.aggregate(aggregateStages).forEach { result -> 
        println(result)
    }
}

fun main() {
    val uri = "<connection string>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    MongoClient.create(settings).use { mongoClient ->
        val database = mongoClient.getDatabase("sample_mflix")
        val collection = database.getCollection<Document>("movies")

        runAtlasTextSearchMeta(collection)
    }
}