import scala.concurrent.Await
import scala.concurrent.duration.Duration

import org.bson.codecs.IntegerCodec
import org.bson.codecs.configuration.CodecRegistries

import com.mongodb.MongoClientSettings
import org.mongodb.scala._

// start class
object MonolightCodecExample {

  def main(args: Array[String]): Unit = {
    val uri = "<connection string URI>"
    val mongoClient = MongoClient(uri)

    val codecRegistry = CodecRegistries.fromRegistries(
      CodecRegistries.fromCodecs(
        new IntegerCodec(), new PowerStatusCodec()
      ),
      CodecRegistries.fromProviders(new MonolightCodecProvider()),
      MongoClientSettings.getDefaultCodecRegistry()
    )

    val database = mongoClient.getDatabase("codecs_example_products")
    val collection: MongoCollection[Monolight] = database
      .getCollection[Monolight]("monolights")
      .withCodecRegistry(codecRegistry)

    val myMonolight = Monolight(PowerStatus.On, 5200)
    Await.result(
      collection.insertOne(myMonolight).toFuture(),
      Duration.Inf
    )

    val lights = Await.result(
      collection.find().toFuture(),
      Duration.Inf
    )
    println(lights)

    mongoClient.close()
  }
}
// end class
