package org.example

import com.mongodb.ConnectionString
import com.mongodb.kotlin.client.MongoClient
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.Aggregates.project
import com.mongodb.client.model.Aggregates.vectorSearch
import com.mongodb.client.model.search.FieldSearchPath
import com.mongodb.client.model.Projections
import com.mongodb.client.model.search.SearchPath.fieldPath
import org.bson.BinaryVector
import org.bson.conversions.Bson
import com.mongodb.client.model.search.VectorSearchOptions.approximateVectorSearchOptions
import org.bson.Document

fun main() {
    val uri = "<connection string>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("sample_mflix")
    val collection = database.getCollection<Document>("embedded_movies")

    // start-vs
    val vectorValues = FloatArray(1536) { i -> (i % 10).toFloat() * 0.1f }
    val queryVector = BinaryVector.floatVector(vectorValues)
    val indexName = "<vector search index>"

    // Specifies the path of the field to search
    val fieldSearchPath: FieldSearchPath = fieldPath("plot_embedding")

    // Creates the vector search pipeline stage with a limit and numCandidates
    val pipeline: List<Bson> = listOf(
        vectorSearch(
            fieldSearchPath,
            queryVector,
            indexName,
            5L, 
            approximateVectorSearchOptions(150)
        ),
        project(
            Projections.fields(
                Projections.excludeId(),
                Projections.include("title")
            )
        )
    )

    val results = collection.aggregate(pipeline)

    results.forEach { doc ->
        println(doc.toJson())
    }
    // end-vs

    // start-vs-score
    val pipeline: List<Bson> = listOf(
        vectorSearch(
            fieldSearchPath,
            queryVector,
            indexName,
            5L,
            approximateVectorSearchOptions(150)
        ),
        project(
            Projections.fields(
                Projections.excludeId(),
                Projections.include("title"),
                Projections.metaVectorSearchScore("score")
            )
        )
    )

    val results = collection.aggregate(pipeline)

    results.forEach { doc ->
        println("Title: ${doc.getString("title")}, Score: ${doc.getDouble("score")}")
    }
    // end-vs-score
}
