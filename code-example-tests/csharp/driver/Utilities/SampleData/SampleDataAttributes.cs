using NUnit.Framework;

namespace Utilities.SampleData;

/// <summary>
///     NUnit attribute that marks tests as requiring specific sample data.
///     Works with SampleDataTestHelper to conditionally skip tests.
/// </summary>
/// <example>
///     <code>
/// [Test]
/// [RequiresSampleData("sample_mflix")]
/// public async Task TestMovieQueries()
/// {
///     SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix");
///     // This test will only run if sample_mflix database is available
/// }
/// 
/// [Test]
/// [RequiresSampleData("sample_mflix", "sample_restaurants")]
/// public async Task TestCrossDatabaseQueries()
/// {
///     SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix", "sample_restaurants");
///     // This test will only run if both sample databases are available
/// }
/// </code>
/// </example>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public class RequiresSampleDataAttribute : Attribute
{
    /// <summary>
    ///     Initializes a new instance of the RequiresSampleDataAttribute with a single database
    /// </summary>
    /// <param name="requiredDatabase">The sample database name required for the test</param>
    public RequiresSampleDataAttribute(string requiredDatabase)
    {
        RequiredDatabases = new[] { requiredDatabase };
    }

    /// <summary>
    ///     Initializes a new instance of the RequiresSampleDataAttribute with multiple databases
    /// </summary>
    /// <param name="requiredDatabases">The sample database names required for the test</param>
    public RequiresSampleDataAttribute(params string[] requiredDatabases)
    {
        RequiredDatabases = requiredDatabases;
    }

    /// <summary>
    ///     Gets the required sample database names
    /// </summary>
    public string[] RequiredDatabases { get; }

    /// <summary>
    ///     Gets the collections required per database (optional)
    /// </summary>
    public Dictionary<string, string[]>? CollectionsPerDatabase { get; set; }

    /// <summary>
    ///     Sets specific collections required for a database
    /// </summary>
    /// <param name="databaseName">The database name</param>
    /// <param name="collections">The required collection names</param>
    /// <returns>This attribute instance for method chaining</returns>
    public RequiresSampleDataAttribute WithCollections(string databaseName, params string[] collections)
    {
        CollectionsPerDatabase ??= new Dictionary<string, string[]>();
        CollectionsPerDatabase[databaseName] = collections;
        return this;
    }
}

/// <summary>
///     Helper class to check sample data availability and skip tests as needed
/// </summary>
public static class SampleDataTestHelper
{
    /// <summary>
    ///     Ensures required sample data is available or skips the current test with a clear message
    /// </summary>
    /// <param name="requiredDatabases">The sample database names required for the test</param>
    /// <param name="collectionsPerDatabase">Optional dictionary mapping database names to required collections</param>
    public static void EnsureSampleDataOrSkip(string[] requiredDatabases,
        Dictionary<string, string[]>? collectionsPerDatabase = null)
    {
        var checkTask = Task.Run(async () =>
        {
            await SampleDataChecker.ShowSampleDataSummaryAsync();
            return await SampleDataChecker.CheckMultipleSampleDatabasesAsync(requiredDatabases, collectionsPerDatabase);
        });

        var availability = checkTask.GetAwaiter().GetResult();

        if (!availability.IsAvailable)
        {
            var missingDatabasesList = string.Join(", ", availability.MissingDatabases);
            var message = $"Missing required sample data: {missingDatabasesList}";

            Console.WriteLine($"\n⚠️  {message}");
            Assert.Ignore(message);
        }
    }

    /// <summary>
    ///     Ensures required sample data is available or skips the current test with a clear message
    /// </summary>
    /// <param name="requiredDatabase">The sample database name required for the test</param>
    public static void EnsureSampleDataOrSkip(string requiredDatabase)
    {
        EnsureSampleDataOrSkip(new[] { requiredDatabase });
    }

    /// <summary>
    ///     Ensures multiple sample databases are available or skips the current test with a clear message
    /// </summary>
    /// <param name="requiredDatabase1">First required database</param>
    /// <param name="requiredDatabase2">Second required database</param>
    /// <param name="additionalDatabases">Additional required databases</param>
    public static void EnsureSampleDataOrSkip(string requiredDatabase1, string requiredDatabase2,
        params string[] additionalDatabases)
    {
        var allDatabases = new[] { requiredDatabase1, requiredDatabase2 }.Concat(additionalDatabases).ToArray();
        EnsureSampleDataOrSkip(allDatabases);
    }
}