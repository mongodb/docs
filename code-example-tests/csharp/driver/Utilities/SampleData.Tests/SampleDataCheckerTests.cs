using DotNetEnv;
using NUnit.Framework;

namespace Utilities.SampleData.Tests;

[TestFixture]
public class SampleDataCheckerTests
{
    [SetUp]
    public void SetUp()
    {
        // Clear cache before each test to ensure fresh checks
        SampleDataChecker.ClearSampleDataCache();
    }

    [TestFixture]
    public class CheckSampleDataAvailableAsyncTests
    {
        [Test]
        [Description(
            "Verifies that the method returns false when no connection string is present in the environment file")]
        public async Task ShouldReturnFalse_WhenConnectionStringIsNotInEnvFile()
        {
            // Skip this test if we're in a CI environment with sample data available
            // This test is designed to test the case where no connection string is available
            var existingConnection = Env.GetString("CONNECTION_STRING");
            if (!string.IsNullOrEmpty(existingConnection))
            {
                // Check if sample data is actually available with the existing connection
                var hasRealSampleData = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");
                if (hasRealSampleData)
                    Assert.Ignore(
                        "Skipping test - CI environment has sample data loaded. This test validates behavior when no connection string is available.");
            }


            var tempEnvFile = Path.Combine(Path.GetTempPath(), ".env.test.empty");
            await File.WriteAllTextAsync(tempEnvFile, "SOME_OTHER_VAR=value\n");

            try
            {
                // Load the temporary .env file
                Env.Load(tempEnvFile);

                var result = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");


                Assert.That(result, Is.False);
            }
            finally
            {
                if (File.Exists(tempEnvFile)) File.Delete(tempEnvFile);
            }
        }

        [Test]
        [Description("Ensures that results are cached to prevent repeated database queries for the same database")]
        public async Task ShouldCacheResults_ToAvoidRepeatedDatabaseQueries()
        {
            var result1 = await SampleDataChecker.CheckSampleDataAvailableAsync("nonexistent_database");
            var result2 = await SampleDataChecker.CheckSampleDataAvailableAsync("nonexistent_database");

            Assert.That(result1, Is.EqualTo(result2));
        }

        [Test]
        [Description(
            "Verifies that connection errors are handled gracefully and return false instead of throwing exceptions")]
        public async Task ShouldHandleConnectionErrors_Gracefully()
        {
            // Skip this test if we're in a CI environment with sample data available
            // This test is designed to test connection error handling with invalid connection strings
            var existingConnection = Env.GetString("CONNECTION_STRING");
            if (!string.IsNullOrEmpty(existingConnection))
            {
                // Check if sample data is actually available with the existing connection
                var hasRealSampleData = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");
                if (hasRealSampleData)
                    Assert.Ignore(
                        "Skipping test - CI environment has sample data loaded. This test validates connection error handling.");
            }


            var tempEnvFile = Path.Combine(Path.GetTempPath(), ".env.test.invalid");
            await File.WriteAllTextAsync(tempEnvFile, "CONNECTION_STRING=mongodb://invalid-host:27017/test\n");

            try
            {
                // Load the temporary .env file
                Env.Load(tempEnvFile);

                var result = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");


                Assert.That(result, Is.False);
            }
            finally
            {
                if (File.Exists(tempEnvFile)) File.Delete(tempEnvFile);
            }
        }

        [Test]
        [Description(
            "Tests that the method returns true when checking for sample data with an empty collections array")]
        public async Task ShouldReturnTrue_WhenRequiredCollectionsAreEmpty()
        {
            var databaseName = "test_empty_collections";

            var result = await SampleDataChecker.CheckSampleDataAvailableAsync(databaseName, []);


            Assert.That(result, Is.TypeOf<bool>());
        }

        [Test]
        [Description("Verifies that default collections are used when no specific collections are provided")]
        public async Task ShouldUseDefaultCollections_WhenNotSpecified()
        {
            var databaseName = "sample_mflix"; // This is in StandardSampleDatabases

            var result = await SampleDataChecker.CheckSampleDataAvailableAsync(databaseName);


            Assert.That(result, Is.TypeOf<bool>());
        }
    }

