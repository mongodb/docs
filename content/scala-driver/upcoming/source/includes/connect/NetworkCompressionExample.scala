import com.mongodb.MongoCompressor
import org.mongodb.scala._

import scala.jdk.CollectionConverters._

object NetworkCompressionExample {

  def main(args: Array[String]): Unit = {

    {
      // start-specify-connection-string
      val mongoClient = MongoClient(
        "mongodb://<hostname>:<port>/?compressors=snappy,zlib,zstd"
      )
      // end-specify-connection-string

      mongoClient.close()
    }

    {
      // start-specify-mongoclientsettings
      val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<connection string>"))
        .compressorList(List(
          MongoCompressor.createSnappyCompressor(),
          MongoCompressor.createZlibCompressor(),
          MongoCompressor.createZstdCompressor()
        ).asJava)
        .build()
      val mongoClient = MongoClient(settings)
      // end-specify-mongoclientsettings

      mongoClient.close()
    }
  }
}
