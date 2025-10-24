// Runs a MongoDB Search query by using the Kotlin sync driver

package org.example

import com.mongodb.ConnectionString
import com.mongodb.kotlin.client.MongoClient
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Aggregates.search
import com.mongodb.client.model.Projections
import com.mongodb.client.model.search.SearchOperator
import com.mongodb.client.model.search.SearchPath.fieldPath
import org.bson.Document
import org.bson.conversions.Bson

fun main() {
    val uri = "<connection string>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("movies")
    
    // begin-atlas-search
    val pipeline: List<Bson> = listOf(
        search(SearchOperator.text(
            fieldPath("title"), "Alabama")),
        project(Projections.include("title"))
    )
    
    val results = collection.aggregate(pipeline)
    
    results.forEach { doc ->
        println(doc.toJson())
    }
    // end-atlas-search
}