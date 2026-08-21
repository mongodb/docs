import org.bson.codecs.Codec
import org.bson.codecs.configuration.CodecProvider
import org.bson.codecs.configuration.CodecRegistry

// start class
class MonolightCodecProvider extends CodecProvider {

  override def get[T](clazz: Class[T], registry: CodecRegistry): Codec[T] = {
    if (clazz == classOf[Monolight]) {
      new MonolightCodec(registry).asInstanceOf[Codec[T]]
    } else {
      null
    }
  }
}
// end class
