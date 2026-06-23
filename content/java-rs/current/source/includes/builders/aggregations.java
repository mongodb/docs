import java.util.List;
import org.bson.BsonString;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.mongodb.MongoNamespace;
import com.mongodb.client.model.BucketAutoOptions;
import com.mongodb.client.model.BucketGranularity;
import com.mongodb.client.model.BucketOptions;
import com.mongodb.client.model.Facet;
import com.mongodb.client.model.Field;
import com.mongodb.client.model.GraphLookupOptions;
import com.mongodb.client.model.MergeOptions;
import com.mongodb.client.model.MongoTimeUnit;
import com.mongodb.client.model.UnwindOptions;
import com.mongodb.client.model.Variable;
import com.mongodb.client.model.Window;
import com.mongodb.client.model.WindowOutputFields;
import com.mongodb.client.model.Windows;
import com.mongodb.client.model.densify.DensifyOptions;
import com.mongodb.client.model.densify.DensifyRange;
import com.mongodb.client.model.fill.FillOptions;
import com.mongodb.client.model.fill.FillOutputField;
import com.mongodb.client.model.search.SearchOperator;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;

// begin-static-import
import static java.util.Arrays.asList;
import static com.mongodb.client.model.Accumulators.*;
import static com.mongodb.client.model.Aggregates.*;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
import static com.mongodb.client.model.Sorts.*;
import static com.mongodb.client.model.search.SearchPath.fieldPath;
// end-static-import


public class Aggregations {

