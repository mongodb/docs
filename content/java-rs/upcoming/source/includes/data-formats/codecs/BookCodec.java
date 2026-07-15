package org.example;

import org.bson.BsonReader;
import org.bson.BsonType;
import org.bson.BsonWriter;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;
import org.bson.codecs.configuration.CodecRegistry;

// Implements the Codec interface by overriding the encode(), decode(), and getEncoderClass() methods
// start class
public class BookCodec implements Codec<Book> {

    private Codec<String> stringCodec;
    private Codec<ReadStatus> readStatusCodec;
    private Codec<Integer> integerCodec;

    public BookCodec(CodecRegistry registry) {
        this.stringCodec = registry.get(String.class);
        this.readStatusCodec = registry.get(ReadStatus.class);
        this.integerCodec = registry.get(Integer.class);
    }

    // Defines an encode() method to convert Book field values to BSON values
    @Override
    public void encode(BsonWriter writer, Book value, EncoderContext encoderContext) {
        writer.writeStartDocument();
        writer.writeName("title");
        stringCodec.encode(writer, value.getTitle(), encoderContext);
        writer.writeName("readStatus");
        readStatusCodec.encode(writer, value.getReadStatus(), encoderContext);
        writer.writeName("pageCount");
        integerCodec.encode(writer, value.getPageCount(), encoderContext);
        writer.writeEndDocument();
    }

    // Defines a decode() method to convert BSON values to Book field values
    @Override
    public Book decode(BsonReader reader, DecoderContext decoderContext) {
        Book book = new Book();

        reader.readStartDocument();
        while (reader.readBsonType() != BsonType.END_OF_DOCUMENT) {
            String fieldName = reader.readName();
            if (fieldName.equals("title")) {
                book.setTitle(stringCodec.decode(reader, decoderContext));
            } else if (fieldName.equals("readStatus")) {
                book.setReadStatus(readStatusCodec.decode(reader, decoderContext));
            } else if (fieldName.equals("pageCount")) {
                book.setPageCount(integerCodec.decode(reader, decoderContext));
            } else if (fieldName.equals("_id")) {
                reader.readObjectId();
            } else {
                reader.skipValue();
            }
        }
        reader.readEndDocument();

        return book;
    }

    // Returns an instance of the Book class, since Java cannot infer the class type
    @Override
    public Class<Book> getEncoderClass() {
        return Book.class;
    }
}
// end class

