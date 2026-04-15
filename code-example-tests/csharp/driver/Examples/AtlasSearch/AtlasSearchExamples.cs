// :replace-start: {
//   "terms": {
//     "_moviesCollection": "moviesCollection",
//     "_theatersCollection": "theatersCollection",
//     "_restaurantsCollection": "restaurantsCollection"
//   }
// }

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;
using MongoDB.Driver.Search;

namespace Examples.AtlasSearch;

// :snippet-start: movie-class
[BsonIgnoreExtraElements]
public class Movie
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;
    public string Plot { get; set; } = null!;
    public string[] Genres { get; set; } = null!;
    public int Year { get; set; }
    public string Rated { get; set; } = null!;
    public Imdb Imdb { get; set; } = null!;
    [BsonElement("plot_embedding")]
    public float[] PlotEmbedding { get; set; } = null!;
    public double Score { get; set; }
    [BsonElement("paginationToken")]
    public string PaginationToken { get; set; } = null!;
}
// :snippet-end:

// :snippet-start: imdb-class
[BsonIgnoreExtraElements]
public class Imdb
{
    public double Rating { get; set; }
    public int Votes { get; set; }
    public int Id { get; set; }
}
// :snippet-end:

// :snippet-start: imdb-serializer-class
// :uncomment-start:
// [BsonIgnoreExtraElements]
// public class Imdb
// {
//     [BsonSerializer(typeof(FlexibleDoubleSerializer))]
//     public double Rating { get; set; }
//
//     [BsonSerializer(typeof(FlexibleInt32Serializer))]
//     public int Votes { get; set; }
//
//     public int Id { get; set; }
// }
// :uncomment-end:
// :snippet-end:

// :snippet-start: theater-class
[BsonIgnoreExtraElements]
public class Theater
{
    [BsonId]
    public ObjectId Id { get; set; }
    public int TheaterId { get; set; }
    public TheaterLocation Location { get; set; } = null!;
}
// :snippet-end:

// :snippet-start: theater-location-class
[BsonIgnoreExtraElements]
public class TheaterLocation
{
    [BsonElement("geo")]
    public GeoJsonPoint<GeoJson2DGeographicCoordinates> Geo { get; set; } = null!;
}
// :snippet-end:

// :snippet-start: restaurant-class
[BsonIgnoreExtraElements]
public class Restaurant
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public string Cuisine { get; set; } = null!;
    public string Borough { get; set; } = null!;
    public List<GradeEntry> Grades { get; set; } = null!;
}
// :snippet-end:

// :snippet-start: grade-entry-class
[BsonIgnoreExtraElements]
public class GradeEntry
{
    public string Grade { get; set; } = null!;
    public int? Score { get; set; }
}
// :snippet-end:

// :snippet-start: movie-search-class
public class MovieSearch
{
    public string Plot { get; set; } = null!;
}
// :snippet-end:

public class AtlasSearchExamples
{
    private readonly IMongoCollection<Movie> _moviesCollection;
    private readonly IMongoCollection<Theater> _theatersCollection;
    private readonly IMongoCollection<Restaurant> _restaurantsCollection;