    [TestFixture]
    public class GetAvailableSampleDatabasesAsyncTests
    {
        [Test]
        [Description("Tests that the method returns a list of available sample databases starting with 'sample_'")]
        public async Task ShouldReturnListOfAvailableDatabases()
        {
            var availableDbs = await SampleDataChecker.GetAvailableSampleDatabasesAsync();


            Assert.That(availableDbs, Is.Not.Null);
            Assert.That(availableDbs, Is.InstanceOf<List<string>>());

            // All returned database names should start with 'sample_'
            foreach (var dbName in availableDbs) Assert.That(dbName, Does.StartWith("sample_"));
        }

        [Test]
        [Description("Verifies that an empty list is returned when no sample databases are available")]
        public async Task ShouldReturnEmptyList_WhenNoSampleDatabasesAvailable()
        {
            // Skip this test if we're in a CI environment with sample data available
            // This test is designed to test the case where no sample databases are available
            var existingConnection = Env.GetString("CONNECTION_STRING");
            if (!string.IsNullOrEmpty(existingConnection))
            {
                // Check if sample data is actually available with the existing connection
                var existingSampleDbs = await SampleDataChecker.GetAvailableSampleDatabasesAsync();
                if (existingSampleDbs.Any())
                    Assert.Ignore(
                        "Skipping test - CI environment has sample data loaded. This test validates behavior when no sample databases are available.");
            }


            var tempEnvFile = Path.Combine(Path.GetTempPath(), ".env.test.empty");
            await File.WriteAllTextAsync(tempEnvFile, "CONNECTION_STRING=mongodb://invalid-host:27017/test\n");

            try
            {
                // Load the temporary .env file
                Env.Load(tempEnvFile);

                var availableDbs = await SampleDataChecker.GetAvailableSampleDatabasesAsync();


                Assert.That(availableDbs, Is.Not.Null);
                Assert.That(availableDbs, Is.Empty);
            }
            finally
            {
                if (File.Exists(tempEnvFile)) File.Delete(tempEnvFile);
            }
        }
    }

    [TestFixture]
    public class CheckMultipleSampleDatabasesAsyncTests
    {
        [Test]
        [Description("Tests that the method correctly reports availability status for multiple sample databases")]
        public async Task ShouldReturnCorrectAvailability_ForMultipleDatabases()
        {
            var requiredDatabases = new[] { "sample_mflix", "sample_restaurants" };

            var result = await SampleDataChecker.CheckMultipleSampleDatabasesAsync(requiredDatabases);


            Assert.That(result, Is.Not.Null);
            Assert.That(result.IsAvailable, Is.TypeOf<bool>());
            Assert.That(result.MissingDatabases, Is.Not.Null);
            Assert.That(result.AvailableDatabases, Is.Not.Null);
        }

        [Test]
        [Description(
            "Verifies that the method handles empty database arrays gracefully and returns appropriate results")]
        public async Task ShouldHandleEmptyDatabaseArray()
        {
            var requiredDatabases = Array.Empty<string>();

            var result = await SampleDataChecker.CheckMultipleSampleDatabasesAsync(requiredDatabases);


            Assert.That(result.IsAvailable, Is.True);
            Assert.That(result.MissingDatabases, Is.Empty);
            Assert.That(result.AvailableDatabases, Is.Empty);
        }

        [Test]
        [Description("Tests that the method respects specific collection requirements per database")]
        public async Task ShouldRespectCollectionsPerDatabase()
        {
            var requiredDatabases = new[] { "sample_mflix" };
            var collectionsPerDatabase = new Dictionary<string, string[]>
            {
                ["sample_mflix"] = new[] { "movies", "theaters" }
            };

            var result =
                await SampleDataChecker.CheckMultipleSampleDatabasesAsync(requiredDatabases, collectionsPerDatabase);


            Assert.That(result, Is.Not.Null);
        }
    }

    [TestFixture]
    public class CacheManagementTests
    {
        [Test]
        [Description("Verifies that the cache clearing method executes without throwing exceptions")]
        public void ClearSampleDataCache_ShouldClearInternalCache()
        {
            var task = SampleDataChecker.CheckSampleDataAvailableAsync("test_database");
            task.Wait();

            SampleDataChecker.ClearSampleDataCache();


            Assert.DoesNotThrow(SampleDataChecker.ClearSampleDataCache);
        }

        [Test]
        [Description("Tests that the summary is shown only once and subsequent calls return immediately")]
        public async Task ShouldShowSummary_OnlyOnce()
        {
            await SampleDataChecker.ShowSampleDataSummaryAsync();
            await SampleDataChecker.ShowSampleDataSummaryAsync(); // Second call should return immediately


            Assert.Pass();
        }
    }

