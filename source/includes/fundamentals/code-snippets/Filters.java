package docs.builders;

// begin imports
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.geojson.Point;
import com.mongodb.client.model.geojson.Polygon;
import com.mongodb.client.model.geojson.Position;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.mongodb.client.model.Filters.*;
// end imports

public class Filters {
    
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private Filters() {
        // begin declaration
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("builders");
        collection = database.getCollection("filters");
        // end declaration
    }

    public static void main(String[] args) {
        Filters filters = new Filters();
        // filters.setupPaintCollection();
        // filters.setupBinaryCollection();
        // filters.setupPointsCollection();
        
        System.out.println("Equal Comparison");
        filters.equalComparison();
        System.out.println("Empty Comparison");
        filters.emptyComparison();
        System.out.println("Gte Comparison");
        filters.gteComparison();
        System.out.println("Or Comparison");
        filters.orComparison();
        System.out.println("All Comparison");
        filters.allComparison();
        System.out.println("Exists Comparison");
        filters.existsComparison();
        System.out.println("Regex Comparison");
        filters.regexComparison();
        System.out.println("Bits Comparison");
        filters.bitsComparison();
        System.out.println("GeoWithin Comparison");
        filters.geoWithinComparison();

        // filters.preview();
    
    }

    private void equalComparison() {
        // begin equalComparison
        Bson equalComparison = eq("qty", 5);
        collection.find(equalComparison).forEach(doc -> System.out.println(doc.toJson()));
        // end equalComparison
    }

    private void gteComparison() {
        // begin gteComparison
        Bson gteComparison = gte("qty", 10);
        collection.find(gteComparison).forEach(doc -> System.out.println(doc.toJson()));
        // end gteComparison
    }

    private void orComparison() {
        // begin orComparison
        Bson orComparison = or(gt("qty", 8), eq("color", "pink"));
        collection.find(orComparison).forEach(doc -> System.out.println(doc.toJson()));
        // end orComparison
    }

    private void emptyComparison() {
        // begin emptyComparison
        Bson emptyComparison = empty();
        collection.find(emptyComparison).forEach(doc -> System.out.println(doc.toJson()));
        // end emptyComparison
    }

    private void allComparison() {
        // begin allComparison
        List<String> search = Arrays.asList("A", "D");
        Bson allComparison = all("vendor", search);
        collection.find(allComparison).forEach(doc -> System.out.println(doc.toJson()));
        // end allComparison
    }

    private void existsComparison() {
        // begin existsComparison
        Bson existsComparison = and(exists("qty"), nin("qty", 5, 8));
        collection.find(existsComparison).forEach(doc -> System.out.println(doc.toJson()));
        // end existsComparison
    }

    private void regexComparison() {
        // begin regexComparison
        Bson regexComparison = regex("color", "^p");
        collection.find(regexComparison).forEach(doc -> System.out.println(doc.toJson()));
        // end regexComparison
    }

    private void bitsComparison() {
        // begin bitsComparison
        Bson bitsComparison = bitsAllSet("a", 34);
        collection.find(bitsComparison).forEach(doc -> System.out.println(doc.toJson()));
        // end bitsComparison
    }

    private void geoWithinComparison() {
        // begin geoWithinComparison
        Polygon square = new Polygon(Arrays.asList(new Position(0, 0), 
                                            new Position(4, 0), 
                                            new Position(4, 4), 
                                            new Position(0, 4),
                                            new Position(0, 0)));
   
        Bson geoWithinComparison = geoWithin("coordinates", square);
        collection.find(geoWithinComparison).forEach(doc -> System.out.println(doc.toJson()));
        // end geoWithinComparison
    }

    private void preview(){
        Bson filter = new Document();
        List<Document> res = new ArrayList();
        System.out.println(collection.find(filter).into(res));
        // collection.drop();
    }

    private void setupPaintCollection() {

        List<Document> filterdata = new ArrayList<>();
        String [] p1a = {"A"};
        String [] p2a = {"C", "D"};
        String [] p3a = {"B","A"};
        String [] p4a = {"D"};
        String [] p5a = {"A", "B"};
        String [] p6a = {"C"};
        String [] p7a = {"B", "C"};
        String [] p8a = {"A", "D"};

        Document p1 = new Document("_id", 1).append("color", "red").append("qty", 5).append("vendor", Arrays.asList(p1a));
        Document p2 = new Document("_id", 2).append("color", "purple").append("qty", 10).append("vendor", Arrays.asList(p2a));
        Document p3 = new Document("_id", 3).append("color", "blue").append("qty", 8).append("vendor", Arrays.asList(p3a));
        Document p4 = new Document("_id", 4).append("color", "white").append("qty", 6).append("vendor", Arrays.asList(p4a));
        Document p5 = new Document("_id", 5).append("color", "yellow").append("qty", 11).append("vendor", Arrays.asList(p5a));
        Document p6 = new Document("_id", 6).append("color", "pink").append("qty", 5).append("vendor", Arrays.asList(p6a));
        Document p7 = new Document("_id", 7).append("color", "green").append("qty", 8).append("vendor", Arrays.asList(p7a));
        Document p8 = new Document("_id", 8).append("color", "orange").append("qty", 7).append("vendor", Arrays.asList(p8a));
       
        filterdata.add(p1);
        filterdata.add(p2);
        filterdata.add(p3);
        filterdata.add(p4);
        filterdata.add(p5);
        filterdata.add(p6);
        filterdata.add(p7);
        filterdata.add(p8);
        

        collection.insertMany(filterdata);
    }
       
    private void setupBinaryCollection(){
        List<Document> filterdata = new ArrayList<>();
        
        Document p9 = new Document("_id", 9).append("a", 54).append("binaryValue", "00110110");
        Document p10 = new Document("_id", 10).append("a", 20).append("binaryValue", "00010100");
        Document p11 = new Document("_id", 11).append("a", 68).append("binaryValue", "1000100");
        Document p12 = new Document("_id", 12).append("a", 102).append("binaryValue", "01100110");
        
        filterdata.add(p9);
        filterdata.add(p10);
        filterdata.add(p11);
        filterdata.add(p12);
        collection.insertMany(filterdata);
    }

    private void setupPointsCollection(){
        
        List<Document> filterdata = new ArrayList<>();

        Document p13 = new Document("_id", 13).append("coordinates", new Point(new Position(2, 2)));
        Document p14 = new Document("_id", 14).append("coordinates", new Point(new Position(5, 6)));
        Document p15 = new Document("_id", 15).append("coordinates", new Point(new Position(1, 3)));
        Document p16 = new Document("_id", 16).append("coordinates", new Point(new Position(4, 7)));
        
        filterdata.add(p13);
        filterdata.add(p14);
        filterdata.add(p15);
        filterdata.add(p16);
        collection.insertMany(filterdata);
    }
}
