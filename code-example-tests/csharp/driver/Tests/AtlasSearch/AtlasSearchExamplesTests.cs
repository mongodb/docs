using System.Globalization;
using Examples.AtlasSearch;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using Utilities.Comparison;
using Utilities.SampleData;
using Utilities.SearchIndex;

namespace Tests.AtlasSearch;

// Handles empty strings and malformed numeric data in sample_mflix documents.
// Registered via BsonClassMap in OneTimeSetUp so example classes stay clean.
file class FlexibleDoubleSerializer : SerializerBase<double>
{
    public override double Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        switch (context.Reader.CurrentBsonType)
        {
            case BsonType.Double: return context.Reader.ReadDouble();
            case BsonType.Int32: return context.Reader.ReadInt32();
            case BsonType.Int64: return context.Reader.ReadInt64();
            case BsonType.String:
                var s = context.Reader.ReadString();
                return double.TryParse(s, NumberStyles.Any, CultureInfo.InvariantCulture, out var d) ? d : 0.0;
            case BsonType.Null: context.Reader.ReadNull(); return 0.0;
            default: context.Reader.SkipValue(); return 0.0;
        }
    }

    public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, double value)
        => context.Writer.WriteDouble(value);
}

file class FlexibleInt32Serializer : SerializerBase<int>
{
    public override int Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        switch (context.Reader.CurrentBsonType)
        {
            case BsonType.Int32: return context.Reader.ReadInt32();
            case BsonType.Int64: return Convert.ToInt32(context.Reader.ReadInt64());
            case BsonType.Double: return Convert.ToInt32(context.Reader.ReadDouble());
            case BsonType.String:
                var s = context.Reader.ReadString();
                var match = System.Text.RegularExpressions.Regex.Match(s, "[0-9]+");
                return match.Success && int.TryParse(match.Value, out var i) ? i : 0;
            case BsonType.Null: context.Reader.ReadNull(); return 0;
            default: context.Reader.SkipValue(); return 0;
        }
    }

    public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, int value)
        => context.Writer.WriteInt32(value);
}

[TestFixture]
public class AtlasSearchExamplesTests
{
    private static AtlasSearchExamples _examples = null!;

    private static IMongoClient _client = null!;
    private static IMongoCollection<BsonDocument> _moviesCollection = null!;
    private static IMongoCollection<BsonDocument> _theatersCollection = null!;
    private static IMongoCollection<BsonDocument> _restaurantsCollection = null!;

