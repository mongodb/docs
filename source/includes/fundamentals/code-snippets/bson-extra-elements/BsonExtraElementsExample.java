package fundamentals;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;

public class BsonExtraElementsExample {

    private static final String DOC_NAME_VALUE = "MDB0123";

    private static CodecRegistry getCodecRegistry() {
        PojoCodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        return fromRegistries(getDefaultCodecRegistry(), pojoCodecProvider);
    }

    private static void setup(MongoCollection<ProductWithBsonExtraElements> collection) {
        collection.drop();

        ProductWithBsonExtraElements doc = new ProductWithBsonExtraElements(DOC_NAME_VALUE);
        collection.insertOne(doc);
    }

    // Update without the POJO; match the annotations for field names
    private static void addOtherFields(MongoClient client) {
        MongoCollection<Document> collection = client.getDatabase("sample_pojo").getCollection("ProductsWithMoreInfo");

        UpdateResult result = collection.updateOne(
                Filters.eq("modelName", DOC_NAME_VALUE),
                Updates.combine(
                        Updates.set("dimensions", "3x4x5"),
                        Updates.set("weight", "256g")));
        System.out.println(result);
    }

    private static <T> void printDocuments(MongoCollection<T> collection) {
        List<T> products = new ArrayList<T>();
        collection.find().into(products);
        products.forEach(doc -> System.out.println(doc));
    }

    public static void main(String[] args) {
        String uri = "mongodb://localhost:27017";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_pojo").withCodecRegistry(getCodecRegistry());
            MongoCollection<ProductWithBsonExtraElements> collection = database.getCollection("ProductsWithMoreInfo", ProductWithBsonExtraElements.class);

            setup(collection);
            addOtherFields(mongoClient);
            printDocuments(collection);
        }
    }
}
