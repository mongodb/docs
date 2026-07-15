package org.example;

import org.bson.BsonReader;
import org.bson.BsonWriter;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;

// start class
public class ReadStatusCodec implements Codec<ReadStatus> {

    @Override
    public void encode(BsonWriter writer, ReadStatus value, EncoderContext encoderContext) {
        writer.writeBoolean(value.equals(ReadStatus.READ) ? Boolean.TRUE : Boolean.FALSE);
    }

    @Override
    public ReadStatus decode(BsonReader reader, DecoderContext decoderContext) {
        return reader.readBoolean() ? ReadStatus.READ : ReadStatus.UNREAD;
    }

    @Override
    public Class<ReadStatus> getEncoderClass() {
        return ReadStatus.class;
    }
}
// end class

