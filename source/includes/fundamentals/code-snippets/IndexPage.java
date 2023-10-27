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

        // Creates an index on the "title" field in ascending order 
        // begin single index
        String resultCreateIndex = collection.createIndex(Indexes.ascending("title"));
        System.out.println(String.format("Index created: %s", resultCreateIndex));
        // end single index

        // Retrieves matching documents directly from the "title" index, applying a sort and projection
        // begin covered single query
        Bson filter = eq("title", "Batman");
        Bson sort = Sorts.ascending("title");
        Bson projection = fields(include("title"), excludeId());
        FindIterable<Document> cursor = collection.find(filter).sort(sort).projection(projection);
        // end covered single query
        
        // Prints the results of the find operation
        cursor.forEach(doc -> System.out.println(doc));

    }

    private void compoundIndex() {
        System.out.println("compound index");

        // Creates a compound index on the "type" and "rated" fields in ascending order
        // begin compound index
        String resultCreateIndex = collection.createIndex(Indexes.ascending("type", "rated"));
        System.out.println(String.format("Index created: %s", resultCreateIndex));
        // end compound index

        // Retrieves matching documents directly from the compound index, applying a sort and projection
        // begin covered compound query
        Bson filter = and(eq("type", "movie"), eq("rated", "G"));
        Bson sort = Sorts.ascending("type", "rated");
        Bson projection = fields(include("type", "rated"), excludeId());
        FindIterable<Document> cursor = collection.find(filter).sort(sort).projection(projection);
        // end covered compound query

        // Prints the results of the find operation
        cursor.forEach(doc -> System.out.println(doc));
    }

    private void multiKeyIndex() {
        System.out.println("multikey index");
        // Creates a compound multikey index on the "rated", "genres", and "title" fields in ascending order
        // begin multikey index
        String resultCreateIndex = collection.createIndex(Indexes.ascending("rated", "genres", "title"));
        System.out.println(String.format("Index created: %s", resultCreateIndex));
        // end multikey index

        // Retrieves matching documents directly from the multikey index, applying a sort and projection
        // begin covered multikey query
        Bson filter = and(eq("genres", "Animation"), eq("rated", "G"));
        Bson sort = Sorts.ascending("title");
        Bson projection = fields(include("title", "rated"), excludeId());
        FindIterable<Document> cursor = collection.find(filter).sort(sort).projection(projection);
        // end covered multikey query

       // Prints the results of the find operation
        cursor.forEach(doc -> System.out.println(doc));
    }

    private void textIndex() {
        System.out.println("text index");
        // Creates a text index on the "plot" field
        // begin text index
        try {
            String resultCreateIndex = collection.createIndex(Indexes.text("plot"));
            System.out.println(String.format("Index created: %s", resultCreateIndex));
        
        // Prints a message if a text index already exists with a different configuration 
        } catch (MongoCommandException e) {
            if (e.getErrorCodeName().equals("IndexOptionsConflict"))
                System.out.println("there's an existing text index with different options");
        }
        // end text index

        // Retrieves matching documents directly from the text index, applying a projection
        // begin text query
        Bson filter = text("java coffee shop");
        Bson projection = fields(include("fullplot"), excludeId());
        FindIterable<Document> cursor = collection.find(filter).projection(projection);
        // end text query

        // Prints the results of the find operation
        cursor.forEach(doc -> System.out.println(doc));
    }

    private void geoSpatialIndex() {
        System.out.println("geospatial index");
        collection = database.getCollection("theaters");

        // Creates a geospatial index on the "location.geo" field
        // begin geospatial index
        try {
            String resultCreateIndex = collection.createIndex(Indexes.geo2dsphere("location.geo"));
            System.out.println(String.format("Index created: %s", resultCreateIndex));
        
        // Prints a message if a geospatial index already exists with a different configuration 
        } catch (MongoCommandException e) {
            if (e.getErrorCodeName().equals("IndexOptionsConflict"))
                System.out.println("there's an existing geospatial index with different options");
        }
        // end geospatial index

        // begin geospatial query
        // Stores the coordinates of the NY MongoDB headquarters
        Point refPoint = new Point(new Position(-73.98456, 40.7612));

        // Retrieves documents that represent locations up to 1000 meters from the specified point directly from the geospatial index
        // Creates a filter to match a document 
        Bson filter = near("location.geo", refPoint, 1000.0, 0.0);
        FindIterable<Document> cursor = collection.find(filter);
        // end geospatial query

        // Prints the results of the find operation
        cursor.forEach(doc -> System.out.println(doc));
    }

    private void uniqueIndex() {
        System.out.println("unique index");
        collection = database.getCollection("theaters");

        // Creates a unique index on the "theaterID" field in descending order
        // begin unique index
        try {
            IndexOptions indexOptions = new IndexOptions().unique(true);
            String resultCreateIndex = collection.createIndex(Indexes.descending("theaterId"), indexOptions);
            System.out.println(String.format("Index created: %s", resultCreateIndex));
        
        // Prints a message if the "theaterID" field contains duplicate values
        } catch (DuplicateKeyException e) {
            System.out.printf("duplicate field values encountered, couldn't create index: \t%s\n", e);
        }
        // end unique index
    }
    private void wildcardIndex() {
        System.out.println("wildcard index");
        collection = database.getCollection("theaters");

        // Creates a wildcard index on all values of the "location" field in ascending order
        // begin wildcard index
        String resultCreateIndex = collection.createIndex(Indexes.ascending("location.$**")); 
        System.out.println(String.format("Index created: %s", resultCreateIndex));
        // end wildcard index
    }
}