    [RequiresSampleData("sample_mflix", ["movies", "theaters"])]
    [RequiresSampleData("sample_restaurants", ["restaurants"])]
    [OneTimeSetUp]
    public static async Task CreateSearchIndexes()
    {
        DotNetEnv.Env.TraversePath().Load();
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING", "");
        if (string.IsNullOrEmpty(connectionString))
        {
            Assert.Ignore("CONNECTION_STRING is not set. Skipping Atlas Search tests.");
            return;
        }

        _client = new MongoClient(connectionString);
        var mflixDb = _client.GetDatabase("sample_mflix");
        _moviesCollection = mflixDb.GetCollection<BsonDocument>("movies");
        _theatersCollection = mflixDb.GetCollection<BsonDocument>("theaters");
        var restaurantsDb = _client.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDb.GetCollection<BsonDocument>("restaurants");

        // Register the camelCase convention before AutoMap() runs, so field names
        // are correctly lowercased. Mirrors AtlasSearchExamples' static constructor.
        ConventionRegistry.Register(
            "CamelCase",
            new ConventionPack { new CamelCaseElementNameConvention() },
            _ => true);

        // Register Imdb before Movie: AutoMap() for Movie resolves the Imdb serializer
        // immediately, so Imdb's class map must already exist with lenient serializers.
        if (!BsonClassMap.IsClassMapRegistered(typeof(Imdb)))
            BsonClassMap.RegisterClassMap<Imdb>(cm =>
            {
                cm.AutoMap();
                cm.GetMemberMap(m => m.Rating).SetSerializer(new FlexibleDoubleSerializer());
                cm.GetMemberMap(m => m.Votes).SetSerializer(new FlexibleInt32Serializer());
            });
        if (!BsonClassMap.IsClassMapRegistered(typeof(Movie)))
            BsonClassMap.RegisterClassMap<Movie>(cm =>
            {
                cm.AutoMap();
                cm.GetMemberMap(m => m.Year).SetSerializer(new FlexibleInt32Serializer());
            });

        // Create _examples after class maps are registered: GetCollection<Movie>()
        // resolves the Movie serializer eagerly, which would auto-freeze the class map.
        _examples = new AtlasSearchExamples();

        var moviesIndexes = new List<CreateSearchIndexModel>
        {
            // Dynamic default index — used by most text, range, and compound searches.
            // title is indexed as both string (for regex/wildcard with allowAnalyzedField)
            // and token (for In() and Range(string), which require token-type indexing).
            // genres is also indexed as token to support In() on array string values.
            new("default", SearchIndexType.Search, new BsonDocument("mappings", new BsonDocument
            {
                { "dynamic", true },
                { "fields", new BsonDocument
                    {
                        { "title", new BsonArray
                            {
                                new BsonDocument("type", "string"),
                                new BsonDocument("type", "token")
                            }
                        },
                        { "genres", new BsonArray { new BsonDocument("type", "token") } }
                    }
                }
            })),

            // Autocomplete index — used by AutocompleteSearch()
            new("movietitles", SearchIndexType.Search, new BsonDocument("mappings", new BsonDocument
            {
                { "dynamic", false },
                { "fields", new BsonDocument("title",
                    new BsonArray { new BsonDocument("type", "autocomplete") }) }
            })),

            // Facet index — used by FacetSearch()
            new("moviesfacetsearch", SearchIndexType.Search, new BsonDocument("mappings", new BsonDocument
            {
                { "dynamic", false },
                { "fields", new BsonDocument
                    {
                        { "genres", new BsonArray { new BsonDocument("type", "stringFacet") } },
                        { "year", new BsonArray { new BsonDocument("type", "number") } }
                    }
                }
            })),

            // Multi-path string index — used by MultipleFieldSearch()
            new("moviesmulti", SearchIndexType.Search, new BsonDocument("mappings", new BsonDocument
            {
                { "dynamic", false },
                { "fields", new BsonDocument
                    {
                        { "plot", new BsonArray { new BsonDocument("type", "string") } },
                        { "title", new BsonArray { new BsonDocument("type", "string") } }
                    }
                }
            })),

            // String index on title — used by ScoreSearch() with allowAnalyzedField
            new("moviescore", SearchIndexType.Search, new BsonDocument("mappings", new BsonDocument
            {
                { "dynamic", false },
                { "fields", new BsonDocument("title",
                    new BsonArray { new BsonDocument("type", "string") }) }
            })),
        };

        // Explicit geo index — used by GeoShapeSearch() and GeoWithinSearch()
        var theatersIndexes = new List<CreateSearchIndexModel>
        {
            new("theatersgeo", SearchIndexType.Search, new BsonDocument("mappings", new BsonDocument
            {
                { "dynamic", false },
                { "fields", new BsonDocument("location", new BsonDocument
                    {
                        { "type", "document" },
                        { "fields", new BsonDocument("geo", new BsonArray
                            {
                                new BsonDocument
                                {
                                    { "type", "geo" },
                                    { "indexShapes", true }
                                }
                            })
                        }
                    })
                }
            })),
        };

        // Explicit embeddedDocuments index — used by EmbeddedDocumentSearch().
        // Uses token type for grade so the Equals() operator performs exact string matching.
        var restaurantsIndexes = new List<CreateSearchIndexModel>
        {
            new("restaurantsembedded", SearchIndexType.Search, new BsonDocument("mappings", new BsonDocument
            {
                { "dynamic", false },
                { "fields", new BsonDocument("grades", new BsonDocument
                    {
                        { "type", "embeddedDocuments" },
                        { "fields", new BsonDocument("grade",
                            new BsonArray { new BsonDocument("type", "token") }) }
                    })
                }
            })),
        };

        try
        {
            await CreateMissingIndexesAsync(_moviesCollection, moviesIndexes);
            await CreateMissingIndexesAsync(_theatersCollection, theatersIndexes);
            await CreateMissingIndexesAsync(_restaurantsCollection, restaurantsIndexes);
        }
        catch (MongoCommandException ex)
        {
            Assert.Ignore(
                $"Environment does not support Atlas Search indexes. Skipping all tests. Error: {ex.Message}");
            return;
        }

        await Task.WhenAll(
            moviesIndexes.Select(m =>
                SearchIndexChecker.EnsureIndexReadyAsync(_moviesCollection, m.Name!))
            .Concat(theatersIndexes.Select(m =>
                SearchIndexChecker.EnsureIndexReadyAsync(_theatersCollection, m.Name!)))
            .Concat(restaurantsIndexes.Select(m =>
                SearchIndexChecker.EnsureIndexReadyAsync(_restaurantsCollection, m.Name!)))
        );
    }

