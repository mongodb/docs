import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertManyResult;
import dev.langchain4j.data.segment.TextSegment;
import org.bson.BsonArray;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class DataIngest {

    public static void main(String[] args) {
        String uri = System.getenv("ATLAS_CONNECTION_STRING");
        if (uri == null || uri.isEmpty()) {
            throw new RuntimeException("ATLAS_CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("rag_db");
            MongoCollection<Document> collection = database.getCollection("test");

            // parse the PDF file at the specified URL
            String url = "https://investors.mongodb.com/node/12236/pdf";
            String fileName = "mongodb_annual_report.pdf";
            System.out.println("Parsing the [" + fileName + "] file from url: " + url);
            dev.langchain4j.data.document.Document parsedDoc = PDFProcessor.parsePDFDocument(url);

            // split (or "chunk") the parsed document into text segments
            List<TextSegment> segments = PDFProcessor.splitDocument(parsedDoc);
            System.out.println(segments.size() + " text segments created successfully.");
            
            // create vector embeddings from the chunked data (i.e. text segments)
            System.out.println("Creating vector embeddings from the parsed data segments. This may take a few moments.");
            List<Document> documents = embedText(segments);

            // insert the embeddings into the Atlas collection
            try {
                System.out.println("Ingesting data into the " + collection.getNamespace() + " collection.");
                insertDocuments(documents, collection);
            }
            catch (MongoException me) {
                throw new RuntimeException("Failed to insert documents", me);
            }
        } catch (MongoException me) {
            throw new RuntimeException("Failed to connect to MongoDB", me);
        } catch (Exception e) {
            throw new RuntimeException("Operation failed: ", e);
        }
    }
    
    /** 
     * Embeds text segments into vector embeddings using the EmbeddingProvider
     * class and returns a list of BSON documents containing the text and 
     * generated embeddings.
    */
    private static List<Document> embedText(List<TextSegment> segments) {
        EmbeddingProvider embeddingProvider = new EmbeddingProvider();
        List<BsonArray> embeddings = embeddingProvider.getEmbeddings(segments);

        List<Document> documents = new ArrayList<>();
        int i = 0;
        for (TextSegment segment : segments) {
            Document doc = new Document("text", segment.text()).append("embedding", embeddings.get(i));
            documents.add(doc);
            i++;
        }
        return documents;
    }

    /**
     * Inserts a list of BSON documents into the specified MongoDB collection.
     */
    private static void insertDocuments(List<Document> documents, MongoCollection<Document> collection) {
        List<String> insertedIds = new ArrayList<>();

        InsertManyResult result = collection.insertMany(documents);
        result.getInsertedIds().values()
                .forEach(doc -> insertedIds.add(doc.toString()));
        System.out.println(insertedIds.size() + " documents inserted into the " + collection.getNamespace() + " collection successfully.");
    }
}
