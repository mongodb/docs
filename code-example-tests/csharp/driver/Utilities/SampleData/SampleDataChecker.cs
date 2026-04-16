using DotNetEnv;
using MongoDB.Bson;
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
    /// Synchronously checks if a single database and its required collections exist and contain data.
    /// Blocks until the async check completes. Use <see cref="CheckSampleDataAvailableAsync(string, string[], string)"/>
    /// in async contexts to avoid deadlocks.
    /// </summary>
    /// <param name="databaseName">The name of the MongoDB database to check for existence.</param>
    /// <param name="requiredCollections">Optional array of collection names that must exist and contain at least one document in the specified database. If null or empty, only database existence is verified.</param>
    /// <param name="connectionString">Optional MongoDB connection string. If null or empty, falls back to the CONNECTION_STRING value in the .env file.</param>
    /// <returns>A tuple where <c>isAvailable</c> is <c>true</c> if the database and all required collections exist and are non-empty, and <c>reason</c> describes the result or the first failure encountered.</returns>
    public static (bool isAvailable, string reason) CheckSampleDataAvailable(string databaseName,
        string[]? requiredCollections = null, string connectionString = "")
    {
        return CheckSampleDataAvailableAsync(databaseName, requiredCollections, connectionString)
            .GetAwaiter().GetResult();
    }

    /// <summary>
    /// Synchronously checks if all specified databases and their required collections exist and contain data.
    /// Checks each database in order and returns on the first failure. Blocks until the async check completes.
    /// Use <see cref="CheckSampleDataAvailableAsync(string[], string[], string)"/> in async contexts to avoid deadlocks.
    /// </summary>
    /// <param name="databaseNames">Array of MongoDB database names to check for existence. Each database is checked in order.</param>
    /// <param name="requiredCollections">Optional array of collection names that must exist and contain at least one document in every specified database. If null or empty, only database existence is verified.</param>
    /// <param name="connectionString">Optional MongoDB connection string. If null or empty, falls back to the CONNECTION_STRING value in the .env file.</param>
    /// <returns>A tuple where <c>isAvailable</c> is <c>true</c> only if all databases and all required collections exist and are non-empty, and <c>reason</c> describes the result or the first failure encountered.</returns>
    public static (bool isAvailable, string reason) CheckSampleDataAvailable(string[] databaseNames,
        string[]? requiredCollections = null, string connectionString = "")
    {
        return CheckSampleDataAvailableAsync(databaseNames, requiredCollections, connectionString)
            .GetAwaiter().GetResult();
    }

    /// <summary>
    /// Asynchronously checks if all specified databases and their required collections exist and contain data.
    /// Checks each database in order and short-circuits on the first failure.
    /// </summary>
    /// <param name="databaseNames">Array of MongoDB database names to check for existence. Each database is checked in order.</param>
    /// <param name="requiredCollections">Optional array of collection names that must exist and contain at least one document in every specified database. If null or empty, only database existence is verified.</param>
    /// <param name="connectionString">Optional MongoDB connection string. If null or empty, falls back to the CONNECTION_STRING value in the .env file.</param>
    /// <returns>A tuple where <c>isAvailable</c> is <c>true</c> only if all databases and all required collections exist and are non-empty, and <c>reason</c> describes the result or the first failure encountered.</returns>
    public static async Task<(bool isAvailable, string reason)> CheckSampleDataAvailableAsync(string[] databaseNames,
        string[]? requiredCollections = null, string connectionString = "")
    {
        foreach (var dbName in databaseNames)
        {
            var (isAvailable, reason) = await CheckSampleDataAvailableAsync(dbName, requiredCollections, connectionString);
            if (!isAvailable)
            {
                return (false, reason);
            }
        }
        return (true, "All required sample databases are available.");
    }

    /// <summary>
    /// Asynchronously checks if a single database and its required collections exist and contain data.
    /// Connects with short timeouts (2 seconds each) to fail fast when MongoDB is unreachable.
    /// Connection errors are caught and returned as a failure tuple rather than thrown.
    /// </summary>
    /// <param name="databaseName">The name of the MongoDB database to check for existence.</param>
    /// <param name="requiredCollections">Optional array of collection names that must exist and contain at least one document in the specified database. If null or empty, only database existence is verified.</param>
    /// <param name="connectionString">Optional MongoDB connection string. If null or empty, falls back to the CONNECTION_STRING value in the .env file.</param>
    /// <returns>A tuple where <c>isAvailable</c> is <c>true</c> if the database and all required collections exist and are non-empty, and <c>reason</c> describes the result or the first failure encountered.</returns>
    public static async Task<(bool isAvailable, string reason)> CheckSampleDataAvailableAsync(string databaseName,
        string[]? requiredCollections = null, string connectionString = "")
    {
        try
        {
            Env.TraversePath().Load();

            if (string.IsNullOrWhiteSpace(connectionString)) connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrWhiteSpace(connectionString))
            {
                Console.WriteLine(
                    "CONNECTION_STRING not found in .env file. Verify you have a .env file with a valid connection string.");
                return (false, "CONNECTION_STRING not found in .env file.");
            }
            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            clientSettings.ServerSelectionTimeout =
                TimeSpan.FromMilliseconds(2000);
            clientSettings.ConnectTimeout = TimeSpan.FromMilliseconds(2000);
            clientSettings.SocketTimeout = TimeSpan.FromMilliseconds(2000);

            using var client = new MongoClient(clientSettings);

            // Check if database exists
            var databases = await client.ListDatabaseNamesAsync();
            var databaseList = await databases.ToListAsync();
            var dbExists = databaseList.Contains(databaseName);

            if (!dbExists)
            {
                return (false, $"Database '{databaseName}' does not exist.");
            }

            // Check collections if specified
            if (requiredCollections != null && requiredCollections.Length > 0)
            {
                var database = client.GetDatabase(databaseName);
                var collections = await database.ListCollectionNamesAsync();
                var existingCollections = await collections.ToListAsync();

                var missingCollections = requiredCollections.Where(col => !existingCollections.Contains(col)).ToArray();

                if (missingCollections.Length > 0)
                {
                    return (false, $"One or more collections in '{string.Join(", ", missingCollections)}' does not exist in database '{databaseName}'.");
                }

                foreach (var collection in requiredCollections)
                {
                    var count = await database.GetCollection<BsonDocument>(collection).EstimatedDocumentCountAsync();
                    if (count == 0)
                    {
                        return (false, $"Collection '{collection}' in database '{databaseName}' is empty.");
                    }
                }
            }

            return (true, "Sample data is available.");
        }
        catch (Exception ex)
        {
            // Quietly handle connection errors - this is expected when MongoDB is not available
            Console.WriteLine($"Error checking sample data availability for {databaseName}: {ex.Message}");
            return (false, "Error checking sample data availability.");
        }
    }
}