    private static async Task CreateMissingIndexesAsync(
        IMongoCollection<BsonDocument> collection,
        List<CreateSearchIndexModel> models)
    {
        using var cursor = await collection.SearchIndexes.ListAsync(null, null, default);
        var existingDocs = await cursor.ToListAsync();
        var existingByName = existingDocs
            .Where(i => i.Contains("name"))
            .ToDictionary(
                i => i["name"].AsString,
                i => i.Contains("type") ? i["type"].AsString : "search");

        // Drop any index that exists with the wrong type so it can be recreated
        foreach (var model in models)
        {
            if (existingByName.TryGetValue(model.Name!, out var existingType))
            {
                var expectedType = model.Type == SearchIndexType.VectorSearch
                    ? "vectorSearch" : "search";
                if (!string.Equals(existingType, expectedType, StringComparison.OrdinalIgnoreCase))
                {
                    await collection.SearchIndexes.DropOneAsync(model.Name!);
                    existingByName.Remove(model.Name!);
                }
            }
        }

        // Drop and recreate existing vector search indexes to ensure their
        // definitions stay current (e.g. when filter fields are added).
        foreach (var model in models.Where(m =>
            existingByName.ContainsKey(m.Name!) && m.Type == SearchIndexType.VectorSearch))
        {
            await collection.SearchIndexes.DropOneAsync(model.Name!);
            existingByName.Remove(model.Name!);
        }


        var toCreate = models.Where(m => !existingByName.ContainsKey(m.Name!)).ToList();
        if (toCreate.Count > 0)
            await collection.SearchIndexes.CreateManyAsync(toCreate);
    }

