using System.Collections.Concurrent;
using DotNetEnv;
using MongoDB.Driver;

namespace Utilities.SampleData;

/// <summary>
///     Utility for checking MongoDB sample data availability and conditionally skipping tests.
///     This class provides methods to automatically skip tests when sample data is missing,
///     with clear feedback about what's missing and how to fix it.
/// </summary>
public static class SampleDataChecker
{
    /// <summary>
    ///     Standard MongoDB sample database names and their expected collections
    /// </summary>
    public static readonly Dictionary<string, string[]> StandardSampleDatabases = new()
    {
        ["sample_mflix"] = new[] { "movies", "theaters", "users", "comments", "sessions" },
        ["sample_restaurants"] = new[] { "restaurants", "neighborhoods" },
        ["sample_training"] = new[] { "posts", "companies", "inspections", "routes", "trips", "grades", "zips" },
        ["sample_analytics"] = new[] { "customers", "accounts", "transactions" },
        ["sample_airbnb"] = new[] { "listingsAndReviews" },
        ["sample_geospatial"] = new[] { "shipwrecks" },
        ["sample_guides"] = new[] { "planets", "comets" },
        ["sample_stores"] = new[] { "sales" },
        ["sample_supplies"] = new[] { "sales" },
        ["sample_weatherdata"] = new[] { "data" }
    };

    /// <summary>
    ///     Cache for sample data availability to avoid repeated database queries
    /// </summary>
    private static readonly ConcurrentDictionary<string, bool> SampleDataCache = new();

    /// <summary>
    ///     Global flag to track if we've shown sample data availability summary
    /// </summary>
    private static bool _hasShownSummary;

    private static readonly object _summaryLock = new();

    /// <summary>
    ///     Shows a helpful summary of sample data availability (only once per test run).
    ///     Returns immediately if already shown to avoid duplicate logging.
    /// </summary>
    /// <returns>Task representing the asynchronous operation</returns>
    public static async Task ShowSampleDataSummaryAsync()
    {
        if (_hasShownSummary) return;

        lock (_summaryLock)
        {
            if (_hasShownSummary) return;
            _hasShownSummary = true;
        }

        try
        {
            var availableDatabases = await GetAvailableSampleDatabasesAsync();

            if (availableDatabases.Count == 0)
            {
                Console.WriteLine("\n📊 Sample Data Status: No MongoDB sample databases found");
                Console.WriteLine("   Some tests may be skipped. To load sample data:");
                Console.WriteLine("   • Atlas: https://www.mongodb.com/docs/atlas/sample-data/");
                Console.WriteLine("   • Local: Use mongorestore with sample data archive\n");
            }
            else
            {
                Console.WriteLine($"\n📊 Sample Data Status: {availableDatabases.Count} database(s) available");
                Console.WriteLine($"   Found: {string.Join(", ", availableDatabases)}\n");
            }
        }
        catch (Exception)
        {
            // Silently fail - we don't want to break test runs over this
            // Only log for debugging if needed: Console.WriteLine($"Could not determine sample data status: {ex.Message}");
        }
    }

