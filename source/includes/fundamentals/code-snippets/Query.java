package docs;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.mongodb.client.model.Filters;

public class Query {

    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private Query() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("crudOps");
        collection = database.getCollection("query");
    }

    public static void main(String [] args){
        Query query = new Query();
        // query.preview();
        // query.setupPaintCollection();

        System.out.println("Comparison Filter:");
        query.comparisonFilter();

        System.out.println("Logical Filter:");
        query.logicalFilter();

        System.out.println("Element Filter:");
        query.elementFilter();

        System.out.println("Evaluation Filter:");
        query.evaluationFilter();

        System.out.println("Array Filter:");
        query.arrayFilter();
    }

    private void comparisonFilter(){
        // begin comparisonFilter
        Bson filter = Filters.gt("qty", 7);
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end comparisonFilter
    }

    private void logicalFilter(){
        // begin logicalFilter
        Bson filter = Filters.and(Filters.lte("qty", 5), Filters.ne("color", "pink"));
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end logicalFilter
    }

    private void elementFilter(){
        // begin elementFilter
        Bson filter = Filters.exists("rating");
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end elementFilter
    }

    private void evaluationFilter(){
        // begin evaluationFilter
        Bson filter = Filters.regex("color", "k$");
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end evaluationFilter
    }

    private void arrayFilter(){
        // begin arrayFilter
        Bson filter = Filters.size("vendor", 3);
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end arrayFilter
    }

    private void preview(){
        // Bson filter = Filters.empty();
        // collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        collection.drop();
    }

    private void setupPaintCollection() {

        List<Document> querydata = new ArrayList<>();

        Document p1 = new Document("_id", 1).append("color", "red").append("qty", 9).append("vendor", Arrays.asList("A", "E"));
        Document p2 = new Document("_id", 2).append("color", "purple").append("qty", 8).append("vendor", Arrays.asList("B", "D", "F")).append("rating", 5);
        Document p3 = new Document("_id", 3).append("color", "blue").append("qty", 5).append("vendor", Arrays.asList("A", "E"));
        Document p4 = new Document("_id", 4).append("color", "white").append("qty", 6).append("vendor", Arrays.asList("D")).append("rating", 9);
        Document p5 = new Document("_id", 5).append("color", "yellow").append("qty", 4).append("vendor", Arrays.asList("A", "B"));
        Document p6 = new Document("_id", 6).append("color", "pink").append("qty", 3).append("vendor", Arrays.asList("C"));
        Document p7 = new Document("_id", 7).append("color", "green").append("qty", 8).append("vendor", Arrays.asList("C", "E")).append("rating", 7);
        Document p8 = new Document("_id", 8).append("color", "black").append("qty", 7).append("vendor", Arrays.asList("A", "C", "D"));
       
        querydata.add(p1);
        querydata.add(p2);
        querydata.add(p3);
        querydata.add(p4);
        querydata.add(p5);
        querydata.add(p6);
        querydata.add(p7);
        querydata.add(p8);
        
        collection.insertMany(querydata);
    }

}