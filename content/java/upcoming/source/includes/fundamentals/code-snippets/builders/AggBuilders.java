package docs.builders;

// begin static import
import static com.mongodb.client.model.Aggregates.*;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
import static com.mongodb.client.model.Sorts.*;
import static com.mongodb.client.model.Accumulators.*;
import static com.mongodb.client.model.search.SearchPath.fieldPath;
import static com.mongodb.client.model.search.VectorSearchOptions.exactVectorSearchOptions;
import static java.util.Arrays.asList;
// end static import

import com.mongodb.MongoNamespace;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.*;
import com.mongodb.client.model.search.VectorSearchOptions;
import java.util.List;
import com.mongodb.client.model.search.FieldSearchPath;
import org.bson.BsonString;
import org.bson.Document;
import org.bson.conversions.Bson;

public class AggBuilders {
    private MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private MongoDatabase database;

    private AggBuilders() {
        final String uri = "<Your connection string>";

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("sample_mflix");
        collection = database.getCollection("movies");
    }

    private void filterTopSubset() {
        database = mongoClient.getDatabase("agg-builders");
        collection = database.getCollection("warehouses");

        Bson matchStage = match(eq("vocation", "ENGINEER"));
        Bson sortStage = sort(orderBy(descending("dateofbirth")));
        Bson limitStage = limit(3);
        Bson unsetStage = new Document("$unset", (asList("_id", "vocation", "address")));

        collection.aggregate(asList(matchStage, sortStage, limitStage, unsetStage));

    }

    public static void main(String[] args) {
        AggBuilders page = new AggBuilders();
        page.matchStage();
        page.projectStage();
        page.projectComputed();
        page.sampleStage();
        page.sortStage();
        page.skipStage();
        page.limitStage();
        page.basicLookupStage();
        page.advancedLookupStage();
        page.groupStage();
        page.unwindStage();
        page.unwindPreserveStage();
        page.unwindIndexStage();
        page.outStage();
        page.mergeStage();
        page.mergeOptionsStage();
        page.graphLookupStage();
        page.graphLookupDepthStage();
        page.graphLookupMatchStage();
        page.sortByCountStage();
        page.replaceRootStage();
        page.addFieldsStage();
        page.countStage();
        page.basicBucketStage();
        page.bucketOptionsStage();
        page.basicBucketAutoStage();
        page.bucketAutoOptionsStage();
        page.facetStage();
        page.vectorSearchPipeline();
        page.setWindowFieldsStage();
        page.aggregationExample();
    }

    private void aggregationExample() {
        // begin aggregationSample
        Bson matchStage = match(eq("some_field", "some_criteria"));
        Bson sortByCountStage = sortByCount("some_field");
        collection.aggregate(asList(matchStage, sortByCountStage)).forEach(doc -> System.out.println(doc));
        // end aggregationSample
    }

    private void setWindowFieldsStage() {
        // begin setWindowFields
        Window pastMonth = Windows.timeRange(-1, MongoTimeUnit.MONTH, Windows.Bound.CURRENT);
        setWindowFields("$localityId", Sorts.ascending("measurementDateTime"),
                WindowOutputFields.sum("monthlyRainfall", "$rainfall", pastMonth),
                WindowOutputFields.avg("monthlyAvgTemp", "$temperature", pastMonth));
        // end setWindowFields
    }

    private void facetStage() {
        // begin facet
        facet(new Facet("Screen Sizes",
                bucketAuto("$attributes.screen_size", 5, new BucketAutoOptions().output(sum("count", 1)))),
                new Facet("Manufacturer", sortByCount("$attributes.manufacturer"), limit(5)));
        // end facet
    }

    private void bucketAutoOptionsStage() {
        // begin bucketAutoOptions
        bucketAuto("$price", 10, new BucketAutoOptions().granularity(BucketGranularity.POWERSOF2)
                .output(sum("count", 1), avg("avgPrice", "$price")));
        // end bucketAutoOptions
    }

    private void basicBucketAutoStage() {
        // begin bucketAutoBasic
        bucketAuto("$price", 10);
        // end bucketAutoBasic
    }

    private void bucketOptionsStage() {
        // begin bucketOptions
        bucket("$screenSize", asList(0, 24, 32, 50, 70),
                new BucketOptions().defaultBucket("monster").output(sum("count", 1), push("matches", "$screenSize")));
        // end bucketOptions
    }

    private void basicBucketStage() {
        // begin basicBucket
        bucket("$screenSize", asList(0, 24, 32, 50, 70, 200));
        // end basicBucket
    }

    private void countStage() {
        // begin count
        count("total");
        // end count
    }

    private void addFieldsStage() {
        // begin addFields
        addFields(new Field("a", 1), new Field("b", 2));
        // end addFields
    }

    private void replaceRootStage() {
        // begin replaceRoot
        replaceRoot("$spanish_translation");
        // end replaceRoot
    }

    private void sortByCountStage() {
        // begin sortByCount
        sortByCount(new Document("$floor", "$x"));
        // end sortByCount
    }

    private void graphLookupMatchStage() {
        // begin graphLookupMatch
        graphLookup("contacts", "$friends", "friends", "name", "socialNetwork",
                new GraphLookupOptions().maxDepth(1).restrictSearchWithMatch(eq("hobbies", "golf")));
        // end graphLookupMatch
    }

    private void graphLookupDepthStage() {
        // begin graphLookupDepth
        graphLookup("contacts", "$friends", "friends", "name", "socialNetwork",
                new GraphLookupOptions().maxDepth(2).depthField("degrees"));
        // end graphLookupDepth
    }

    private void graphLookupStage() {
        // begin graphLookupBasic
        graphLookup("contacts", "$friends", "friends", "name", "socialNetwork");
        // end graphLookupBasic
    }

