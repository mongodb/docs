package fundamentals.monolightcodec;

import org.bson.codecs.Codec;
import org.bson.codecs.IntegerCodec;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;


// start class
public class MonolightCodecProvider implements CodecProvider {

    public MonolightCodecProvider() {}

    @Override
    @SuppressWarnings("unchecked")
    public <T> Codec<T> get(Class<T> clazz, CodecRegistry registry) {
        if (clazz == Monolight.class) {
            return (Codec<T>) new MonolightCodec(registry);
        }

        // return null when not a provider for the requested class
        return null;
    }

}
// end class
