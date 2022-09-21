package fundamentals.codecs.records;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertOneResult;

import java.util.ArrayList;
import java.util.List;

public class RecordAnnotationExample {
    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<your connection uri>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_data");
            MongoCollection<NetworkDeviceRecord> collection = database.getCollection("network_devices", NetworkDeviceRecord.class);

            // insert the document
            String deviceId = new ObjectId().toHexString();
            collection.insertOne(new NetworkDeviceRecord(deviceId, "Enterprise Wi-fi", "router"));

            // return all documents in the collection as records
            List<NetworkDeviceRecord> records = new ArrayList<NetworkDeviceRecord>();
            collection.find().into(records);
            records.forEach(System.out::println);
        }
    }
}