    public static void main(String[] args){
        String uri = "<connection string>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            aggregationSample(collection);
            matchStage();
            projectStage();
            computedProject();
            document();
            sample();
            sortStage();
            skip();
            limit();
            basicLookup();
            advancedLookup();
            group();
            minNAccumulator();
            maxNAccumulator();
            firstNAccumulator();
            lastNAccumulator();
            topAccumulator();
            topNAccumulator();
            bottomAccumulator();
            bottomNAccumulator();
            unwindStage();
            unwindPreserve();
            unwindIndex();
            out();
            merge();
            mergeOptions();
            graphLookup();
            graphLookupDepth();
            graphLookupMatch();
            sortByCount();
            replaceRoot();
            addFields();
            count();
            bucket();
            bucketOptions();
            bucketAuto();
            bucketAutoOptions();
            facet();
            setWindowFields();
            densify();
            fill();
            mongoSearch();
            mongoSearchMetadata();
        }
    }    

    private static void aggregationSample(MongoCollection<Document> collection) {
        // begin-aggregation-sample
        Bson matchStage = match(eq("some_field", "some_criteria"));
        Bson sortByCountStage = sortByCount("some_field");
        Publisher<Document> results = collection.aggregate(asList(matchStage, sortByCountStage));
        Flux.from(results).collectList().block();
        // end-aggregation-sample
        }
    
    private static void matchStage() {
        // begin-match
        match(eq("title", "The Shawshank Redemption"));            
        // end-match
        }

    private static void projectStage() {
        // begin-project
        project(fields(include("title", "plot"), excludeId()));
        // end-project
        }

    private static void computedProject(){
        // begin-computed
        project(fields(computed("rating", "$rated"), excludeId()));
        // end-computed
    }

    private static void document(){
        // begin-documents
        documents(asList(
                new Document("title", "The Shawshank Redemption"),
                new Document("title", "Back to the Future"),
                new Document("title", "Jurassic Park")));
        // end-documents
    }

    private static void sample(){
        // begin-sample
        sample(5);
        // end-sample
    }

    private static void sortStage(){
        // begin-sortStage
        sort(orderBy(descending("year"), ascending("title")));
        // end-sortStage
    }

    private static void skip(){
        // begin-skip
        skip(5);
        // end-skip
    }

    private static void limit(){
        // begin-limit
        limit(10);
        // end-limit
    }

    private static void basicLookup(){
        // begin-basic-lookup
        lookup("comments", "_id", "movie_id", "joined_comments");
        // end-basic-lookup
    }

    private static void advancedLookup(){
        // begin-advanced-lookup
        List<Variable<Object>> variables = asList(
            new Variable<>("genre", new Document("$arrayElemAt", asList("$genres", 0))),
            new Variable<>("rating", "$imdb.rating")
        );

        List<Bson> pipeline = asList(
            match(expr(new Document("$and",
                asList(
                    new Document("$in", asList("$$genre", "$genres")),
                    new Document("$gt", asList("$imdb.rating", "$$rating"))
                )))),
            project(fields(include("title", "imdb.rating"), excludeId())));

        Bson similarHigherRatedLookup = lookup("movies", variables, pipeline, "similar_higher_rated");
        // end-advanced-lookup
    }

    private static void group(){
        // begin-group
        group("$customerId", sum("totalQuantity", "$quantity"), avg("averageQuantity", "$quantity"));
        // end-group
    }

    private static void minNAccumulator(){
        // begin-minN
        group(
            "$year",
            minN(
                "lowest_three_ratings",
                new BsonString("$imdb.rating"),
                3
                ));
        // end-minN
    }

    private static void maxNAccumulator(){
        // begin-maxN
        group(
            "$year",
            maxN(
                "highest_two_ratings",
                new BsonString("$imdb.rating"),
                2
                ));
        // end-maxN
    }

    private static void firstNAccumulator(){
        // begin-firstN
        group(
            "$year",
            firstN(
                "first_four_movies",
                new BsonString("$title"),
                4
                ));
        // end-firstN
    }

    private static void lastNAccumulator(){
        // begin-lastN
        group(
            "$year",
            lastN(
                "last_three_movies",
                new BsonString("$title"),
                3
                ));
        // end-lastN
    }

    private static void topAccumulator(){
        // begin-top
        group(
            "$year", 
            top(
                "top_rated_movie",
                descending("imdb.rating"),
                asList(new BsonString("$title"), new BsonString("$imdb.rating"))
                ));
        // end-top
    }

    private static void topNAccumulator(){
        // begin-topN
        group(
            "$year", 
            topN(
                "longest_three_movies",
                descending("runtime"),
                asList(new BsonString("$title"), new BsonString("$runtime")),
                3
                ));
        // end-topN
        }
        
    private static void bottomAccumulator(){
        // begin-bottom
        group(
            "$year", 
            bottom(
                "shortest_movies",
                descending("runtime"),
                asList(new BsonString("$title"), new BsonString("$runtime"))
                ));
        // end-bottom
    }
    
    private static void bottomNAccumulator(){
        // begin-bottomN
        group(
            "$year", 
            bottomN(
                "lowest_rated_two_movies",
                descending("imdb.rating"),
                asList(new BsonString("$title"), new BsonString("$imdb.rating")),
                2
                ));
        // end-bottomN
    }

    private static void unwindStage(){
        // begin-unwind
        unwind("$sizes");
        // end-unwind
    }

    private static void unwindPreserve(){
        // begin-unwind-preserve
        unwind("$sizes", new UnwindOptions().preserveNullAndEmptyArrays(true));
        // end-unwind-preserve
    }

    private static void unwindIndex(){
        // begin-unwind-index
        unwind("$sizes", new UnwindOptions().includeArrayIndex("position"));
        // end-unwind-index
    }

    private static void out(){
        // begin-out
        out("authors");
        // end-out
    }

    private static void merge(){
        // begin-merge
        merge("authors");
        // end-merge
    }

    private static void mergeOptions(){
        // begin-merge-options
        merge(new MongoNamespace("reporting", "customers"),
        new MergeOptions().uniqueIdentifier(asList("date", "customerId"))
                .whenMatched(MergeOptions.WhenMatched.REPLACE)
                .whenNotMatched(MergeOptions.WhenNotMatched.INSERT));
        // end-merge-options
    }

    private static void graphLookup(){
        // begin-graphLookup-Basic
        graphLookup("contacts", "$friends", "friends", "name", "socialNetwork");
        // end-graphLookup-Basic
    }

    private static void graphLookupDepth(){
        // begin-graphLookup-Depth
        graphLookup("contacts", "$friends", "friends", "name", "socialNetwork",
        new GraphLookupOptions().maxDepth(2).depthField("degrees"));
        // end-graphLookup-Depth
    }

    private static void graphLookupMatch(){
        // begin-graphLookup-Match
        graphLookup("contacts", "$friends", "friends", "name", "socialNetwork",
        new GraphLookupOptions().maxDepth(1).restrictSearchWithMatch(eq("hobbies", "golf")));
        // end-graphLookup-Match
    }

    private static void sortByCount(){
        // begin-sortByCount
        sortByCount(new Document("$floor", "$x"));
        // end-sortByCount
    }

    private static void replaceRoot(){
        // begin-replaceRoot
        replaceRoot("$spanish_translation");
        // end-replaceRoot
    }

    private static void addFields(){
        // begin-addFields
        addFields(new Field("a", 1), new Field("b", 2));
        // end-addFields
    }

    private static void count(){
        // begin-count
        count("total");
        // end-count
    } 

    private static void bucket(){
        // begin-bucket
        bucket("$screenSize", asList(0, 24, 32, 50, 70, 200));
        // end-bucket
    }

    private static void bucketOptions(){
        // begin-bucket-options
        bucket("$screenSize", asList(0, 24, 32, 50, 70),
            new BucketOptions().defaultBucket("monster").output(sum("count", 1), push("matches", "$screenSize")));
        // end-bucket-options

    }

    private static void bucketAuto(){
        // begin-bucketAuto
        bucketAuto("$price", 10);
        // end-bucketAuto
    }

    private static void bucketAutoOptions(){
        // begin-bucketAuto-options
        bucketAuto("$price", 10, new BucketAutoOptions().granularity(BucketGranularity.POWERSOF2)
        .output(sum("count", 1), avg("avgPrice", "$price")));
        // end-bucketAuto-options
    }

    private static void facet(){
        // begin-facet
        facet(new Facet("Screen Sizes",
            bucketAuto("$attributes.screen_size", 5, new BucketAutoOptions().output(sum("count", 1)))),
            new Facet("Manufacturer", sortByCount("$attributes.manufacturer"), limit(5)));
        // end-facet
    }
    
    private static void setWindowFields(){
        // begin-setWindowFields
        Window pastMonth = Windows.timeRange(-1, MongoTimeUnit.MONTH, Windows.Bound.CURRENT);
        setWindowFields("$localityId", ascending("measurementDateTime"),
            WindowOutputFields.sum("monthlyRainfall", "$rainfall", pastMonth),
            WindowOutputFields.avg("monthlyAvgTemp", "$temperature", pastMonth));
        // end-setWindowFields
    }

    private static void densify(){
        // begin-densify
        densify(
                "ts", 
                DensifyRange.partitionRangeWithStep(15, MongoTimeUnit.MINUTE),
                DensifyOptions.densifyOptions().partitionByFields("position.coordinates"));  
        // end-densify
    }

    private static void fill(){
        // begin-fill
        fill(
            FillOptions.fillOptions().sortBy(ascending("hour")),
            FillOutputField.value("temperature", "23.6C"),
            FillOutputField.linear("air_pressure")
        );
        // end-fill
    }

    private static void mongoSearch(){
        // begin-mongoSearch
        Bson textSearch = search(
            SearchOperator.text(
                fieldPath("title"), "Future"));
        // end-mongoSearch
    }

    private static void mongoSearchMetadata(){
        // begin-mongoSearchMetadata
        searchMeta(
            SearchOperator.near(2010, 1, fieldPath("year")));
        // end-mongoSearchMetadata
    }
}