    private void mergeOptionsStage() {
        // begin mergeOptions
        merge(new MongoNamespace("reporting", "customers"),
                new MergeOptions().uniqueIdentifier(asList("date", "customerId"))
                        .whenMatched(MergeOptions.WhenMatched.REPLACE)
                        .whenNotMatched(MergeOptions.WhenNotMatched.INSERT));
        // end mergeOptions
    }

    private void mergeStage() {
        // begin mergeStage
        merge("authors");
        // end mergeStage
    }

    private void outStage() {
        // begin out
        out("authors");
        // end out
    }

    private void unwindIndexStage() {
        // begin unwindIndex
        unwind("$sizes", new UnwindOptions().includeArrayIndex("position"));
        // end unwindIndex
    }

    private void unwindPreserveStage() {
        // begin unwindPreserve
        unwind("$sizes", new UnwindOptions().preserveNullAndEmptyArrays(true));
        // end unwindPreserve
    }

    private void unwindStage() {
        // begin unwindStage
        unwind("$sizes");
        // end unwindStage
    }

    private void groupStage() {
        // begin group
        group("$customerId", sum("totalQuantity", "$quantity"), avg("averageQuantity", "$quantity"));
        // end group
    }

    private void advancedLookupStage() {
        database = mongoClient.getDatabase("agg-builders");
        collection = database.getCollection("warehouses");
        collection.drop();
        collection.insertMany(asList(
                new Document("_id", 1).append("stock_item", "almonds").append("warehouse", "A").append("instock", 120),
                new Document("_id", 2).append("stock_item", "pecans").append("warehouse", "A").append("instock", 80),
                new Document("_id", 3).append("stock_item", "almonds").append("warehouse", "B").append("instock", 60),
                new Document("_id", 4).append("stock_item", "cookies").append("warehouse", "B").append("instock", 40),
                new Document("_id", 5).append("stock_item", "cookies").append("warehouse", "A").append("instock", 80)));
        collection = database.getCollection("orders");
        collection.drop();
        collection.insertMany(
                asList(new Document("_id", 1).append("item", "almonds").append("price", 12).append("ordered", 2),
                        new Document("_id", 2).append("item", "pecans").append("price", 20).append("ordered", 1),
                        new Document("_id", 3).append("item", "cookies").append("price", 10).append("ordered", 60)));
        // begin advanced lookup
        List<Variable<String>> variables = asList(new Variable<>("order_item", "$item"),
                new Variable<>("order_qty", "$ordered"));

        List<Bson> pipeline = asList(
                match(expr(new Document("$and",
                        asList(new Document("$eq", asList("$$order_item", "$stock_item")),
                                new Document("$gte", asList("$instock", "$$order_qty")))))),
                project(fields(exclude("stock_item"), excludeId())));

        Bson innerJoinLookup = lookup("warehouses", variables, pipeline, "stockdata");
        // end advanced lookup
        // Missing advancedLookup assignment
        // MongoCursor<Document> cursor =
        // collection.aggregate(asList(advancedLookup)).cursor();
        // cursor.forEachRemaining(doc -> System.out.println(doc.toJson()));
        // database = mongoClient.getDatabase("sample_mflix");
        // collection = database.getCollection("movies");
    }

    private void basicLookupStage() {
        // begin basic lookup
        lookup("comments", "_id", "movie_id", "joined_comments");
        // end basic lookup
    }

    private void limitStage() {
        // begin limit
        limit(10);
        // end limit
    }

    private void skipStage() {
        // begin skip
        skip(5);
        // end skip
    }

    private void sortStage() {
        // begin sortStage
        sort(orderBy(descending("year"), ascending("title")));
        // end sortStage
    }

    private void sampleStage() {
        // begin sample
        sample(5);
        // end sample
    }

    private void projectComputed() {
        // begin computed
        project(fields(computed("rating", "$rated"), excludeId()));
        // end computed
    }

    private void projectStage() {
        // begin project
        project(fields(include("title", "plot"), excludeId()));
        // end project
    }

    private void matchStage() {
        // begin match
        match(eq("title", "The Shawshank Redemption"));
        // end match
    }

    // Requires MongoDB version that supports $vectorSearch
    private void vectorSearchPipeline() {

        // begin vectorSearch
        // Create an instance of the BinaryVector class as the query vector
        BinaryVector queryVector = BinaryVector.floatVector(
            new float[]{0.0001f, 1.12345f, 2.23456f, 3.34567f, 4.45678f});

        // Specify the index name for the vector embedding index
        String indexName = "mflix_movies_embedding_index";

        // Specify the path of the field to search on
        FieldSearchPath fieldSearchPath = fieldPath("plot_embedding");

        // Limit the number of matches to 1
        int limit = 1;

        // Create a pre-filter to only search within a subset of documents
        VectorSearchOptions options = exactVectorSearchOptions()
            .filter(gte("year", 2016));

        // Create the vectorSearch pipeline stage
        List<Bson> pipeline = asList(
                vectorSearch(
                        fieldSearchPath,
                        queryVector,
                        indexName,
                        limit,
                        options),
                project(
                        metaVectorSearchScore("vectorSearchScore")));
        // end vectorSearch

        // begin vectorSearch-output
        Document found = collection.aggregate(pipeline).first();
        double score = found.getDouble("vectorSearchScore").doubleValue();

        System.out.println("vectorSearch score: " + score);
        // end vectorSearch-output

        // Example output: "vectorSearch score: 0.887437105178833"
    }

    private void documentsStage() {
        // begin documents
        documents(asList(
                new Document("title", "The Shawshank Redemption"),
                new Document("title", "Back to the Future"),
                new Document("title", "Jurassic Park")));
        // end documents
    }
}
