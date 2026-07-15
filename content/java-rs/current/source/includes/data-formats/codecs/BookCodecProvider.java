package org.example;

import org.bson.codecs.Codec;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;

// start class
public class BookCodecProvider implements CodecProvider {

    public BookCodecProvider() {}

    @Override
    @SuppressWarnings("unchecked")
    public <T> Codec<T> get(Class<T> clazz, CodecRegistry registry) {
        if (clazz == Book.class) {
            return (Codec<T>) new BookCodec(registry);
        }

        // return null when not a provider for the requested class
        return null;
    }
}
// end class

