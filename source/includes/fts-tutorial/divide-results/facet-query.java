import java.util.Arrays;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class DivideQueryResults {

    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";
        
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            // define pipeline
            Document searchStage = new Document("$search", new Document("index", "pagination-tutorial")
            		.append("text", new Document("query", "tom hanks").append("path", "cast")));
            Document projectStage = new Document("$project", 
            	    new Document("_id", 0)
                    .append("title", 1)
                    .append("cast", 1));
            Document setStage1 = new Document("$set", new Document("score", 
            	    	    new Document("$meta", "searchScore")));
            Document facetStage = new Document("$facet", 
            	    new Document("rows", Arrays.asList(new Document("$skip", 10), 
                            new Document("$limit", 10)))
                        .append("totalRows", Arrays.asList(new Document("$replaceWith", "$$SEARCH_META"), 
                            new Document("$limit", 1)))); 
            Document setStage2 = new Document("$set", new Document("totalRows", 
                new Document("$arrayElemAt", Arrays.asList("$totalRows", 0))));
            
            // run pipeline and print results
            collection.aggregate(Arrays.asList(
            		searchStage, 
            		projectStage, 
            		setStage1, 
            		facetStage, 
            		setStage2))
            .forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}

