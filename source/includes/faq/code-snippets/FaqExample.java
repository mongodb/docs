package fundamentals.customcodec;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import fundamentals.Flower;

public class FaqExample {
    
    public static void main(String[] args) {
        PojoCodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        
        // start myDateAsStringCodec
        CodecRegistry registry = CodecRegistries.fromRegistries(
                CodecRegistries.fromCodecs(
                        new MyDateAsStringCodec()),
                MongoClientSettings.getDefaultCodecRegistry(),
                fromProviders(pojoCodecProvider));
        // end myDateAsStringCodec

        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_pojo").withCodecRegistry(registry);
            MongoCollection<Flower> collection = database.getCollection("flowers", Flower.class);

            Flower flower = new Flower("rose", false, 25.4f, Arrays.asList(new String[] {"red", "green"}));
            collection.insertOne(flower);

            List<Flower> flowers = new ArrayList<>();
            collection.find().into(flowers);
            System.out.println(flowers);
        }

    }
}