    /// <summary>
    ///     Checks if a specific sample database and its expected collections exist
    /// </summary>
    /// <param name="databaseName">The sample database name to check</param>
    /// <param name="requiredCollections">Optional array of specific collections to verify</param>
    /// <returns>True if the sample database and collections exist</returns>
    /// <example>
    ///     <code>
    /// // Check if sample_mflix database exists with default collections
    /// var hasMovieData = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");
    /// 
    /// // Check if specific collections exist
    /// var hasCustomData = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix", new[] { "movies", "theaters" });
    /// </code>
    /// </example>
    public static async Task<bool> CheckSampleDataAvailableAsync(string databaseName,
        string[]? requiredCollections = null)
    {
        var collectionsKey = requiredCollections != null
            ? string.Join(",", requiredCollections.OrderBy(x => x))
            : "default";
        var cacheKey = $"{databaseName}:{collectionsKey}";

        if (SampleDataCache.TryGetValue(cacheKey, out var cachedResult)) return cachedResult;

        try
        {
            // Load .env file from current directory or parent directories  
            Env.TraversePath().Load();

            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrWhiteSpace(connectionString))
            {
                Console.WriteLine(
                    "CONNECTION_STRING not found in .env file. Verify you have a .env file with a valid connection string.");
                SampleDataCache.TryAdd(cacheKey, false);
                return false;
            }

            // Configure client with short timeouts for testing
            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            clientSettings.ServerSelectionTimeout =
                TimeSpan.FromMilliseconds(2000); // 2 second timeout for server selection
            clientSettings.ConnectTimeout = TimeSpan.FromMilliseconds(2000); // 2 second timeout for initial connection
            clientSettings.SocketTimeout = TimeSpan.FromMilliseconds(2000); // 2 second timeout for socket operations

            var client = new MongoClient(clientSettings);

            // Check if database exists
            var databases = await client.ListDatabaseNamesAsync();
            var databaseList = await databases.ToListAsync();
            var dbExists = databaseList.Contains(databaseName);

            if (!dbExists)
            {
                SampleDataCache.TryAdd(cacheKey, false);
                return false;
            }

            // Check collections if specified
            var collectionsToCheck = requiredCollections ??
                                     StandardSampleDatabases.GetValueOrDefault(databaseName, Array.Empty<string>());
            if (collectionsToCheck.Length > 0)
            {
                var database = client.GetDatabase(databaseName);
                var collections = await database.ListCollectionNamesAsync();
                var existingCollections = await collections.ToListAsync();

                var missingCollections = collectionsToCheck.Where(col => !existingCollections.Contains(col)).ToArray();

                if (missingCollections.Length > 0)
                {
                    SampleDataCache.TryAdd(cacheKey, false);
                    return false;
                }
            }

            SampleDataCache.TryAdd(cacheKey, true);
            return true;
        }
        catch (Exception)
        {
            // Quietly handle connection errors - this is expected when MongoDB is not available
            // Only log for debugging if needed: Console.WriteLine($"Error checking sample data availability for {databaseName}: {ex.Message}");
            SampleDataCache.TryAdd(cacheKey, false);
            return false;
        }
    }

    /// <summary>
    ///     Checks if any of the standard MongoDB sample databases are available
    /// </summary>
    /// <returns>List of available sample database names</returns>
    /// <example>
    ///     <code>
    /// var availableDbs = await SampleDataChecker.GetAvailableSampleDatabasesAsync();
    /// Console.WriteLine($"Available sample databases: {string.Join(", ", availableDbs)}");
    /// </code>
    /// </example>
    public static async Task<List<string>> GetAvailableSampleDatabasesAsync()
    {
        var tasks = StandardSampleDatabases.Keys.Select(async dbName =>
        {
            var isAvailable = await CheckSampleDataAvailableAsync(dbName);
            return new { DatabaseName = dbName, IsAvailable = isAvailable };
        });

        var results = await Task.WhenAll(tasks);
        return results.Where(r => r.IsAvailable).Select(r => r.DatabaseName).ToList();
    }

    /// <summary>
    ///     Checks if multiple sample databases are available
    /// </summary>
    /// <param name="requiredDatabases">The sample database names to check</param>
    /// <param name="collectionsPerDatabase">Optional dictionary mapping database names to required collections</param>
    /// <returns>SampleDataAvailability result containing availability status and missing databases</returns>
    public static async Task<SampleDataAvailability> CheckMultipleSampleDatabasesAsync(
        string[] requiredDatabases,
        Dictionary<string, string[]>? collectionsPerDatabase = null)
    {
        var tasks = requiredDatabases.Select(async dbName =>
        {
            var requiredCollections = collectionsPerDatabase?.GetValueOrDefault(dbName);
            var isAvailable = await CheckSampleDataAvailableAsync(dbName, requiredCollections);
            return new { DatabaseName = dbName, IsAvailable = isAvailable };
        });

        var results = await Task.WhenAll(tasks);
        var missingDatabases = results.Where(r => !r.IsAvailable).Select(r => r.DatabaseName).ToArray();

        return new SampleDataAvailability
        {
            IsAvailable = missingDatabases.Length == 0,
            MissingDatabases = missingDatabases,
            AvailableDatabases = results.Where(r => r.IsAvailable).Select(r => r.DatabaseName).ToArray()
        };
    }

    /// <summary>
    ///     Clears the sample data availability cache.
    ///     Useful for testing or when sample data availability may have changed.
    /// </summary>
    /// <example>
    ///     <code>
    /// // Clear cache after loading new sample data
    /// SampleDataChecker.ClearSampleDataCache();
    /// </code>
    /// </example>
    public static void ClearSampleDataCache()
    {
        SampleDataCache.Clear();
    }
}

/// <summary>
///     Result of checking sample data availability for multiple databases
/// </summary>
public class SampleDataAvailability
{
    /// <summary>
    ///     True if all required sample databases and collections are available
    /// </summary>
    public bool IsAvailable { get; set; }

    /// <summary>
    ///     Array of database names that are missing or don't have required collections
    /// </summary>
    public string[] MissingDatabases { get; set; } = Array.Empty<string>();

    /// <summary>
    ///     Array of database names that are available with required collections
    /// </summary>
    public string[] AvailableDatabases { get; set; } = Array.Empty<string>();
}