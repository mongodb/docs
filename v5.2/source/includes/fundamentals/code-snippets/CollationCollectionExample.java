package fundamentals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Collation;
import com.mongodb.client.model.CollationAlternate;
import com.mongodb.client.model.CollationCaseFirst;
import com.mongodb.client.model.CollationMaxVariable;
import com.mongodb.client.model.CollationStrength;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.FindOneAndDeleteOptions;
import com.mongodb.client.model.FindOneAndUpdateOptions;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.ReturnDocument;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.Updates;

public class CollationCollectionExample {


    private static void aggregatesExample(MongoCollection<Document> collection) {
        // Creates aggregation stages to tally the frequencies of "first_name" values and sort the output documents
        // start aggregationExample
        Bson groupStage = Aggregates.group("$first_name", Accumulators.sum("nameCount", 1));
        Bson sortStage = Aggregates.sort(Sorts.ascending("_id"));

        AggregateIterable<Document> results = collection
                // Runs the aggregation pipeline that includes tallying "first_name" frequencies
                .aggregate(Arrays.asList(groupStage, sortStage))

                // Applies a collation to sort documents alphabetically by using the German locale, ignoring accents
                .collation(Collation.builder().locale("de").collationStrength(CollationStrength.PRIMARY).build());

        // Prints the JSON representation of the results
        if (results != null) {
            results.forEach(doc -> System.out.println(doc.toJson()));
        }
        // end aggregationExample
    }

    private static void findAndSortExample(MongoCollection<Document> collection) {
        // start findAndSort
        List<Document> results = new ArrayList<>();

        // Retrieves all documents and applies a "de@collation-phonebook" collation and ascending sort to the results
        collection.find()
                .collation(Collation.builder().locale("de@collation=phonebook").build())
                .sort(Sorts.ascending("first_name")).into(results);

        // Prints the JSON representation of the results          
        if (results != null) {
            results.forEach(doc -> System.out.println(doc.toJson()));
        }
        // end findAndSort
    }

    private static void findOneAndUpdateExample(MongoCollection<Document> collection) {
        // Updates the first matching document, sorted by using the "de@collation=phonebook" collation
        // start findOneAndUpdate
        Document result = collection.findOneAndUpdate(
                Filters.gt("first_name", "Gunter"),
                Updates.set("verified", true),
                new FindOneAndUpdateOptions()
                        .collation(Collation.builder().locale("de@collation=phonebook").build())
                        .sort(Sorts.ascending("first_name"))
                        .returnDocument(ReturnDocument.AFTER));

        // Prints the JSON representation of the updated document if an update occurred           
        if (result != null) {
            System.out.println("Updated document: " + result.toJson());
        }
        // end findOneAndUpdate
    }

    private static void findOneAndDeleteExample(MongoCollection<Document> collection) {
        List<Document> results = new ArrayList<>();

        // Retrieves documents that match the filter and adds them to a list
        collection.find(Filters.gt("a", "100")).into(results);

        // Prints the JSON representation of the result list
        results.forEach(r -> System.out.println(r.toJson()));

        // Deletes the first document that matches the filter, ordered by the value of the "a" field
        // start findOneAndDelete
        Document result = collection.findOneAndDelete(
                Filters.gt("a", "100"),
                new FindOneAndDeleteOptions()
                        .collation(
                                Collation.builder()
                                        .locale("en")
                                        .numericOrdering(true)
                                        .build())
                        .sort(Sorts.ascending("a")));

        // Prints the JSON representation of the deleted document  
        if (result != null) {
            System.out.println("Deleted document: " + result.toJson());
        }
        // end findOneAndDelete
    }

    private static void insertPhonebookDocuments(MongoCollection collection) {
        List<Document> docs = new ArrayList<>();

        docs.add(new Document("first_name", "Klara"));
        docs.add(new Document("first_name", "Gunter"));
        docs.add(new Document("first_name", "Günter"));
        docs.add(new Document("first_name", "Jürgen"));
        docs.add(new Document("first_name", "Hannah"));

        collection.insertMany(docs);
    }

