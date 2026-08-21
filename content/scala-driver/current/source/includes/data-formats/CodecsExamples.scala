import com.mongodb.MongoClientSettings
import org.bson.codecs.Codec
import org.bson.codecs.IntegerCodec
import org.bson.codecs.configuration.CodecRegistries

object CodecsExamples {

  def registryExamples(): Unit = {
    // start construct-registry
    val codecRegistry = CodecRegistries.fromCodecs(
      new IntegerCodec(), new PowerStatusCodec()
    )
    // end construct-registry

    // start retrieve-codecs
    val powerStatusCodec: Codec[PowerStatus] =
      codecRegistry.get(classOf[PowerStatus])
    val integerCodec: Codec[Integer] =
      codecRegistry.get(classOf[Integer])
    // end retrieve-codecs
  }

  def overrideDefaultRegistry(): Unit = {
    // start override-registry
    val newRegistry = CodecRegistries.fromRegistries(
      CodecRegistries.fromCodecs(new MyEnumCodec()),
      MongoClientSettings.getDefaultCodecRegistry()
    )
    // end override-registry
  }
}
