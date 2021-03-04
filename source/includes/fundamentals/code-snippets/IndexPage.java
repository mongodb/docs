package docs.indexes;

// begin imports
import com.mongodb.DuplicateKeyException;
import com.mongodb.MongoCommandException;
import com.mongodb.client.*;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.geojson.Point;
import com.mongodb.client.model.geojson.Position;
import org.apache.log4j.BasicConfigurator;
import org.bson.Document;
import org.bson.conversions.Bson;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
// end imports

public class IndexPage {

    private final MongoClient mongoClient;
    private final MongoDatabase database;
    private MongoCollection<Document> collection;

    private IndexPage() {
        BasicConfigurator.configure();

        // begin declaration
        final String uri = "mongodb+srv://<atlas-uri>/<dbname>?retryWrites=true&w=majority";

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("sample_mflix");
        collection = database.getCollection("movies");
        // end declaration
    }

    public static void main(String[] args) {
        IndexPage page = new IndexPage();
        page.singleIndex();
        page.compoundIndex();
        page.wildCardIndex();
        page.multiKeyIndex();
        page.textIndex();
        page.geoSpatialIndex();
        page.uniqueIndex();
    }

    private void singleIndex() {
        System.out.println("single index");
        // begin single index
        String resultCreateIndex = collection.createIndex(Indexes.ascending("title"));
        System.out.println(String.format("Index created: %s", resultCreateIndex));
        // end single index

        // begin covered single query
        Bson filter = eq("title", "Batman");
        Bson sort = Sorts.ascending("title");
        Bson projection = fields(include("title"), excludeId());
        FindIterable<Document> cursor = collection.find(filter).sort(sort).projection(projection);
        // end covered single query
        cursor.forEach(doc -> System.out.println(doc));

    }

    private void compoundIndex() {
        System.out.println("compound index");
        // begin compound index
        String resultCreateIndex = collection.createIndex(Indexes.ascending("type", "rated"));
        System.out.println(String.format("Index created: %s", resultCreateIndex));
        // end compound index

        // begin covered compound query
        Bson filter = and(eq("type", "movie"), eq("rated", "G"));
        Bson sort = Sorts.ascending("type", "rated");
        Bson projection = fields(include("type", "rated"), excludeId());
        FindIterable<Document> cursor = collection.find(filter).sort(sort).projection(projection);
        // end covered compound query
        cursor.forEach(doc -> System.out.println(doc));
    }

    private void multiKeyIndex() {
        System.out.println("multikey index");
        // begin multikey index
        String resultCreateIndex = collection.createIndex(Indexes.ascending("rated", "genres", "title"));
        System.out.println(String.format("Index created: %s", resultCreateIndex));
        // end multikey index

        // begin covered multikey query
        Bson filter = and(eq("genres", "Animation"), eq("rated", "G"));
        Bson sort = Sorts.ascending("title");
        Bson projection = fields(include("title", "rated"), excludeId());
        FindIterable<Document> cursor = collection.find(filter).sort(sort).projection(projection);
        // end covered multikey query
        cursor.forEach(doc -> System.out.println(doc));
    }

    private void textIndex() {
        System.out.println("text index");
        // begin text index
        // create a text index of the "fullplot" field in the "movies" collection
        // if a text index already exists with a different configuration, this will
        // error
        try {
            String resultCreateIndex = collection.createIndex(Indexes.text("plot"));
            System.out.println(String.format("Index created: %s", resultCreateIndex));
        } catch (MongoCommandException e) {
            if (e.getErrorCodeName().equals("IndexOptionsConflict"))
                System.out.println("there's an existing text index with different options");
        }
        // end text index

        // begin text query
        Bson filter = text("java coffee shop");
        Bson projection = fields(include("fullplot"), excludeId());
        FindIterable<Document> cursor = collection.find(filter).projection(projection);
        // end text query
        cursor.forEach(doc -> System.out.println(doc));
    }

    private void geoSpatialIndex() {
        System.out.println("geospatial index");
        collection = database.getCollection("theaters");
        // begin geospatial index
        // if an existing geo index exists, this will error
        try {
            String resultCreateIndex = collection.createIndex(Indexes.geo2dsphere("location.geo"));
            System.out.println(String.format("Index created: %s", resultCreateIndex));
        } catch (MongoCommandException e) {
            if (e.getErrorCodeName().equals("IndexOptionsConflict"))
                System.out.println("there's an existing text index with different options");
        }
        // end geospatial index

        // begin geospatial query
        // MongoDB Headquarters in NY, NY.
        Point refPoint = new Point(new Position(-73.98456, 40.7612));
        Bson filter = near("location.geo", refPoint, 1000.0, 0.0);
        FindIterable<Document> cursor = collection.find(filter);
        // end geospatial query
        cursor.forEach(doc -> System.out.println(doc));
    }

    private void uniqueIndex() {
        System.out.println("unique index");
        collection = database.getCollection("theaters");

        // begin unique index
        // this will fail if any duplicate values exist on the field you are indexing
        try {
            IndexOptions indexOptions = new IndexOptions().unique(true);
            String resultCreateIndex = collection.createIndex(Indexes.descending("theaterId"), indexOptions);
            System.out.println(String.format("Index created: %s", resultCreateIndex));
        } catch (DuplicateKeyException e) {
            System.out.printf("duplicate field values encountered, couldn't create index: \t%s\n", e);
        }
        // end unique index
    }
}
