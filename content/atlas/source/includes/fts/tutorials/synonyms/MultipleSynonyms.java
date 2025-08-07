import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.mongodb.client.model.CreateCollectionOptions;

import java.util.Arrays;

public class MultipleSynonyms {
    public static void main(String[] args) {
        // Connect to MongoDB
        String connectionString = "<connection-string>";
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            
            // Get the sample_mflix database
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            
            // Create the transport_synonyms collection
            try {
                database.createCollection("transport_synonyms", new CreateCollectionOptions());
            } catch (Exception e) {
                // Collection may already exist, which is fine
                System.out.println("Note: " + e.getMessage());
            }
            
            // Get the transport_synonyms collection
            MongoCollection<Document> transportCollection = database.getCollection("transport_synonyms");
            
            // Create and insert the first transport document - equivalent mapping
            Document doc1 = new Document("mappingType", "equivalent")
                    .append("synonyms", Arrays.asList("car", "vehicle", "automobile"));
                    
            transportCollection.insertOne(doc1);
            
            // Create and insert the second transport document - explicit mapping
            Document doc2 = new Document("mappingType", "explicit")
                    .append("input", Arrays.asList("boat"))
                    .append("synonyms", Arrays.asList("boat", "vessel", "sail"));
                    
            transportCollection.insertOne(doc2);
            
            // Create the attire_synonyms collection
            try {
                database.createCollection("attire_synonyms", new CreateCollectionOptions());
            } catch (Exception e) {
                // Collection may already exist, which is fine
                System.out.println("Note: " + e.getMessage());
            }
            
            // Get the attire_synonyms collection
            MongoCollection<Document> attireCollection = database.getCollection("attire_synonyms");
            
            // Create and insert the first attire document - equivalent mapping
            Document doc3 = new Document("mappingType", "equivalent")
                    .append("synonyms", Arrays.asList("dress", "apparel", "attire"));
                    
            attireCollection.insertOne(doc3);
            
            // Create and insert the second attire document - explicit mapping
            Document doc4 = new Document("mappingType", "explicit")
                    .append("input", Arrays.asList("hat"))
                    .append("synonyms", Arrays.asList("hat", "fedora", "headgear"));
                    
            attireCollection.insertOne(doc4);
            
            System.out.println("Synonyms collections successfully created and populated.");
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            System.exit(1);
        }
    }
}
