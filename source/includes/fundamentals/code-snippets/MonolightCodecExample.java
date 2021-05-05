package fundamentals.monolightcodec;

import java.util.ArrayList;
import java.util.List;

import org.bson.codecs.IntegerCodec;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

// start class
public class MonolightCodecExample {

    public static void main(String[] args) {

        String uri = "<MongoDB connection URI>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            CodecRegistry codecRegistry = CodecRegistries.fromRegistries(
                    CodecRegistries.fromCodecs(new IntegerCodec(), new PowerStatusCodec()),
                    CodecRegistries.fromProviders(new MonolightCodecProvider()),
                    MongoClientSettings.getDefaultCodecRegistry());

            MongoDatabase database = mongoClient.getDatabase("codecs_example_products");
            MongoCollection<Monolight> collection = database.getCollection("monolights", Monolight.class).withCodecRegistry(codecRegistry);

            // construct and insert an instance of Monolight
            Monolight myMonolight = new Monolight();
            myMonolight.setPowerStatus(PowerStatus.ON);
            myMonolight.setColorTemperature(5200);
            collection.insertOne(myMonolight);

            // retrieve one or more instances of Monolight
            List<Monolight> lights = new ArrayList<>();
            collection.find().into(lights);
            System.out.println(lights);
        }
    }

}
// end class
