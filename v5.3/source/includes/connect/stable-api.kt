import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.*
import com.mongodb.kotlin.client.*
import org.bson.Document

fun main() {

    // start-enable-stable-api
    val serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
        .build()

    // Replace the uri string placeholder with your MongoDB deployment's connection string
    val uri = "<connection string>"

    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .serverApi(serverApi)
        .build()

    val client = MongoClient.create(settings)
    // end-enable-stable-api

    val serverApi = ServerApi.builder()
    .version(ServerApiVersion.V1)
    .strict(true)
    .deprecationErrors(true)
    .build()

}