    static AtlasSearchExamples()
    {
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);
    }

    public AtlasSearchExamples()
    {
        var uri = DotNetEnv.Env.GetString("CONNECTION_STRING", null)
            ?? throw new InvalidOperationException(
                "CONNECTION_STRING is not set. Verify you have a .env file with a valid connection string.");

        var mongoClient = new MongoClient(uri);
        var mflixDatabase = mongoClient.GetDatabase("sample_mflix");
        _moviesCollection = mflixDatabase.GetCollection<Movie>("movies");
        _theatersCollection = mflixDatabase.GetCollection<Theater>("theaters");

        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
    }

    public List<Movie> AutocompleteSearch()
    {
        // :snippet-start: autocomplete-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Autocomplete(m => m.Title, "Gravity"), indexName: "movietitles")
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> CompoundSearch()
    {
        // :snippet-start: compound-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Compound()
                .Must(Builders<Movie>.Search.Exists(m => m.Imdb.Rating))
                .MustNot(Builders<Movie>.Search.Equals(m => m.Rated, "G"))
                .Must(Builders<Movie>.Search.Range(m => m.Year, SearchRangeBuilder.Gt(2000))))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Restaurant> EmbeddedDocumentSearch()
    {
        // :snippet-start: embedded-search
        var result = _restaurantsCollection.Aggregate()
            .Search(Builders<Restaurant>.Search.EmbeddedDocument(
                r => r.Grades,
                Builders<GradeEntry>.Search.Equals(g => g.Grade, "A")
            ), indexName: "restaurantsembedded").ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> EqualsSearch()
    {
        // :snippet-start: equals-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Equals(m => m.Year, 2000))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> ExistsSearch()
    {
        // :snippet-start: exists-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Exists(m => m.Imdb.Rating))
            .ToList();
        // :snippet-end:
        return result;
    }

    public int FacetSearch()
    {
        // :snippet-start: facet-search
        var result = _moviesCollection.Aggregate()
            .SearchMeta(
                Builders<Movie>.Search.Facet(
                    Builders<Movie>.Search.Range(m => m.Year, SearchRangeBuilder.Gte(2000)),
                    Builders<Movie>.SearchFacet.String("genres", m => m.Genres, 100)),
                indexName: "moviesfacetsearch")
            .Single()
            .Facet["genres"].Buckets.Count();
        // :snippet-end:
        return result;
    }

    public List<Theater> GeoShapeSearch()
    {
        // :snippet-start: geoshape-search
        GeoJsonPolygon<GeoJson2DGeographicCoordinates> searchArea = new(new(new(new GeoJson2DGeographicCoordinates[]
        {
            new(-93.5, 44.7),
            new(-93.5, 45.0),
            new(-93.0, 45.0),
            new(-93.0, 44.7),
            new(-93.5, 44.7),
        })));

        var result = _theatersCollection.Aggregate()
            .Search(Builders<Theater>.Search.GeoShape(
                t => t.Location.Geo, GeoShapeRelation.Intersects, searchArea),
                indexName: "theatersgeo")
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Theater> GeoWithinSearch()
    {
        // :snippet-start: geowithin-search
        GeoJsonPolygon<GeoJson2DGeographicCoordinates> searchArea = new(new(new(new GeoJson2DGeographicCoordinates[]
        {
            new(-94.0, 44.5),
            new(-94.0, 45.2),
            new(-92.5, 45.2),
            new(-92.5, 44.5),
            new(-94.0, 44.5),
        })));

        var result = _theatersCollection.Aggregate()
            .Search(Builders<Theater>.Search.GeoWithin(t => t.Location.Geo, searchArea),
                indexName: "theatersgeo")
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> InSearch()
    {
        // :snippet-start: in-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.In(m => m.Genres, new[] { "Action", "Comedy" }))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> MoreLikeThisSearch()
    {
        // :snippet-start: morelikethis-search
        var searchDocument = new MovieSearch()
        {
            Plot = "time travel",
        };

        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.MoreLikeThis(searchDocument))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> NearSearch()
    {
        // :snippet-start: near-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Near(m => m.Imdb.Rating, 8.5, 1))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> PhraseSearch()
    {
        // :snippet-start: phrase-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Phrase(m => m.Plot, "time travel"))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> PhraseMultipleSearch()
    {
        // :snippet-start: multiphrase-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Phrase(m => m.Plot, new List<string>() { "time travel", "space adventure" }))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> QueryStringSearch()
    {
        // :snippet-start: querystring-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.QueryString(m => m.Plot, "(time OR space) AND NOT comedy"))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> RangeSearch()
    {
        // :snippet-start: range-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search
            .Range(m => m.Year, SearchRangeBuilder.Gt(2000).Lt(2010)))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> RangeStringSearch()
    {
        // :snippet-start: range-string
        var result = _moviesCollection.Aggregate()
             .Search(Builders<Movie>.Search
             .Range(m => m.Title, SearchRangeV2Builder.Gte("A").Lte("G")))
             .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> RegexSearch()
    {
        // :snippet-start: regex-search
        var regex = "[A-Za-z]{6}";

        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Regex(m => m.Title, regex,
                allowAnalyzedField: true))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> RegexAllowAnalyzedFieldSearch()
    {
        var regex = "[A-Za-z]{6}";
        // :snippet-start: regex-allow-analyzed-field
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Regex(m => m.Title, regex,
                allowAnalyzedField: true))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> SpanSearch()
    {
        // :snippet-start: span-search
        var searchTerms = new[]
        {
            Builders<Movie>.SearchSpan.Term(m => m.Plot, "time"),
            Builders<Movie>.SearchSpan.Term(m => m.Plot, "travel")
        };

        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Span(Builders<Movie>.SearchSpan.Near(searchTerms, 1)))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> TextSearch()
    {
        // :snippet-start: text-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Text(m => m.Plot, "secret agent"))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> WildcardSearch()
    {
        // :snippet-start: wildcard-search
        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Wildcard(m => m.Title, "Amer*", allowAnalyzedField: true))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> MultipleFieldSearch()
    {
        // :snippet-start: multiple-field-search
        var result = _moviesCollection.Aggregate().Search(
            Builders<Movie>.Search.Phrase(Builders<Movie>.SearchPath
            .Multi(m => m.Plot, m => m.Title), "time travel"), indexName: "moviesmulti")
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> ScoreSearch()
    {
        // :snippet-start: score-search
        var regex = "[A-Za-z]{6}";

        var result = _moviesCollection.Aggregate()
            .Search(Builders<Movie>.Search.Regex(m => m.Title, regex, allowAnalyzedField: true), indexName: "moviescore")
            .Project<Movie>(Builders<Movie>.Projection
            .Include(m => m.Id)
            .Include(m => m.Title)
            .Include(m => m.Plot)
            .MetaSearchScore(m => m.Score))
            .ToList();
        // :snippet-end:
        return result;
    }

    public List<Movie> SearchAfter()
    {
        // :snippet-start: pagination-options
        var projection = Builders<Movie>.Projection
            .Include(x => x.Title)
            .MetaSearchSequenceToken(x => x.PaginationToken);

        var searchDefinition = Builders<Movie>.Search.Text(m => m.Plot, "time travel");
        var searchOptions = new SearchOptions<Movie>
        { IndexName = "default", Sort = Builders<Movie>.Sort.Ascending(m => m.Id) };

        // Runs the base search operation
        var baseSearchResults = _moviesCollection.Aggregate()
            .Search(searchDefinition, searchOptions)
            .Project<Movie>(projection)
            .ToList();

        if (baseSearchResults.Count == 0)
            return baseSearchResults;

        // Sets the starting point for the next search
        searchOptions.SearchAfter = baseSearchResults[0].PaginationToken;

        var result = _moviesCollection.Aggregate()
            .Search(searchDefinition, searchOptions)
            .Project<Movie>(projection)
            .ToList();
        // :snippet-end:

        return result;
    }
}
// :replace-end:
