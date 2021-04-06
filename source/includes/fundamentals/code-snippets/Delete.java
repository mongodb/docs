package docs;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.List;

import com.mongodb.client.model.Filters;

public class Delete {
    
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private Delete() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("crudOps");
        collection = database.getCollection("delete");
    }

    public static void main(String [] args){
        Delete delete = new Delete();
        delete.preview(true);
        delete.setupPaintCollection();

        System.out.println("Delete Many:");
        delete.deleteManyExample();
        delete.preview(false);

        System.out.println("Delete One:");
        delete.deleteOneExample();
        delete.preview(false);

        // System.out.println("Deleted:");
        // delete.findOneAndDeleteNullExample();
        // System.out.println("Find One and Delete:");
        // delete.preview(true);

        System.out.println("Deleted:");
        delete.findOneAndDeleteExample();
        System.out.println("Find One and Delete:");
        delete.preview(true);
    }

    private void deleteManyExample(){
        // begin deleteManyExample
        Bson filter = Filters.eq("qty", 0);
        collection.deleteMany(filter);
        // end deleteManyExample
    }

    private void findOneAndDeleteExample(){
        // begin findOneAndDeleteExample
        Bson filter = Filters.eq("qty", 8);
        System.out.println(collection.findOneAndDelete(filter).toJson());
        // end findOneAndDeleteExample
    }

    private void findOneAndDeleteNullExample(){
        // begin findOneAndDeleteNullExample
        Bson filter = Filters.eq("qty", 1);
        System.out.println(collection.findOneAndDelete(filter));
        // end findOneAndDeleteNullExample
    }

    private void deleteOneExample(){
        // begin deleteOneExample
        Bson filter = Filters.eq("color", "yellow");
        collection.deleteOne(filter);
        // end deleteOneExample
    }
    private void preview(boolean drop){
        Bson filter = Filters.empty();
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        if (drop){
          collection.drop();  
        }
    }

    private void setupPaintCollection() {

        List<Document> deletedata = new ArrayList<>();

        Document p1 = new Document("_id", 1).append("color", "red").append("qty", 5);
        Document p2 = new Document("_id", 2).append("color", "purple").append("qty", 8);
        Document p3 = new Document("_id", 3).append("color", "blue").append("qty", 0);
        Document p4 = new Document("_id", 4).append("color", "white").append("qty", 0);
        Document p5 = new Document("_id", 5).append("color", "yellow").append("qty", 6);
        Document p6 = new Document("_id", 6).append("color", "pink").append("qty", 0);
        Document p7 = new Document("_id", 7).append("color", "green").append("qty", 0);
        Document p8 = new Document("_id", 8).append("color", "black").append("qty", 8);
        
        deletedata.add(p1);
        deletedata.add(p2);
        deletedata.add(p3);
        deletedata.add(p4);
        deletedata.add(p5);
        deletedata.add(p6);
        deletedata.add(p7);
        deletedata.add(p8);

        collection.insertMany(deletedata);
    }
}
