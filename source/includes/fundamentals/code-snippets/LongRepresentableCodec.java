package fundamentals;

import org.bson.BsonInvalidOperationException;
import org.bson.BsonReader;
import org.bson.BsonType;
import org.bson.BsonWriter;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;
import org.bson.codecs.RepresentationConfigurable;
import org.bson.codecs.configuration.CodecConfigurationException;


// start class
public class LongRepresentableCodec implements Codec<Long>, RepresentationConfigurable<Long> {
    private final BsonType representation;

    /**
     * Constructs a LongRepresentableCodec with a Int64 representation.
     */
    public LongRepresentableCodec() {
        representation = BsonType.INT64;
    }

    private LongRepresentableCodec(final BsonType representation) {
        this.representation = representation;
    }

    @Override
    public BsonType getRepresentation() {
        return representation;
    }

    @Override
    public Codec<Long> withRepresentation(final BsonType representation) {
        if (representation != BsonType.INT64 && representation != BsonType.DATE_TIME) {
            throw new CodecConfigurationException(representation 
            + " is not a supported representation for LongRepresentableCodec");
        }
        return new LongRepresentableCodec(representation);
    }


    @Override
    public void encode(final BsonWriter writer, final Long value, final EncoderContext encoderContext) {
        switch (representation) {
            case INT64:
                writer.writeInt64(value);
                break;
            case DATE_TIME:
                writer.writeDateTime(value);
                break;
            default:
                throw new BsonInvalidOperationException("Cannot encode a Long to a " 
                + representation);
        }
    }

    @Override
    public Long decode(final BsonReader reader, final DecoderContext decoderContext) {
        switch (representation) {
            case INT64:
                return reader.readInt64();
            case DATE_TIME:
                return reader.readDateTime();
            default:
                throw new CodecConfigurationException("Cannot decode " + representation 
                + " to a Long");
        }
    }

    @Override
    public Class<Long> getEncoderClass() {
        return Long.class;
    }
}
// end class