    private static void insertNumericalStrings(MongoCollection collection) {
        List<Document> docs = new ArrayList<>();

        docs.add(new Document("_id", 1).append("a", "16 apples"));
        docs.add(new Document("_id", 2).append("a", "84 oranges"));
        docs.add(new Document("_id", 3).append("a",  "179 bananas"));

        collection.insertMany(docs);
    }

    private static void collationBuilder() {
        // Creates a collation that includes several collation options
        // start collationBuilder
        Collation.builder()
        .caseLevel(true)
        .collationAlternate(CollationAlternate.SHIFTED)
        .collationCaseFirst(CollationCaseFirst.UPPER)
        .collationMaxVariable(CollationMaxVariable.SPACE)
        .collationStrength(CollationStrength.SECONDARY)
        .locale("en_US")
        .normalization(false)
        .numericOrdering(true)
        .build();
        // end collationBuilder
    }

    private static void createCollectionOptions(MongoDatabase database) {
        // Creates a collection and sets its default collation locale as "en_US"
        // start createCollectionOptions
        database.createCollection(
                "items",
                new CreateCollectionOptions().collation(
                        Collation.builder().locale("en_US").build()));
        // end createCollectionOptions
    }

    private static void listIndexes(MongoDatabase database) {
        // start listIndexes
        MongoCollection<Document> collection = database.getCollection("items");
        List<Document> indexes = new ArrayList<>();

        collection.listIndexes().into(indexes);

        // Prints the collection's indexes and any default collations
        indexes.forEach(idx -> System.out.println(idx.toJson()));
        // end listIndexes
    }

    private static void createIndex(MongoDatabase database) {
        // start createIndex
        MongoCollection<Document> collection = database.getCollection("items");
        IndexOptions idxOptions = new IndexOptions();

        // Defines options that set a collation locale
        idxOptions.collation(Collation.builder().locale("en_US").build());

        // Creates an index on the "name" field with the collation and ascending sort order
        collection.createIndex(Indexes.ascending("name"), idxOptions);
        // end createIndex
    }

    private static void createPhonebookIndex(MongoDatabase database) {
        MongoCollection<Document> collection = database.getCollection("phonebook");
        IndexOptions idxOptions = new IndexOptions();

        // Defines options that set a collation's locale, comparison levels, and punctuation guidelines
        idxOptions.collation(Collation.builder().locale("de@collation=search").collationStrength(CollationStrength.PRIMARY).collationAlternate(CollationAlternate.SHIFTED).build());
        
        // Creates an index on the "first_name" field with the collation and ascending sort order
        collection.createIndex(Indexes.ascending("first_name"), idxOptions);
    }

    private static void indexOperation(MongoCollection collection) {
        // Retrieves all documents and applies a collation and ascending sort to them
        // start indexOperation
        FindIterable<Document> cursor = collection.find()
                .collation(Collation.builder().locale("en_US").build())
                .sort(Sorts.ascending("name"));
        // end indexOperation
        cursor.forEach(doc -> System.out.println(doc.toJson()));
    }

    private static void customCollationOperation(MongoCollection collection) {
        // Retrieves all documents and applies a collation and ascending sort to them
        // start customCollationOperation
        FindIterable<Document> cursor = collection.find()
                .collation(Collation.builder().locale("is").build())
                .sort(Sorts.ascending("name"));
        // end customCollationOperation
    }

    private static void operationCollation(MongoCollection collection) {
        // Retrieves documents that match the query filter and applies a collation and ascending sort to the results
        // start operationCollation
        FindIterable<Document> cursor = collection.find(new Document("name", "cote"))
                .collation(Collation.builder().locale("en_US").build())
                .sort(Sorts.ascending("name"));
        // end operationCollation

        // Prints the JSON representation of the returned documents
        cursor.forEach(doc -> System.out.println(doc.toJson()));
    }

    public static void main(String[] args) {

        String uri = "<MongoDB connection URI>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("fundamentals_example");
//            MongoCollection<Document> collection = database.getCollection("phonebook");

        }
    }

}
