import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.model.*
import com.mongodb.kotlin.client.*
import org.bson.Document

fun main() {

    // start-stable-api-options
    val serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
        .strict(true)
        .deprecationErrors(true)
        .build()
    // end-stable-api-options
}