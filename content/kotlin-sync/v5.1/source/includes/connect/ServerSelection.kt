package org.example
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.connection.ClusterDescription
import com.mongodb.connection.ServerDescription
import com.mongodb.connection.ServerType
import com.mongodb.kotlin.client.MongoClient
import com.mongodb.selector.ServerSelector

// start-custom-selector
class CustomServerSelector : ServerSelector {
    override fun select(cluster: ClusterDescription): List<ServerDescription> {
        return cluster.serverDescriptions.filter { it.type == ServerType.REPLICA_SET_SECONDARY }
    }
}
// end-custom-selector

fun main() {
    // start-selector
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<connection URI>"))
        .applyToClusterSettings { builder ->
            builder.serverSelector(CustomServerSelector())
        }
        .build()

    val mongoClient = MongoClient.create(settings)
    // end-selector
}


