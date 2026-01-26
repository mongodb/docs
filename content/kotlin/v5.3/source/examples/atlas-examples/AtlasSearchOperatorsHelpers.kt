package org.example

import com.mongodb.ConnectionString
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Projections
import com.mongodb.client.model.search.SearchOperator
import com.mongodb.client.model.search.SearchPath.fieldPath
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() = runBlocking {
    val uri = "<connection string>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    MongoClient.create(settings).use { mongoClient ->
        val database = mongoClient.getDatabase("sample_mflix")
        val collection = database.getCollection<Document>("movies")

        // start-atlas-searchoperator-helpers 
        val searchStage = Aggregates.search(
            SearchOperator.compound()
                .filter(
                    listOf(
                        SearchOperator.`in`(fieldPath("genres"), listOf("Comedy")),
                        SearchOperator.phrase(fieldPath("fullplot"), "new york"),
                        SearchOperator.numberRange(fieldPath("year")).gtLt(1950, 2000),
                        SearchOperator.wildcard(fieldPath("title"), "Love *")
                    )
                )
        )

        val projectStage = Aggregates.project(
            Projections.include("title", "year", "genres"))

        val pipeline = listOf(searchStage, projectStage)
        val results = collection.aggregate(pipeline)
        // end-atlas-searchoperator-helpers
        results.collect { result -> 
            println(result) 
        }
    }
}