// Performs Atlas Search queries by using the C# driver 

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;
using MongoDB.Driver.Search;

public class AtlasSearchExamples
{
    private static IMongoCollection<Guitar> guitarsCollection;
    private static string _mongoConnectionString = "<connection string>";

    public static void Main(string[] args)
    {
        Setup();

        var results = AutocompleteSearch();

        foreach (var g in results)
        {
            Console.WriteLine(g.ToBsonDocument());
        }
    }

    public static List<Guitar> AutocompleteSearch()
    {
        // Finds documents with a "make" value that contains the string fragment "Gib"
        // start-autocomplete-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Autocomplete(g => g.Make, "Gib"), indexName: "guitarmakes")
            .ToList();
        // end-autocomplete-search

        return result;
    }

    public static List<Guitar> CompoundSearch()
    {
        // Find documents that meet multiple search criteria by using the
        // Compound() search function
        // start-compound-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Compound()
                .Must(Builders<Guitar>.Search.Exists(g => g.Rating))
                .MustNot(Builders<Guitar>.Search.Equals(g => g.InStock, false))
                .Must(Builders<Guitar>.Search.Range(g => g.EstablishedYear, SearchRangeBuilder.Gt(1940))))
            .ToList();
        // end-compound-search

        return result;
    }

    public static List<Guitar> EmbeddedDocumentSearch()
    {
        // start-embedded-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.EmbeddedDocument(
                g => g.ProductDetails,
                Builders<ProductDetails>.Search.Text(p => p.Serial, "YZ5678")
            )).ToList();

        return result;
        // end-embedded-search
    }

    public static List<Guitar> EqualsSearch()
    {
        // start-equals-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Equals(g => g.InStock, true))
            .ToList();
        // end-equals-search

        return result;
    }

    public static List<Guitar> ExistsSearch()
    {
        // start-exists-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Exists(g => g.Rating))
            .ToList();
        // end-exists-search

        return result;
    }

    public static List<Guitar> GeoShapeSearch()
    {
        // start-geoshape-search
        GeoJsonPolygon<GeoJson2DGeographicCoordinates> searchArea = new(new(new(new GeoJson2DGeographicCoordinates[]
        {
             new(-72.93615, 41.69791),
             new(-72.93615, 40.59791),
             new(-74.93615, 40.59791),
             new(-74.93615, 41.69791),
             new(-72.93615, 41.69791),
        })));

        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.GeoShape(g => g.InStockLocation, GeoShapeRelation.Intersects, searchArea))
            .ToList();
        // end-geoshape-search

        return result;
    }

    public static List<Guitar> GeoWithinSearch()
    {
        // start-geowithin-search
        GeoJsonPolygon<GeoJson2DGeographicCoordinates> searchArea = new(new(new(new GeoJson2DGeographicCoordinates[]
        {
             new(-74.3994140625, 40.5305017757),
             new(-74.7290039063, 40.5805846641),
             new(-74.7729492188, 40.9467136651),
             new(-74.0698242188, 41.1290213475),
             new(-73.65234375, 40.9964840144),
             new(-72.6416015625, 40.9467136651),
             new(-72.3559570313, 40.7971774152),
             new(-74.3994140625, 40.5305017757),
        })));

        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.GeoWithin(g => g.InStockLocation, searchArea))
            .ToList();
        // end-geowithin-search

        return result;
    }

    public static List<Guitar> InSearch()
    {
        // start-in-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.In(g => g.Make, ["Fender", "Gibson"]))
            .ToList();
        // end-in-search
        return result;
    }

    public static List<Guitar> MoreLikeThisSearch()
    {
        // start-morelikethis-search
        var searchDocument = new GuitarSearch()
        {
            Description = "high quality",
        };

        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.MoreLikeThis(searchDocument))
            .ToList();
        // end-morelikethis-search

        return result;
    }

    public static List<Guitar> NearSearch()
    {
        // start-near-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Near(g => g.Rating, 9, 1))
            .ToList();
        // end-near-search

        return result;
    }

    public static List<Guitar> PhraseSearch()
    {
        // start-phrase-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Phrase(g => g.Description, "classic guitars"))
            .ToList();
        // end-phrase-search

        return result;
    }

    public static List<Guitar> PhraseMultipleSearch()
    {
        // start-multiphrase-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Phrase(g => g.Description, new List<string>() { "classic guitars", "quality guitars" }))
            .ToList();
        // end-multiphrase-search

        return result;
    }

    public static List<Guitar> QueryStringSearch()
    {
        // start-querystring-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.QueryString(g => g.Description, "(classic OR quality) AND NOT custom"))
            .ToList();
        // end-querystring-search

        return result;
    }

    public static List<Guitar> RangeSearch()
    {
        // start-range-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Range(g => g.EstablishedYear, SearchRangeBuilder.Gt(1980).Lt(2020)))
            .ToList();
        // end-range-search

        return result;
    }

    public static List<Guitar> RegexSearch()
    {
        // start-regex-search
        var regex = "[A-Za-z]{6}";

        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Regex(g => g.Make, regex))
            .ToList();
        // end-regex-search

        return result;
    }

    public static List<Guitar> SpanSearch()
    {
        // start-span-search
        var searchTerms = new[]
        {
             Builders<Guitar>.SearchSpan.Term(g => g.Description, "guitars"),
             Builders<Guitar>.SearchSpan.Term(g => g.Description, "quality")
         };

        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Span(Builders<Guitar>.SearchSpan.Near(searchTerms, 1)))
            .ToList();
        // end-span-search

        return result;
    }

    public static List<Guitar> TextSearch()
    {
        // start-text-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Text(g => g.Description, "used by professional"))
            .ToList();
        // end-text-search

        return result;
    }

    public static List<Guitar> WildcardSearch()
    {
        // start-wildcard-search
        var result = guitarsCollection.Aggregate()
            .Search(Builders<Guitar>.Search.Wildcard(g => g.Make, "Strand*"))
            .ToList();
        // end-wildcard-search

        return result;
    }

    public static List<Guitar> SearchAfter()
    {
        // start-pagination-options
        var projection = Builders<Guitar>.Projection
            .Include(x => x.Make)
            .MetaSearchSequenceToken(x => x.PaginationToken);

        var searchDefinition = Builders<Guitar>.Search.Text(g => g.Description, "classic");
        var searchOptions = new SearchOptions<Guitar>
        { IndexName = "default", Sort = Builders<Guitar>.Sort.Ascending(g => g.Id) }

        // Runs the base search operation
        var baseSearchResults = guitarsCollection.Aggregate()
            .Search(searchDefinition, searchOptions)
            .Project<Guitar>(projection)
            .ToList();
        
        // Sets the starting point for the next search
        searchOptions.SearchAfter = baseSearchResults[0].PaginationToken;

        var result = guitarsCollection.Aggregate()
            .Search(searchDefinition, searchOptions)
            .Project<Guitar>(projection)
            .ToList();
        // end-pagination-options

        return result;
    }

    private static void Setup()
    {
        // This allows automapping of the camelCase database fields to our models. 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establish the connection to MongoDB and get the restaurants database
        var mongoClient = new MongoClient(_mongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_guitars");
        guitarsCollection = restaurantsDatabase.GetCollection<Guitar>("guitars");
    }
}

public class GuitarSearch
{
    public string Description { get; set; }
}

// start-guitar-class
public class Guitar
{
    public int Id { get; set; }
    public string Make { get; set; }
    public string Description { get; set; }
    public int EstablishedYear { get; set; }
    [BsonElement("in_stock")]
    public bool InStock { get; set; }
    [BsonElement("in_stock_location")]
    public Location InStockLocation { get; set; }
    public int? Rating { get; set; }
    [BsonElement("paginationToken")]
    public string PaginationToken { get; set; }
}
// end-guitar-class

public class Location
{
    public string Type { get; set; }
    public List<decimal> Coordinates { get; set; }
}