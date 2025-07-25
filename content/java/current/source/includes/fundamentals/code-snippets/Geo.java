package com.mycompany.app;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

// begin exampleImports
import java.util.Arrays;
import org.bson.conversions.Bson;
import com.mongodb.client.model.geojson.Point;
import com.mongodb.client.model.geojson.Polygon;
import com.mongodb.client.model.geojson.Position;
import static com.mongodb.client.model.Filters.near;
import static com.mongodb.client.model.Filters.geoWithin;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import static com.mongodb.client.model.Projections.excludeId;
// end exampleImports

public class Geo {

    private final MongoClient mongoClient;

    public Geo() {
        final String uri = System.getenv("DRIVER_REF_URI");
        mongoClient = MongoClients.create(uri);

    }

    public static void main(String[] args) {
        Geo geo = new Geo();
        geo.go();
    }

    public void go() {
        Geo geo = new Geo();
        System.out.println("Near Example: ");
        geo.nearExample();
        System.out.println("Range Example: ");
        geo.rangeExample();

    }

    private void insertGeoJSONExample() {
        // begin insertGeoJSONExample

        // Add your MongoCollection setup code here
        Point point = new Point(new Position(-74.0065, 40.7085));
        
        Document theater = new Document("theaterId", 1203)
        		.append("location", new Document("geo", point));

        InsertOneResult result = collection.insertOne(theater);
        // end insertGeoJSONExample
    }

    private void insertLegacyExample() {
        // begin insertLegacyExample

        // Add your MongoCollection setup code here
        Document theater = new Document("theaterId", 1204)
        		.append("coordinates", Arrays.asList(-73.9862, 40.7311));

        InsertOneResult result = collection.insertOne(theater);
        // end insertLegacyExample
    }

    private void nearExample() {
        // begin findExample

        // Add your MongoClient setup code here
        MongoDatabase database = mongoClient.getDatabase("sample_mflix");
        MongoCollection<Document> collection = database.getCollection("theaters");

        Point centralPark = new Point(new Position(-73.9667, 40.78));
        
        // Creates a query that matches all locations between 5,000 and 10,000 meters from the specified Point
        Bson query = near("location.geo", centralPark, 10000.0, 5000.0);

        // Creates a projection to include only the "location.address.city" field in the results
        Bson projection = fields(include("location.address.city"), excludeId());
        
        // Prints the projected field of the results from the geospatial query as JSON
        collection.find(query)
                .projection(projection)
                .forEach(doc -> System.out.println(doc.toJson()));
        // end findExample
    }

    private void rangeExample() {
        MongoDatabase database = mongoClient.getDatabase("sample_mflix");
        MongoCollection<Document> collection = database.getCollection("theaters");
        // begin rangeExample
        // Add your MongoCollection setup code here

        // Creates a set of points that defines the bounds of a geospatial shape
        Polygon longIslandTriangle = new Polygon(Arrays.asList(new Position(-72, 40),
                new Position(-74, 41),
                new Position(-72, 39),
                new Position(-72, 40)));

        // Creates a projection to include only the "location.address.city" field in the results
        Bson projection = fields(include("location.address.city"), excludeId());

        // Creates a query that matches documents containing "location.geo" values within the specified bounds
        Bson geoWithinComparison = geoWithin("location.geo", longIslandTriangle);
        
        // Prints the projected field of the results from the geolocation query as JSON
        collection.find(geoWithinComparison)
                .projection(projection)
                .forEach(doc -> System.out.println(doc.toJson()));
        // end rangeExample
    }
}