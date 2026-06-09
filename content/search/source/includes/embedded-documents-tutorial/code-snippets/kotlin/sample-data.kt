import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.runBlocking
import org.bson.Document

fun main() = runBlocking {
    // Replace the placeholder with your MongoDB deployment's connection string
    val uri = "<connection-string>"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("local_school_district")
    
    try {
        // Create the schools collection
        try {
            database.createCollection("schools")
        } catch (e: Exception) {
            // Collection may already exist, which is fine
            println("Note: ${e.message}")
        }
        
        // Get the collection
        val collection = database.getCollection<Document>("schools")
        
        // Create and insert the first document - Springfield High
        val doc1 = Document("_id", 0)
            .append("name", "Springfield High")
            .append("mascot", "Pumas")
            .append("teachers", listOf(
                Document("first", "Jane")
                    .append("last", "Smith")
                    .append("classes", listOf(
                        Document("subject", "art of science").append("grade", "12th"),
                        Document("subject", "applied science and practical science").append("grade", "9th"),
                        Document("subject", "remedial math").append("grade", "12th"),
                        Document("subject", "science").append("grade", "10th")
                    )),
                Document("first", "Bob")
                    .append("last", "Green")
                    .append("classes", listOf(
                        Document("subject", "science of art").append("grade", "11th"),
                        Document("subject", "art art art").append("grade", "10th")
                    ))
            ))
            .append("clubs", Document("stem", listOf(
                Document("club_name", "chess")
                    .append("description", "provides students opportunity to play the board game of chess informally and competitively in tournaments."),
                Document("club_name", "kaboom chemistry")
                    .append("description", "provides students opportunity to experiment with chemistry that fizzes and explodes.")
            ))
            .append("arts", listOf(
                Document("club_name", "anime")
                    .append("description", "provides students an opportunity to discuss, show, and collaborate on anime and broaden their Japanese cultural understanding."),
                Document("club_name", "visual arts")
                    .append("description", "provides students an opportunity to train, experiment, and prepare for internships and jobs as photographers, illustrators, graphic designers, and more.")
            )))
                
        collection.insertOne(doc1)
        
        // Create and insert the second document - Evergreen High
        val doc2 = Document("_id", 1)
            .append("name", "Evergreen High")
            .append("mascot", "Jaguars")
            .append("teachers", listOf(
                Document("first", "Jane")
                    .append("last", "Earwhacker")
                    .append("classes", listOf(
                        Document("subject", "art").append("grade", "9th"),
                        Document("subject", "science").append("grade", "12th")
                    )),
                Document("first", "John")
                    .append("last", "Smith")
                    .append("classes", listOf(
                        Document("subject", "math").append("grade", "12th"),
                        Document("subject", "art").append("grade", "10th")
                    ))
            ))
            .append("clubs", Document("sports", listOf(
                Document("club_name", "archery")
                    .append("description", "provides students an opportunity to practice and hone the skill of using a bow to shoot arrows in a fun and safe environment."),
                Document("club_name", "ultimate frisbee")
                    .append("description", "provides students an opportunity to play frisbee and learn the basics of holding the disc and complete passes.")
            ))
            .append("stem", listOf(
                Document("club_name", "zapped")
                    .append("description", "provides students an opportunity to make exciting gadgets and explore electricity."),
                Document("club_name", "loose in the chem lab")
                    .append("description", "provides students an opportunity to put the scientific method to the test and get elbow deep in chemistry.")
            )))
                
        collection.insertOne(doc2)
        
        // Create and insert the third document - Lincoln High
        val doc3 = Document("_id", 2)
            .append("name", "Lincoln High")
            .append("mascot", "Sharks")
            .append("teachers", listOf(
                Document("first", "Jane")
                    .append("last", "Smith")
                    .append("classes", listOf(
                        Document("subject", "science").append("grade", "9th"),
                        Document("subject", "math").append("grade", "12th")
                    )),
                Document("first", "John")
                    .append("last", "Redman")
                    .append("classes", listOf(
                        Document("subject", "art").append("grade", "12th")
                    ))
            ))
            .append("clubs", Document("arts", listOf(
                Document("club_name", "ceramics")
                    .append("description", "provides students an opportunity to acquire knowledge of form, volume, and space relationships by constructing hand-built and wheel-thrown forms of clay."),
                Document("club_name", "digital art")
                    .append("description", "provides students an opportunity to learn about design for entertainment, 3D animation, technical art, or 3D modeling.")
            ))
            .append("sports", listOf(
                Document("club_name", "dodgeball")
                    .append("description", "provides students an opportunity to play dodgeball by throwing balls to eliminate the members of the opposing team while avoiding being hit themselves."),
                Document("club_name", "martial arts")
                    .append("description", "provides students an opportunity to learn self-defense or combat that utilize physical skill and coordination without weapons.")
            )))
                
        collection.insertOne(doc3)
        
        println("Schools collection successfully created and populated.")
    } catch (e: Exception) {
        System.err.println("Error: ${e.message}")
        System.exit(1)
    } finally {
        mongoClient.close()
    }
}
