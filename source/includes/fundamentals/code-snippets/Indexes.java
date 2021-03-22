package docs.builders;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.geojson.Point;
import com.mongodb.client.model.geojson.Position;

import org.bson.Document;
import org.bson.conversions.Bson;
import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Indexes.*;

public class Indexes {

    private final MongoClient mongoClient;
    private final MongoDatabase database;
    private MongoCollection<Document> collection;

    private Indexes(){
        // begin declaration
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("builders");
        collection = database.getCollection("theatres");
        // end declaration
    }

    public static void main(String[] args){
        Indexes indexes = new Indexes();
        // indexes.setupTheatreCollection();
        // indexes.preview();
        indexes.ascendingIndex();
        indexes.descendingIndex();
        indexes.compoundIndexExample();
        indexes.textIndex();
        indexes.hashedIndex();
        indexes.geo2dsphereIndex();
    }

    private void ascendingIndex(){
        // begin ascendingIndex
        Bson ascendingIndex = ascending("name");
        collection.createIndex(ascendingIndex);
        // end ascendingIndex
        
        // String resultCreateIndex = collection.createIndex(ascendingIndex);
        // System.out.println(String.format("Index created: %s", resultCreateIndex));
        
    }

    private void descendingIndex(){
        // begin descendingIndex
        Bson descendingIndex = descending("capacity");
        collection.createIndex(descendingIndex);
        // end descendingIndex

        // String resultCreateIndex = collection.createIndex(descendingIndex);
        // System.out.println(String.format("Index created: %s", resultCreateIndex));
    }

    private void compoundIndexExample(){
        // begin compoundIndexExample
        Bson compoundIndexExample = compoundIndex(descending("capacity", "year"), ascending("name"));
        collection.createIndex(compoundIndexExample);
        // end compoundIndexExample

        // String resultCreateIndex = collection.createIndex(compoundIndexExample);
        // System.out.println(String.format("Index created: %s", resultCreateIndex));
    }

    private void textIndex(){
        // begin textIndex
        Bson textIndex = text("theaters");
        collection.createIndex(textIndex);
        // end textIndex

        // String resultCreateIndex = collection.createIndex(textIndex);
        // System.out.println(String.format("Index created: %s", resultCreateIndex));
        
    }

    private void hashedIndex(){
        // begin hashedIndex
        Bson hashedIndex = hashed("capacity");
        collection.createIndex(hashedIndex);
        // end hashedIndex

        // String resultCreateIndex = collection.createIndex(hashedIndex);
        // System.out.println(String.format("Index created: %s", resultCreateIndex));
    }

    private void geo2dsphereIndex(){
        // begin geo2dsphereIndex
        Bson geo2dsphereIndex = geo2dsphere("location");
        collection.createIndex(geo2dsphereIndex);
        // end geo2dsphereIndex

        // String resultCreateIndex = collection.createIndex(geo2dsphereIndex);
        // System.out.println(String.format("Index created: %s", resultCreateIndex));
        
    }

    private void preview(){
        Bson filter = new Document();
        List<Document> res = new ArrayList();
        System.out.println(collection.find(filter).into(res));
        // collection.drop();
    }

    private void setupTheatreCollection() {
        List<Document> filterdata = new ArrayList<>();

        Document p1 = new Document("_id", 1).append("name", "4K Theaters").append("logo", "red").append("capacity", 1076).append("year", 2021).append("location", new Point(new Position(-76.512016, 38.29697)));
        Document p2 = new Document("_id", 2).append("name", "Just Like Home").append("logo", "blue").append("capacity", 942).append("year", 1981).append("location", new Point(new Position(-121.96328, 38.367649)));
        Document p3 = new Document("_id", 3).append("name", "ABC Movies").append("logo", "blue").append("capacity", 1135).append("year", 2003).append("location", new Point(new Position(-86.642662, 33.605438)));
        Document p4 = new Document("_id", 4).append("name", "Classy Views").append("logo", "red").append("capacity", 847).append("year", 1998).append("location", new Point(new Position(-119.7412, 39.579536)));
        Document p5 = new Document("_id", 5).append("name", "Fortune Theaters").append("logo", "red").append("capacity", 1368).append("year", 2007).append("location", new Point(new Position(-100.81213, 46.829876)));
        Document p6 = new Document("_id", 6).append("name", "8K Screening").append("logo", "blue").append("capacity", 619).append("year", 2019).append("location", new Point(new Position(-118.11414, -118.114143)));
        Document p7 = new Document("_id", 7).append("name", "Date Night").append("logo", "red").append("capacity", 715).append("year", 2012).append("location", new Point(new Position(-100.50107, 31.435648)));
        Document p8 = new Document("_id", 8).append("name", "City's Best Theaters").append("logo", "red").append("capacity", 888).append("year", 2016).append("location", new Point(new Position(-78.382912, 40.490524)));
        Document p9 = new Document("_id", 9).append("name", "Pets Movies").append("logo", "blue").append("capacity", 1092).append("year", 2010).append("location", new Point(new Position(-117.674814, 33.590599)));
        Document p10 = new Document("_id", 10).append("name", "Fancy Theaters").append("logo", "red").append("capacity", 673).append("year", 2006).append("location", new Point(new Position(-72.583824, 41.998211)));

        filterdata.add(p1);
        filterdata.add(p2);
        filterdata.add(p3);
        filterdata.add(p4);
        filterdata.add(p5);
        filterdata.add(p6);
        filterdata.add(p7);
        filterdata.add(p8);
        filterdata.add(p9);
        filterdata.add(p10);

        collection.insertMany(filterdata);
    }

}
