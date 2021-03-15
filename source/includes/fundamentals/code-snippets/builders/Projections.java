package docs.builders;
// begin imports
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Indexes;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.json.JsonWriterSettings;

import java.util.Arrays;
import java.util.List;
// end imports
// begin static import
import static com.mongodb.client.model.Projections.*;
// end static import

public class Projections {
        // begin declarations
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private Projections() {
        final String uri = "mongodb+srv://<atlas-uri>/<dbname>?retryWrites=true&w=majority";

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("builders");
        collection = database.getCollection("projections");
    }

        // end declarations
    public static void main(String[] args) {
        Projections projections = new Projections();
        projections.setupCollection();
        projections.includeOneField();
        projections.includeMultipleFields();
        projections.excludeOneField();
        projections.excludeMultipleFields();
        projections.showFields();
        projections.excludeConvenienceId();
        projections.elemMatchNoFilter();
        projections.elemMatchWithFilter();
        projections.sliceNoSkip();
        projections.sliceWithSkip();
        projections.metaText();
    }

    private void metaText() {
        System.out.println("meta text score");
        // begin meta text score
        Bson filter = Filters.text("even number");
        Bson projection = fields(include("year"), metaTextScore("score"));
        collection.find(filter).projection(projection).forEach(doc -> System.out.println(doc.toJson()));
        // end meta text score
        System.out.println("");
    }

    private void sliceWithSkip() {
        System.out.println("slice with skip");
        // begin slice with skip
        Bson filter = Filters.empty();
        // second half of the year
        Bson projection = slice("temperatures", 6, 6);
        collection.find(filter).projection(projection)
                .forEach(doc -> System.out.println(doc.toJson(JsonWriterSettings.builder().indent(true).build())));
        // end slice with skip
        System.out.println("");
    }

    private void sliceNoSkip() {
        System.out.println("slice no skip");
        // begin slice no skip
        Bson filter = Filters.empty();
        // first half of the year
        Bson projection = slice("temperatures", 6);
        collection.find(filter).projection(projection)
                .forEach(doc -> System.out.println(doc.toJson(JsonWriterSettings.builder().indent(true).build())));
        // end slice no skip
        System.out.println("");
    }

    private void elemMatchWithFilter() {
        System.out.println("elemMatch with filter");
        // begin elemMatch with filter
        Bson filter = Filters.gt("temperatures.avg", 10.1);
        Bson projection = fields(include("year"), elemMatch("temperatures"));
        collection.find(filter).projection(projection).forEach(doc -> System.out.println(doc.toJson()));
        // end elemMatch with filter
        System.out.println("");
    }

    private void elemMatchNoFilter() {
        System.out.println("elemMatch no filter");
        // begin elemMatch no filter
        Bson filter = Filters.empty();
        Bson projection = fields(include("year"), elemMatch("temperatures", Filters.gt("avg", 10.1)));
        collection.find(filter).projection(projection).forEach(doc -> System.out.println(doc.toJson()));
        // end elemMatch no filter
        System.out.println("");
    }

    private void excludeConvenienceId() {
        System.out.println("exclude id");
        // begin exclude id
        Bson filter = Filters.empty();
        Bson projection = fields(include("year", "type"), excludeId());
        collection.find(filter).projection(projection).forEach(doc -> System.out.println(doc.toJson()));
        // end exclude id
        System.out.println("");
    }

    private void showFields() {
        System.out.println("show fields");
        // begin show fields
        Bson filter = Filters.empty();
        Bson projection = fields(include("year", "type"), exclude("_id"));
        collection.find(filter).projection(projection).forEach(doc -> System.out.println(doc.toJson()));
        // end show fields
        System.out.println("");
    }

    private void excludeMultipleFields() {
        System.out.println("exclude multiple fields");
        // begin exclude multiple fields
        Bson filter = Filters.empty();
        Bson projection = exclude("temperatures", "type");
        collection.find(filter).projection(projection).forEach(doc -> System.out.println(doc.toJson()));
        // end exclude multiple fields
        System.out.println("");
    }

    private void excludeOneField() {
        System.out.println("exclude one field");
        // begin exclude one field
        Bson filter = Filters.empty();
        Bson projection = exclude("temperatures");
        collection.find(filter).projection(projection).forEach(doc -> System.out.println(doc.toJson()));
        // end exclude one field
        System.out.println("");
    }

    private void includeMultipleFields() {
        System.out.println("include multiple fields");
        // begin include multiple fields
        Bson filter = Filters.empty();
        Bson projection = include("year", "type");
        collection.find(filter).projection(projection).forEach(doc -> System.out.println(doc.toJson()));
        // end include multiple fields
        System.out.println("");
    }

    private void includeOneField() {
        System.out.println("include single field");
        // begin include single field
        Bson filter = Filters.empty();
        Bson projection = include("year");
        collection.find(filter).projection(projection).forEach(doc -> System.out.println(doc.toJson()));
        // end include single field
        System.out.println("");
    }

    private void setupCollection() {
        System.out.println("setting up collection");
        // begin collection setup
        // The global average temperature, by month, from 2018 and 2019. Units are in
        // Celsius.
        List<Document> demoDocuments = Arrays.asList(
            new Document("year", 2018).append("type", "even number but not a leap year").append("temperatures",
                Arrays.asList(
                    new Document("month", "January").append("avg", 9.765),
                    new Document("month", "February").append("avg", 9.675),
                    new Document("month", "March").append("avg", 10.004),
                    new Document("month", "April").append("avg", 9.983),
                    new Document("month", "May").append("avg", 9.747),
                    new Document("month", "June").append("avg", 9.65),
                    new Document("month", "July").append("avg", 9.786),
                    new Document("month", "August").append("avg", 9.617),
                    new Document("month", "September").append("avg", 9.51),
                    new Document("month", "October").append("avg", 10.042),
                    new Document("month", "November").append("avg", 9.452),
                    new Document("month", "December").append("avg", 9.86))),
            new Document("year", 2019).append("type", "odd number, can't be a leap year").append("temperatures",
                Arrays.asList(
                    new Document("month", "January").append("avg", 10.023),
                    new Document("month", "February").append("avg", 9.808),
                    new Document("month", "March").append("avg", 10.43),
                    new Document("month", "April").append("avg", 10.175),
                    new Document("month", "May").append("avg", 9.648),
                    new Document("month", "June").append("avg", 9.686),
                    new Document("month", "July").append("avg", 9.794),
                    new Document("month", "August").append("avg", 9.741),
                    new Document("month", "September").append("avg", 9.84),
                    new Document("month", "October").append("avg", 10.15),
                    new Document("month", "November").append("avg", 9.84),
                    new Document("month", "December").append("avg", 10.366))));

        collection.drop();
        collection.insertMany(demoDocuments);
        collection.createIndex(Indexes.text("type"));
        // end collection setup
        System.out.println("");
    }
}
