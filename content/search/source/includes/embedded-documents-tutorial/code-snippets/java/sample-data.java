import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.mongodb.client.model.CreateCollectionOptions;

import java.util.Arrays;

public class TransportSynonyms {
    public static void main(String[] args) {
        // Connect to MongoDB
        String connectionString = "<connection-string>";
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            
            // Get the sample_mflix database
            MongoDatabase database = mongoClient.getDatabase("local_school_district");
            
            // Create the schools collection
            try {
                database.createCollection("schools", new CreateCollectionOptions());
            } catch (Exception e) {
                // Collection may already exist, which is fine
                System.out.println("Note: " + e.getMessage());
            }
            
            // Get the collection
            MongoCollection<Document> collection = database.getCollection("schools");
            
            // Create and insert the first document - Springfield High
            Document doc1 = new Document("_id", 0)
                    .append("name", "Springfield High")
                    .append("mascot", "Pumas")
                    .append("teachers", Arrays.asList(
                        new Document("first", "Jane")
                            .append("last", "Smith")
                            .append("classes", Arrays.asList(
                                new Document("subject", "art of science").append("grade", "12th"),
                                new Document("subject", "applied science and practical science").append("grade", "9th"),
                                new Document("subject", "remedial math").append("grade", "12th"),
                                new Document("subject", "science").append("grade", "10th")
                            )),
                        new Document("first", "Bob")
                            .append("last", "Green")
                            .append("classes", Arrays.asList(
                                new Document("subject", "science of art").append("grade", "11th"),
                                new Document("subject", "art art art").append("grade", "10th")
                            ))
                    ))
                    .append("clubs", new Document("stem", Arrays.asList(
                        new Document("club_name", "chess")
                            .append("description", "provides students opportunity to play the board game of chess informally and competitively in tournaments."),
                        new Document("club_name", "kaboom chemistry")
                            .append("description", "provides students opportunity to experiment with chemistry that fizzes and explodes.")
                    ))
                    .append("arts", Arrays.asList(
                        new Document("club_name", "anime")
                            .append("description", "provides students an opportunity to discuss, show, and collaborate on anime and broaden their Japanese cultural understanding."),
                        new Document("club_name", "visual arts")
                            .append("description", "provides students an opportunity to train, experiment, and prepare for internships and jobs as photographers, illustrators, graphic designers, and more.")
                    )));
                    
            collection.insertOne(doc1);
            
            // Create and insert the second document - Evergreen High
            Document doc2 = new Document("_id", 1)
                    .append("name", "Evergreen High")
                    .append("mascot", "Jaguars")
                    .append("teachers", Arrays.asList(
                        new Document("first", "Jane")
                            .append("last", "Earwhacker")
                            .append("classes", Arrays.asList(
                                new Document("subject", "art").append("grade", "9th"),
                                new Document("subject", "science").append("grade", "12th")
                            )),
                        new Document("first", "John")
                            .append("last", "Smith")
                            .append("classes", Arrays.asList(
                                new Document("subject", "math").append("grade", "12th"),
                                new Document("subject", "art").append("grade", "10th")
                            ))
                    ))
                    .append("clubs", new Document("sports", Arrays.asList(
                        new Document("club_name", "archery")
                            .append("description", "provides students an opportunity to practice and hone the skill of using a bow to shoot arrows in a fun and safe environment."),
                        new Document("club_name", "ultimate frisbee")
                            .append("description", "provides students an opportunity to play frisbee and learn the basics of holding the disc and complete passes.")
                    ))
                    .append("stem", Arrays.asList(
                        new Document("club_name", "zapped")
                            .append("description", "provides students an opportunity to make exciting gadgets and explore electricity."),
                        new Document("club_name", "loose in the chem lab")
                            .append("description", "provides students an opportunity to put the scientific method to the test and get elbow deep in chemistry.")
                    )));
                    
            collection.insertOne(doc2);
            
            // Create and insert the third document - Lincoln High
            Document doc3 = new Document("_id", 2)
                    .append("name", "Lincoln High")
                    .append("mascot", "Sharks")
                    .append("teachers", Arrays.asList(
                        new Document("first", "Jane")
                            .append("last", "Smith")
                            .append("classes", Arrays.asList(
                                new Document("subject", "science").append("grade", "9th"),
                                new Document("subject", "math").append("grade", "12th")
                            )),
                        new Document("first", "John")
                            .append("last", "Redman")
                            .append("classes", Arrays.asList(
                                new Document("subject", "art").append("grade", "12th")
                            ))
                    ))
                    .append("clubs", new Document("arts", Arrays.asList(
                        new Document("club_name", "ceramics")
                            .append("description", "provides students an opportunity to acquire knowledge of form, volume, and space relationships by constructing hand-built and wheel-thrown forms of clay."),
                        new Document("club_name", "digital art")
                            .append("description", "provides students an opportunity to learn about design for entertainment, 3D animation, technical art, or 3D modeling.")
                    ))
                    .append("sports", Arrays.asList(
                        new Document("club_name", "dodgeball")
                            .append("description", "provides students an opportunity to play dodgeball by throwing balls to eliminate the members of the opposing team while avoiding being hit themselves."),
                        new Document("club_name", "martial arts")
                            .append("description", "provides students an opportunity to learn self-defense or combat that utilize physical skill and coordination without weapons.")
                    )));
                    
            collection.insertOne(doc3);
            
            System.out.println("Schools collection successfully created and populated.");
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            System.exit(1);
        }
    }
}
