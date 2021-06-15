package docs;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Arrays;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;

public class SearchText {
    
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private SearchText() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("crudOps");
        collection = database.getCollection("searchText");
    }

    public static void main(String [] args){
        SearchText searchText = new SearchText();

        searchText.setupCoursesCollection();
        // System.out.println("Matches for 'Fast'");
        // searchText.termExample();

        // System.out.println("Matches for 'Fate 7'");
        // searchText.multipleTermExample();

        System.out.println("Matches for 'Furious' without 'Fast'");
        searchText.negateExample();

        // System.out.println("Matches for 'Fate of the Furious'");
        // searchText.phraseExample();
    }

    private void termExample(){
        // begin termExample
        Bson filter = Filters.text("fast");
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end termExample
    }

    private void multipleTermExample(){
        // begin multipleTermExample
        Bson filter = Filters.text("fate 7");
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end multipleTermExample
    }
    
    private void negateExample(){
        // begin negateExample
        Bson filter = Filters.text("furious -fast");
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end negateExample
    }

    private void phraseExample(){
        // begin phraseExample
        Bson filter = Filters.text("\"fate of the furious\"");
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end phraseExample
    }

    private void setupCoursesCollection() {
        collection.drop();
        collection.insertMany(Arrays.asList(
            new Document("_id", 1).append("title", "2 Fast 2 Furious ").append("tags", Arrays.asList("undercover", "drug dealer")), 
            new Document("_id", 2).append("title", "Fast 5").append("tags", Arrays.asList("bank robbery", "full team")), 
            new Document("_id", 3).append("title", "Furious 7").append("tags", Arrays.asList("emotional")), 
            new Document("_id", 4).append("title", "The Fate of the Furious").append("tags", Arrays.asList("betrayal"))
        ));
        // begin textIndex
        collection.createIndex(Indexes.text("title"));
        // end textIndex
        // begin listIndex
        collection.listIndexes().forEach(doc -> System.out.println(doc.toJson()));
        // end listIndex
    }
}
