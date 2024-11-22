import com.mongodb.{ServerApi, ServerApiVersion}
import org.mongodb.scala._

object StableAPI {

  def main(args: Array[String]): Unit = {

    {
        // start-enable-stable-api
        val serverApi = ServerApi.builder()
            .version(ServerApiVersion.V1)
            .build()

        // Replace the uri string placeholder with your MongoDB deployment's connection string
        val uri = "<connection string URI>"

        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(uri))
            .serverApi(serverApi)
            .build()

        val mongoClient = MongoClient(settings)
        // end-enable-stable-api
    }

    {
        // start-stable-api-options
        val serverApi = ServerApi.builder()
            .version(ServerApiVersion.V1)
            .strict(true)
            .deprecationErrors(true)
            .build()
        // end-stable-api-options
    }

    mongoClient.close()
  }
}
