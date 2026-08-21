import org.bson.BsonReader
import org.bson.BsonWriter
import org.bson.codecs.Codec
import org.bson.codecs.DecoderContext
import org.bson.codecs.EncoderContext

// start class
class PowerStatusCodec extends Codec[PowerStatus] {

  override def encode(writer: BsonWriter, value: PowerStatus,
      encoderContext: EncoderContext): Unit = {
    if (value != null) {
      writer.writeBoolean(value == PowerStatus.On)
    }
  }

  override def decode(reader: BsonReader,
      decoderContext: DecoderContext): PowerStatus = {
    if (reader.readBoolean()) PowerStatus.On else PowerStatus.Off
  }

  override def getEncoderClass: Class[PowerStatus] = classOf[PowerStatus]
}
// end class