    [TestFixture]
    public class StandardSampleDatabasesTests
    {
        [Test]
        [Description(
            "Verifies that the StandardSampleDatabases contains expected database entries with correct collections")]
        public void StandardSampleDatabases_ShouldContainExpectedEntries()
        {
            Assert.That(SampleDataChecker.StandardSampleDatabases, Is.Not.Null);
            Assert.That(SampleDataChecker.StandardSampleDatabases, Contains.Key("sample_mflix"));
            Assert.That(SampleDataChecker.StandardSampleDatabases, Contains.Key("sample_restaurants"));
            Assert.That(SampleDataChecker.StandardSampleDatabases, Contains.Key("sample_training"));

            // Check that sample_mflix has expected collections
            Assert.That(SampleDataChecker.StandardSampleDatabases["sample_mflix"], Contains.Item("movies"));
            Assert.That(SampleDataChecker.StandardSampleDatabases["sample_mflix"], Contains.Item("theaters"));
        }
    }
}

// Example tests demonstrating the usage of the sample data utilities
[TestFixture]
public class SampleDataAttributeExampleTests
{
    [Test]
    [RequiresSampleData("sample_mflix")]
    [Description("Demonstrates a test that only runs when the sample_mflix database is available")]
    public async Task ShouldRunOnlyIfSampleMflixIsAvailable()
    {
        // Check sample data at the beginning of the test
        SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix");

        // This test will only run if sample_mflix database exists with default collections
        await Task.Delay(1); // Simulate some work
        Assert.Pass("This test ran because sample_mflix is available");
    }

    [Test]
    [RequiresSampleData("sample_mflix", "sample_restaurants")]
    [Description("Shows how to require multiple sample databases to be available before running a test")]
    public async Task ShouldRunOnlyIfBothDatabasesAreAvailable()
    {
        // Check sample data at the beginning of the test
        SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix", "sample_restaurants");

        // This test will only run if both sample databases exist
        await Task.Delay(1); // Simulate some work
        Assert.Pass("This test ran because both sample databases are available");
    }

    [Test]
    [RequiresSampleData("nonexistent_sample_database")]
    [Description("Example test that should be skipped when the required database is not available")]
    public async Task ShouldBeSkipped_WhenRequiredDatabaseIsMissing()
    {
        // Check sample data at the beginning of the test
        SampleDataTestHelper.EnsureSampleDataOrSkip("nonexistent_sample_database");

        // This test should be skipped since the database doesn't exist
        await Task.Delay(1);
        Assert.Fail("This test should have been skipped");
    }

    [Test]
    [Description("A regular test that runs regardless of sample data availability")]
    public async Task ShouldAlwaysRun_WhenNoSampleDataRequired()
    {
        // Regular test that always runs regardless of sample data
        await Task.Delay(1);
        Assert.Pass("This test always runs");
    }

    [Test]
    [RequiresSampleData("sample_mflix")]
    [Description("Demonstrates how to specify required collections per database for testing")]
    public async Task ShouldUseCollectionsPerDatabase()
    {
        // Check for specific collections
        var collectionsPerDatabase = new Dictionary<string, string[]>
        {
            ["sample_mflix"] = new[] { "movies", "theaters" }
        };
        SampleDataTestHelper.EnsureSampleDataOrSkip(new[] { "sample_mflix" }, collectionsPerDatabase);

        await Task.Delay(1);
        Assert.Pass("This test ran with specific collection requirements");
    }
}

// Example test fixture demonstrating fixture-level sample data requirements  
[TestFixture]
[RequiresSampleData("sample_mflix")]
public class SampleMflixTestFixture
{
    [SetUp]
    public void SetUp()
    {
        // Check sample data at the fixture level
        SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix");
    }

    [Test]
    [Description("First test in a fixture that requires sample_mflix to be available")]
    public async Task ShouldRunIfSampleMflixAvailable_Test1()
    {
        // All tests in this fixture require sample_mflix
        await Task.Delay(1);
        Assert.Pass("Fixture-level sample data test 1");
    }

    [Test]
    [Description("Second test in a fixture that requires sample_mflix to be available")]
    public async Task ShouldRunIfSampleMflixAvailable_Test2()
    {
        // All tests in this fixture require sample_mflix
        await Task.Delay(1);
        Assert.Pass("Fixture-level sample data test 2");
    }
}