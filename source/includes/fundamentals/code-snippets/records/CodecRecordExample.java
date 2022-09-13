package fundamentals.codecs.records;

import java.util.ArrayList;
import java.util.List;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;


public class CodecRecordExample {
    public static void main(String args[]) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection uri>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_data");
            MongoCollection<DataStorageRecord> collection = database.getCollection("data_storage_devices", DataStorageRecord.class);

            // insert the document
            collection.insertOne(new DataStorageRecord("2TB SSD", 1.71));

            // return all documents in the collection as records
            List<DataStorageRecord> records = new ArrayList<DataStorageRecord>();
            collection.find().into(records);
            records.forEach(System.out::println);
        }
    }
}
