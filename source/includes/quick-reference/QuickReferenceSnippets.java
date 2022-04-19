package quickreference;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;

import com.mongodb.bulk.BulkWriteResult;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.DeleteManyModel;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.InsertOneModel;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.Updates;

public class QuickReferenceSnippets {

    // find a document
    private static void findOneExample(MongoCollection<Document> coll) {
        Document doc = coll.find(Filters.eq("title", "Hamlet")).first();
        System.out.println(doc.toJson());
    }
        
    // Find multiple documents
    private static void findExample(MongoCollection<Document> coll) {
        FindIterable<Document> results = coll.find(Filters.eq("year", 2005)).limit(3);
        results.forEach(doc -> System.out.println(doc.toJson()));
    }

    // Insert a document
    private static void insertOneExample(MongoCollection<Document> coll) {
        coll.insertOne(new Document("title", "Jackie Robinson"));
    }

    // Insert multiple documents
    private static void insertManyExample(MongoCollection<Document> coll) {
        coll.insertMany(
                Arrays.asList(
                        new Document("title", "Dangal").append("rating", "Not Rated"),
                        new Document("title", "The Boss Baby").append("rating",  "PG"))
                );
    }

    // Update a document
    private static void updateOneExample(MongoCollection<Document> coll) {
        coll.updateOne(
                Filters.eq("title", "Amadeus"),
                Updates.set("imdb.rating", 9.5));
    }

    // Update multiple documents
    private static void updateManyExample(MongoCollection<Document> coll) {
        coll.updateMany(
                Filters.eq("year", 2001),
                Updates.inc("imdb.votes", 100));
    }

    // Update arrays in a document
    private static void updateArrayExample(MongoCollection<Document> coll) {
        coll.updateOne(
                Filters.eq("title", "Cosmos"),
                Updates.push("genres", "Educational"));
    }

    // Replace a document
    private static void replaceExample(MongoCollection<Document> coll) {
        coll.replaceOne(
                Filters.and(Filters.eq("name",  "Deli Llama"), Filters.eq("address", "2 Nassau St")),
                new Document("name", "Lord of the Wings").append("zipcode",  10001));
    }

    // Delete a document
    private static void deleteOneExample(MongoCollection<Document> coll) {
        coll.deleteOne(Filters.eq("title",  "Congo"));
    }

    // Delete multiple documents
    private static void deleteManyExample(MongoCollection<Document> coll) {
        coll.deleteMany(Filters.regex("title", "^Shark.*"));
    }

    // Bulk write
    private static void bulkwriteExample(MongoCollection<Document> coll) {
        BulkWriteResult bwr = coll.bulkWrite(
                Arrays.asList(
                        new InsertOneModel<Document>(
                                new Document().append("title", "A New Movie").append("year",  2022)),
                        new DeleteManyModel<Document>(
                                Filters.lt("year",  1971))));
                              
        System.out.println(bwr);
    }

    // Watch for changes
    private static void watchExample(MongoCollection<Document> coll) {
        coll.watch(Arrays.asList(
                Aggregates.match(Filters.gte("year", 2022))));
    }

    // Access data from a Cursor Iteratively
    private static void cursorExample(MongoCollection<Document> coll) {
        MongoCursor<Document> cursor = coll.find().limit(5).cursor();
        while (cursor.hasNext()) {
            System.out.println(cursor.next().toJson());
        }
    }
    
    // Access data from a result as an Array
    private static void cursorArrayExample(MongoCollection<Document> coll) {
        List<Document> resultList = new ArrayList<Document>();
        coll.find().limit(5).into(resultList);
        System.out.println(resultList);
    }

    // Count
    private static void countExample(MongoCollection<Document> coll) {
        coll.countDocuments(Filters.eq("year", 2000));
    }

    // Limit
    private static void limitExample(MongoCollection<Document> coll) {
        coll.find().limit(2);
    }

    // Skip
    private static void skipExample(MongoCollection<Document> coll) {
        coll.find(Filters.regex("title", "^Rocky")).skip(2);
    }

    // Sort
    private static void sortExample(MongoCollection<Document> coll) {
        coll.find().limit(10).sort(Sorts.ascending("year")); 
    }

    // Projection
    private static void projectExample(MongoCollection<Document> coll) {
        coll.find().projection(Projections.fields(
                Projections.excludeId(),
                Projections.include("year", "imdb")));
    }

    // Create an index
    private static void createindexExample(MongoCollection<Document> coll) {
        coll.createIndex(
                Indexes.compoundIndex(
                        Indexes.ascending("title"),
                        Indexes.descending("year")));
    }

    // Distinct
    private static void distinctExample(MongoCollection<Document> coll) {
        // Note: use a different field when querying mflix sample dataset since there are some non-Integer values.
        coll.distinct("year", Integer.class); 
        
    }
    
    // Search text
    private static void searchTextExample(MongoCollection<Document> coll) {
        coll.find(Filters.text("zissou")).first();
        
    }
    
    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("movies");
            MongoCollection<Document> collection = database.getCollection("movies");

//            findOneExample(collection);
//            findExample(collection);
//            insertOneExample(collection);
//            insertManyExample(collection);
//            updateOneExample(collection);
//            updateManyExample(collection);
//            updateArrayExample(collection);
//            replaceExample(collection);
//            deleteOneExample(collection);
//            deleteManyExample(collection);
//            bulkwriteExample(collection);
//            watchExample(collection);
//            cursorExample(collection);
//            cursorArrayExample(collection);
//            countExample(collection);
//            limitExample(collection);
//            skipExample(collection);
//            sortExample(collection);
//            projectExample(collection);
//            createindexExample(collection);
//            distinctExample(collection);
//            searchTextExample(collection);
            
        } catch (Exception e) {
            System.err.println(e);
        }
        
    }
}
