import org.hibernate.Transaction;

import java.util.List;

import org.hibernate.Session;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import static com.mongodb.client.model.Filters.eq;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Indexes;
import org.bson.Document;

public class NativeQuery {
    public static void main(String[] args) {

        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();

        // start-filter-sort
        String nativeQuery = """
        {
            aggregate: "movies",
            pipeline: [
                { $match: { title: { $eq: "The Parent Trap" } } },
                { $sort: { year: -1 } },
                { $project: { title: 1, plot: 1, year: 1, runtime: 1, cast: 1 } }
            ]
        }
        """;

        var results = session.createNativeQuery(nativeQuery, Movie.class)
                .getResultList();

        for (Movie movie : results) {
            System.out.println("Title: " + movie.getTitle() + ", Year: " + movie.getYear());
        }
        // end-filter-sort

        // start-arithmetic
        String nativeQuery = """
        {
            aggregate: "movies",
            pipeline: [
                { $match: { year: { $gt: 2000 }, runtime: { $exists: true } } },
                { $addFields: {
                    runtimeHours: { $divide: [ "$runtime", 60 ] }
                }},
                { $project: {
                    title: 1,
                    plot: 1,
                    year: 1,
                    runtime: 1,
                    cast: 1
                }}
            ]
        }
        """;

        var results = session.createNativeQuery(nativeQuery, Movie.class)
                .getResultList();

        for (Movie result : results) {
            System.out.println("Added field to movie: " + result.getTitle());
        }
        // end-arithmetic

        // start-atlas-search
        String nativeQuery = """
        {
            aggregate: "movies",
            pipeline: [
                {
                    $search: {
                        index: "<indexName>",
                        phrase: {
                            path: "plot",
                            query: "whirlwind romance",
                            slop: 3
                        }
                    }
                },
                {
                    $project: {
                        title: 1,
                        plot: 1,
                        year: 1,
                        runtime: 1,
                        cast: 1
                    }
                }
            ]
        }
        """;

        var results = session.createNativeQuery(nativeQuery, Movie.class)
                .getResultList();

        for (Movie result : results) {
            System.out.println("Title: " + result.getTitle() + ", Plot: " + result.getPlot());
        }
        // end-atlas-search

        // start-mongoclient
        // Replace the <connection URI> placeholder with your MongoDB connection URI
        String uri = "<connection URI>";
        MongoClient mongoClient = MongoClients.create(uri);
        MongoDatabase db = mongoClient.getDatabase("sample_mflix");
        MongoCollection<Document> collection = db.getCollection("movies");

        String indexResult = collection.createIndex(Indexes.ascending("title"));
        System.out.println(String.format("Index created: %s", indexResult));
        // end-mongoclient

        tx.commit();
        session.close();
        sf.close();

    }

}