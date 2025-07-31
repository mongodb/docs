package aggregation.pipelines.filter;

import com.mongodb.client.*;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Tutorial {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoCollection<Document> persons;

    public void loadSampleData() {
        mongoClient = MongoClients.create(uri);
        // :snippet-start: load-sample-data
        MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
        persons = aggDB.getCollection("persons"); // :remove:
        // :uncomment-start:
        // MongoCollection<Document> persons = aggDB.getCollection("persons");
        // :uncomment-end:

        persons.insertMany(
                Arrays.asList(
                        new Document("person_id", "6392529400")
                                .append("firstname", "Elise")
                                .append("lastname", "Smith")
                                .append("dateofbirth", LocalDateTime.parse("1972-01-13T09:32:07"))
                                .append("vocation", "ENGINEER")
                                .append("address", new Document("number", 5625)
                                        .append("street", "Tipa Circle")
                                        .append("city", "Wojzinmoj")),
                        new Document("person_id", "1723338115")
                                .append("firstname", "Olive")
                                .append("lastname", "Ranieri")
                                .append("dateofbirth", LocalDateTime.parse("1985-05-12T23:14:30"))
                                .append("gender", "FEMALE")
                                .append("vocation", "ENGINEER")
                                .append("address", new Document("number", 9303)
                                        .append("street", "Mele Circle")
                                        .append("city", "Tobihbo")),
                        new Document("person_id", "8732762874")
                                .append("firstname", "Toni")
                                .append("lastname", "Jones")
                                .append("dateofbirth", LocalDateTime.parse("1991-11-23T16:53:56"))
                                .append("vocation", "POLITICIAN")
                                .append("address", new Document("number", 1)
                                        .append("street", "High Street")
                                        .append("city", "Upper Abbeywoodington")),
                        new Document("person_id", "7363629563")
                                .append("firstname", "Bert")
                                .append("lastname", "Gooding")
                                .append("dateofbirth", LocalDateTime.parse("1941-04-07T22:11:52"))
                                .append("vocation", "FLORIST")
                                .append("address", new Document("number", 13)
                                        .append("street", "Upper Bold Road")
                                        .append("city", "Redringtonville")),
                        new Document("person_id", "1029648329")
                                .append("firstname", "Sophie")
                                .append("lastname", "Celements")
                                .append("dateofbirth", LocalDateTime.parse("1959-07-06T17:35:45"))
                                .append("vocation", "ENGINEER")
                                .append("address", new Document("number", 5)
                                        .append("street", "Innings Close")
                                        .append("city", "Basilbridge")),
                        new Document("person_id", "7363626383")
                                .append("firstname", "Carl")
                                .append("lastname", "Simmons")
                                .append("dateofbirth", LocalDateTime.parse("1998-12-26T13:13:55"))
                                .append("vocation", "ENGINEER")
                                .append("address", new Document("number", 187)
                                        .append("street", "Hillside Road")
                                        .append("city", "Kenningford"))
                )
        );
        // :snippet-end:
    }

    public List<Document> runTutorial() {
        List<Bson> pipeline = new ArrayList<>();
        // :snippet-start: match
        pipeline.add(Aggregates.match(Filters.eq("vocation", "ENGINEER")));
        // :snippet-end:
        // :snippet-start: sort
        pipeline.add(Aggregates.sort(Sorts.descending("dateofbirth")));
        // :snippet-end:
        // :snippet-start: limit
        pipeline.add(Aggregates.limit(3));
        // :snippet-end:
        // :snippet-start: unset
        pipeline.add(Aggregates.unset("_id", "address"));
        // :snippet-end:
        // :snippet-start: run-pipeline
        AggregateIterable<Document> aggregationResult = persons.aggregate(pipeline);
        // :snippet-end:
        List<Document> documents = new ArrayList<>();
        for (Document document : aggregationResult) {
            documents.add(document);
        }
        mongoClient.close();
        return documents;
    }
}