    [OneTimeTearDown]
    public static void TearDown()
    {
        _client?.Dispose();
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("movietitles", IndexType = "search")]
    [Description("Verifies that AutocompleteSearch() returns results for the title prefix 'Gravity'")]
    public void TestAutocompleteSearch()
    {
        var result = _examples.AutocompleteSearch();
        Expect.That(result.Any(m => m.Title == "Gravity")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that CompoundSearch() returns movies where imdb.rating exists, rated is not 'G', and year is greater than 2000")]
    public void TestCompoundSearch()
    {
        var result = _examples.CompoundSearch();
        Expect.That(result.Any(m => m.Title == "The Dark Knight")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Inception")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_restaurants")]
    [RequiresSearchIndex("restaurantsembedded", IndexType = "search")]
    [Description("Verifies that EmbeddedDocumentSearch() returns restaurants whose grades array contains an entry with a grade of 'A'")]
    public void TestEmbeddedDocumentSearch()
    {
        var result = _examples.EmbeddedDocumentSearch();
        Expect.That(result.Any(r => r.Name == "Riviera Caterer")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that EqualsSearch() returns movies where the year field equals 2000")]
    public void TestEqualsSearch()
    {
        var result = _examples.EqualsSearch();
        Expect.That(result.Any(m => m.Title == "Gladiator")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Cast Away")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that ExistsSearch() returns movies where the imdb.rating field exists")]
    public void TestExistsSearch()
    {
        var result = _examples.ExistsSearch();
        Expect.That(result.Any(m => m.Title == "The Godfather")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "The Shawshank Redemption")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("moviesfacetsearch", IndexType = "search")]
    [Description("Verifies that FacetSearch() returns 23 distinct genre categories for movies with year >= 2000")]
    public void TestFacetSearch()
    {
        var result = _examples.FacetSearch();
        Expect.That(result).ShouldMatch(23);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("theatersgeo", IndexType = "search")]
    [Description("Verifies that GeoShapeSearch() returns theaters whose coordinates intersect with a polygon in the Minneapolis, MN area")]
    public void TestGeoShapeSearch()
    {
        var result = _examples.GeoShapeSearch();
        Expect.That(result.Any(t => t.TheaterId == 1000)).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("theatersgeo", IndexType = "search")]
    [Description("Verifies that GeoWithinSearch() returns theaters whose coordinates fall within a specified polygon")]
    public void TestGeoWithinSearch()
    {
        var result = _examples.GeoWithinSearch();
        Expect.That(result.Any(t => t.TheaterId == 1000)).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that InSearch() returns movies where the genres array contains 'Action' or 'Comedy'")]
    public void TestInSearch()
    {
        var result = _examples.InSearch();
        Expect.That(result.Any(m => m.Title == "Home Alone")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Die Hard")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that MoreLikeThisSearch() returns movies similar to a document with plot 'time travel'")]
    public void TestMoreLikeThisSearch()
    {
        var result = _examples.MoreLikeThisSearch();
        Expect.That(result.Any(m => m.Title == "Thrill Seekers")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "About Time")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that NearSearch() returns movies ordered by proximity to an imdb.rating of 8.5")]
    public void TestNearSearch()
    {
        var result = _examples.NearSearch();
        Expect.That(result.Any(m => m.Title == "The Dark Knight")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "The Godfather")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that PhraseSearch() returns movies where the plot contains the phrase 'time travel'")]
    public void TestPhraseSearch()
    {
        var result = _examples.PhraseSearch();
        Expect.That(result.Any(m => m.Title == "The Time Traveler's Wife")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Safety Not Guaranteed")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that PhraseMultipleSearch() returns movies where the plot contains 'time travel' or 'space adventure'")]
    public void TestPhraseMultipleSearch()
    {
        var result = _examples.PhraseMultipleSearch();
        Expect.That(result.Any(m => m.Title == "The Time Traveler's Wife")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Safety Not Guaranteed")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that QueryStringSearch() returns movies where the plot matches '(time OR space) AND NOT comedy'")]
    public void TestQueryStringSearch()
    {
        var result = _examples.QueryStringSearch();
        Expect.That(result.Any(m => m.Title == "Interstellar")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Tomorrowland")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that RangeSearch() returns movies where the year is greater than 2000 and less than 2010")]
    public void TestRangeSearch()
    {
        var result = _examples.RangeSearch();
        Expect.That(result.Any(m => m.Title == "The Dark Knight")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "The Departed")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that RangeStringSearch() returns results for titles in the range 'A' to 'G'")]
    public void TestRangeStringSearch()
    {
        var result = _examples.RangeStringSearch();
        Expect.That(result.Any(m => m.Title == "Apollo 13")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Braveheart")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that RegexSearch() returns movies where the title contains exactly six letters")]
    public void TestRegexSearch()
    {
        var result = _examples.RegexSearch();
        Expect.That(result.Any(m => m.Title == "Gandhi")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Batman")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that RegexAllowAnalyzedFieldSearch() executes without error. It does *not* assert behavioral differences between analyzed and non-analyzed fields.")]
    public void TestRegexAllowAnalyzedFieldSearch()
    {
        var result = _examples.RegexAllowAnalyzedFieldSearch();
        Expect.That(result.Any(m => m.Title == "Gandhi")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Batman")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that SpanSearch() returns movies where the plot contains 'time' and 'travel' within one word of each other")]
    public void TestSpanSearch()
    {
        var result = _examples.SpanSearch();
        Expect.That(result.Any(m => m.Title == "The Time Traveler's Wife")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Safety Not Guaranteed")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that TextSearch() returns movies where the plot contains the string 'secret agent'")]
    public void TestTextSearch()
    {
        var result = _examples.TextSearch();
        Expect.That(result.Any(m => m.Title == "Spy Kids")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "The Spy Who Loved Me")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that WildcardSearch() returns movies where the title starts with 'Amer'")]
    public void TestWildcardSearch()
    {
        var result = _examples.WildcardSearch();
        Expect.That(result.Any(m => m.Title == "American Beauty")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "American Gangster")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("moviesmulti", IndexType = "search")]
    [Description("Verifies that MultipleFieldSearch() returns results for 'time travel' across plot and title fields")]
    public void TestMultipleFieldSearch()
    {
        var result = _examples.MultipleFieldSearch();
        Expect.That(result.Any(m => m.Title == "The Time Traveler's Wife")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Safety Not Guaranteed")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("moviescore", IndexType = "search")]
    [Description("Verifies that ScoreSearch() returns scored results for titles matching a 6-letter regex")]
    public void TestScoreSearch()
    {
        var result = _examples.ScoreSearch();
        Expect.That(result.Any(m => m.Title == "Gandhi")).ShouldMatch(true);
        Expect.That(result.Any(m => m.Title == "Batman")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [RequiresSearchIndex("default", IndexType = "search")]
    [Description("Verifies that SearchAfter() returns paginated results starting after the first page's token")]
    public void TestSearchAfter()
    {
        var result = _examples.SearchAfter();
        Expect.That(result.Any(m => m.Title == "About Time")).ShouldMatch(true);
    }
}
