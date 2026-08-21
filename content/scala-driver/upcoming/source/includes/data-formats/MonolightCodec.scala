import org.bson.BsonReader
import org.bson.BsonType
import org.bson.BsonWriter
import org.bson.codecs.Codec
import org.bson.codecs.DecoderContext
import org.bson.codecs.EncoderContext
import org.bson.codecs.configuration.CodecRegistry

// start class
class MonolightCodec(registry: CodecRegistry) extends Codec[Monolight] {

  private val powerStatusCodec: Codec[PowerStatus] =
    registry.get(classOf[PowerStatus])
  private val integerCodec: Codec[Integer] =
    registry.get(classOf[Integer])

  override def encode(writer: BsonWriter, value: Monolight,
      encoderContext: EncoderContext): Unit = {
    writer.writeStartDocument()
    writer.writeName("powerStatus")
    powerStatusCodec.encode(writer, value.powerStatus, encoderContext)
    writer.writeName("colorTemperature")
    integerCodec.encode(writer, value.colorTemperature, encoderContext)
    writer.writeEndDocument()
  }

  override def decode(reader: BsonReader,
      decoderContext: DecoderContext): Monolight = {
    var powerStatus: PowerStatus = PowerStatus.Off
    var colorTemperature: Int = 0

    reader.readStartDocument()
    while (reader.readBsonType() != BsonType.END_OF_DOCUMENT) {
      reader.readName() match {
        case "powerStatus" =>
          powerStatus = powerStatusCodec.decode(reader, decoderContext)
        case "colorTemperature" =>
          colorTemperature = integerCodec.decode(reader, decoderContext)
        case "_id" =>
          reader.readObjectId()
        case _ =>
          reader.skipValue()
      }
    }
    reader.readEndDocument()

    Monolight(powerStatus, colorTemperature)
  }

  override def getEncoderClass: Class[Monolight] = classOf[Monolight]
}
// end class
