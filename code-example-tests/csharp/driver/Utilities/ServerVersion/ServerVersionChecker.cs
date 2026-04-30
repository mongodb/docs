using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Utilities.ServerVersion;

/// <summary>
///     Utility for checking the MongoDB server version and conditionally skipping tests
///     that require a minimum server version.
/// </summary>
public static class ServerVersionChecker
{
    /// <summary>
    /// Synchronously checks whether the connected server meets the minimum version requirement.
    /// </summary>
    /// <param name="minimumVersion">The minimum required server version (e.g., "8.3.0").</param>
    /// <param name="connectionString">Optional connection string. Falls back to CONNECTION_STRING in .env.</param>
    /// <returns>
    ///     A tuple where <c>meetsRequirement</c> is <c>true</c> if the server version is
    ///     greater than or equal to <paramref name="minimumVersion"/>, and <c>reason</c>
    ///     describes the outcome.
    /// </returns>
    public static (bool meetsRequirement, string reason) CheckMinimumVersion(
        string minimumVersion, string connectionString = "")
    {
        return CheckMinimumVersionAsync(minimumVersion, connectionString)
            .GetAwaiter().GetResult();
    }

    /// <summary>
    /// Asynchronously checks whether the connected server meets the minimum version requirement.
    /// Connects with short timeouts to fail fast when MongoDB is unreachable.
    /// </summary>
    /// <param name="minimumVersion">The minimum required server version (e.g., "8.3.0").</param>
    /// <param name="connectionString">Optional connection string. Falls back to CONNECTION_STRING in .env.</param>
    public static async Task<(bool meetsRequirement, string reason)> CheckMinimumVersionAsync(
        string minimumVersion, string connectionString = "")
    {
        try
        {
            Env.TraversePath().Load();

            if (string.IsNullOrWhiteSpace(connectionString))
                connectionString = Env.GetString("CONNECTION_STRING");

            if (string.IsNullOrWhiteSpace(connectionString))
                return (false, "CONNECTION_STRING not found in .env file.");

            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            clientSettings.ServerSelectionTimeout = TimeSpan.FromMilliseconds(2000);
            clientSettings.ConnectTimeout = TimeSpan.FromMilliseconds(2000);
            clientSettings.SocketTimeout = TimeSpan.FromMilliseconds(2000);

            using var client = new MongoClient(clientSettings);

            var admin = client.GetDatabase("admin");
            var buildInfo = await admin.RunCommandAsync<BsonDocument>(
                new BsonDocument("buildInfo", 1));

            var versionString = buildInfo["version"].AsString;
            var serverVersion = ParseVersion(versionString);
            var requiredVersion = ParseVersion(minimumVersion);

            if (serverVersion >= requiredVersion)
                return (true, $"Server version {versionString} meets minimum requirement {minimumVersion}.");

            return (false,
                $"Server version {versionString} does not meet the minimum requirement of {minimumVersion}.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error checking server version: {ex.Message}");
            return (false, "Error checking server version.");
        }
    }

    private static Version ParseVersion(string versionString)
    {
        // Strip pre-release suffixes like "-rc1" or "+enterprise"
        var clean = versionString.Split('-')[0].Split('+')[0];

        // Ensure at least Major.Minor.Patch
        var parts = clean.Split('.');
        while (parts.Length < 3)
            parts = [.. parts, "0"];

        return new Version(string.Join(".", parts.Take(3)));
    }
}
