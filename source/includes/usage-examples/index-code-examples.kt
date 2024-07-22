package org.example
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.ClusteredIndexOptions
import com.mongodb.client.model.Filters.*
import com.mongodb.client.model.IndexOptions
import com.mongodb.client.model.Indexes
import com.mongodb.client.*
import com.mongodb.kotlin.client.MongoClient
import org.bson.Document

fun main() {
    val uri = "<connection string URI>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .retryWrites(true)
        .build()

    val mongoClient = MongoClient.create(settings)
    val database = mongoClient.getDatabase("<database name>")
    val collection = database.getCollection<Document>("<collection name>")

    // start-single-field
    collection.createIndex(Indexes.ascending("<field name>"))
    // end-single-field

    // start-compound
    collection.createIndex(Indexes.ascending("<field name 1>", "<field name 2>"))
    // end-compound

    // start-multikey
    collection.createIndex(Indexes.ascending("<array field name>"))
    // end-multikey

    // start-search-create
    val index = Document("mappings", Document("dynamic", true))
    collection.createSearchIndex("<index name>", index)
    // end-search-create

    // start-search-list
    val results = collection.listSearchIndexes()

    results.forEach { result ->
        println(result)
    }
    // end-search-list

    // start-search-update
    val newIndex = Document("mappings", Document("dynamic", true))
    collection.updateSearchIndex("<index name>", newIndex)
    // end-search-update

    // start-search-delete
    collection.dropIndex("<index name>")
    // end-search-delete

    // start-text
    collection.createIndex(Indexes.text("<field name>"))
    // end-text

    // start-geo
    collection.createIndex(Indexes.geo2dsphere("<GeoJSON object field>"))
    // end-geo

    // start-unique
    val indexOptions = IndexOptions().unique(true)
    collection.createIndex(Indexes.ascending("<field name>"), indexOptions)
    // end-unique

    // start-wildcard
    collection.createIndex(Indexes.ascending("$**"))
    // end-wildcard

    // start-clustered
    val clusteredIndexOptions = ClusteredIndexOptions(
        Indexes.ascending("_id"),
        true
    )

    val collection = database.createCollection("<collection name>", clusteredIndexOptions)
    // end-clustered

    // start-remove
    collection.dropIndex("<index name>")
    // end-remove
}
