package timeseries;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Indexes;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Limitations {

    private static final String uri = System.getenv("CONNECTION_STRING") != null
            ? System.getenv("CONNECTION_STRING")
            : "Env variable not found. Verify you have a .env file with a valid connection string.";

    private static MongoCollection<Document> collection;
    private static MongoDatabase database;
    private static MongoClient client;

    private static void loadData() {
        client = MongoClients.create(uri);
        database = client.getDatabase("timeseries");
        database.createCollection("limitations");
        collection = database.getCollection("limitations");

        List<Document> sampleDocuments = Arrays.asList(
                new Document("_id", new ObjectId())
                        .append("name", "example")
                        .append("meta", new Document("project", 10)
                                .append("type", "a")),
                new Document("_id", new ObjectId())
                        .append("name", "example")
                        .append("meta", new Document("project", 10)
                                .append("type", "b")),
                new Document("_id", new ObjectId())
                        .append("name", "example")
                        .append("meta", new Document("project", 40)
                                .append("type", "c"))
        );

        collection.insertMany(sampleDocuments);
    }

    public static List<Document> getDistinctDocuments() {
        loadData();

        // :snippet-start: agg-pipeline-for-distinct
        collection.createIndex(Indexes.compoundIndex(
                Indexes.ascending("meta.project"),
                Indexes.ascending("meta.type")
        ));

        var pipeline = Arrays.asList(
                Aggregates.match(Filters.eq("meta.project", 10)),
                Aggregates.group("$meta.type")
        );
        List<Document> result = collection.aggregate(pipeline).into(new ArrayList<>());
        // :snippet-end:

        return result;
    }

    public static void Cleanup(){
        database.drop();
        client.close();
    }
}
