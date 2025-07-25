package fundamentals.monolightcodec;

import org.bson.BsonReader;
import org.bson.BsonType;
import org.bson.BsonWriter;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;
import org.bson.codecs.configuration.CodecRegistry;

// Implements the Codec interface by overriding the encode(), decode(), and getEncoderClass() methods
// start class
public class MonolightCodec implements Codec<Monolight>{

    private Codec<PowerStatus> powerStatusCodec;
    private Codec<Integer> integerCodec;

    public MonolightCodec(CodecRegistry registry) {
        this.powerStatusCodec = registry.get(PowerStatus.class);
        this.integerCodec = registry.get(Integer.class);
    }

    // Defines an encode() method to convert Monolight enum values to BSON values
    @Override
    public void encode(BsonWriter writer, Monolight value, EncoderContext encoderContext) {
        writer.writeStartDocument();
        writer.writeName("powerStatus");
        powerStatusCodec.encode(writer, value.getPowerStatus(), encoderContext);
        writer.writeName("colorTemperature");
        integerCodec.encode(writer, value.getColorTemperature(), encoderContext);
        writer.writeEndDocument();
    }

    // Defines a decode() method to convert BSON values to Monolight enum values
    @Override
    public Monolight decode(BsonReader reader, DecoderContext decoderContext) {
        Monolight monolight = new Monolight();

        reader.readStartDocument();
        while (reader.readBsonType() != BsonType.END_OF_DOCUMENT) {
            String fieldName = reader.readName();
            if (fieldName.equals("powerStatus")) {
                monolight.setPowerStatus(powerStatusCodec.decode(reader, decoderContext));
            } else if (fieldName.equals("colorTemperature")) {
                monolight.setColorTemperature(integerCodec.decode(reader, decoderContext));
            } else if (fieldName.equals("_id")){
                reader.readObjectId();
            }
        }
        reader.readEndDocument();

        return monolight;
    }

    // Returns an instance of the Monolight class, since Java cannot infer the class type
    @Override
    public Class<Monolight> getEncoderClass() {
        return Monolight.class;
    }

}
// end class
