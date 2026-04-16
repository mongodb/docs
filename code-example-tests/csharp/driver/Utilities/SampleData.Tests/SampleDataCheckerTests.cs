using DotNetEnv;
using MongoDB.Driver;
using NUnit.Framework;

namespace Utilities.SampleData.Tests;

[TestFixture]
public class SampleDataCheckerTests
{
    [TestFixture]
    public class CheckSampleDataAvailableAsyncTests
    {
        [Test]
        [Description(
            "Verifies that CheckSampleDataAvailableAsync returns false when CONNECTION_STRING is absent from the .env file and no connection string is passed explicitly. Skipped in CI environments where sample data is already loaded.")]
        public async Task ShouldReturnFalse_WhenConnectionStringIsNotInEnvFile()
        {
            // Skip this test if we're in a CI environment with sample data available
            // This test is designed to test the case where no connection string is available
            var existingConnection = Env.GetString("CONNECTION_STRING");
            if (!string.IsNullOrEmpty(existingConnection))
            {
                // Check if sample data is actually available with the existing connection
                var (hasRealSampleData, _) = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");
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

                var (isAvailable, reason) = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");


                Assert.That(isAvailable, Is.False);
            }
            finally
            {
                if (File.Exists(tempEnvFile)) File.Delete(tempEnvFile);
            }
        }

        [Test]
        [Description(
            "Verifies that CheckSampleDataAvailableAsync returns false when the connection string points to an unreachable host.")]
        public async Task ShouldHandleConnectionErrors_Gracefully()
        {
            var tempEnvFile = Path.Combine(Path.GetTempPath(), ".env.test.invalid");
            await File.WriteAllTextAsync(tempEnvFile, "CONNECTION_STRING=mongodb://invalid-host:27017/test\n");

            try
            {
                // Load the temporary .env file
                Env.Load(tempEnvFile);
                var (isAvailable, reason) = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix",
                    null,
                    Env.GetString("CONNECTION_STRING"));
                Assert.That(isAvailable, Is.False);
            }
            finally
            {
                if (File.Exists(tempEnvFile)) File.Delete(tempEnvFile);
            }
        }

        [Test]
        [Description(
            "Verifies that CheckSampleDataAvailableAsync returns false when the database does not exist, even when an empty collection array is passed.")]
        public async Task ShouldReturnFalse_WhenRequiredCollectionsAreEmpty()
        {
            var databaseName = "test_empty_collections";

            var (isAvailable, reason) = await SampleDataChecker.CheckSampleDataAvailableAsync(databaseName, []);

            Assert.That(isAvailable, Is.False);
            Assert.That(reason, Is.EqualTo($"Database '{databaseName}' does not exist."));
        }

        [Test]
        [Description(
            "Verifies that CheckSampleDataAvailableAsync returns true when the database exists and no required collections are specified.")]
        public async Task ShouldUseDefaultCollections_WhenNotSpecified()
        {
            var databaseName = "sample_mflix"; // This is in StandardSampleDatabases

            var (isAvailable, reason) = await SampleDataChecker.CheckSampleDataAvailableAsync(databaseName);


            Assert.That(isAvailable, Is.True);
            Assert.That(reason, Is.EqualTo("Sample data is available."));
        }
    }

    [TestFixture]
    public class CheckAttributeTests
    {
        [Test]
        [RequiresSampleData("sample_mx")]
        [Description("Verifies that [RequiresSampleData] skips the test when the specified database does not exist.")]
        public void MissingSingleDb_ShouldSkipTest()
        {
            Assert.Fail("This test should have been skipped due to missing sample data.");
        }

        [Test]
        [RequiresSampleData(["sample_mx", "sample_mflix"])]
        [Description("Verifies that [RequiresSampleData] skips the test when at least one of the specified databases does not exist, even if another does.")]
        public void MissingOneOfMultipleDBs_ShouldSkipTest()
        {
            Assert.Fail("This test should have been skipped due to missing sample data.");
        }

        [Test]
        [RequiresSampleData(["sample_mx", "sample_mf"])]
        [Description("Verifies that [RequiresSampleData] skips the test when all specified databases do not exist.")]
        public void MissingBothDbs_ShouldSkipTest()
        {
            Assert.Fail("This test should have been skipped due to missing sample data.");
        }

        [Test]
        [RequiresSampleData("sample_mflix", ["borp"])]
        [Description("Verifies that [RequiresSampleData] skips the test when the database exists but a required collection does not.")]
        public void MissingSingleCollection_ShouldSkipTest()
        {
            Assert.Fail("This test should have been skipped due to missing sample data.");
        }

        [Test]
        [RequiresSampleData("sample_mflix", ["movies", "borp"])]
        [Description("Verifies that [RequiresSampleData] skips the test when the database exists but one or more required collections do not.")]
        public void MissingOneOfMultipleCollections_ShouldSkipTest()
        {
            Assert.Fail("This test should have been skipped due to missing sample data.");
        }

        [Test]
        [RequiresSampleData("sample_mflix", ["moovoies", "borp"])]
        [Description("Verifies that [RequiresSampleData] skips the test when the database exists but multiple required collections (moovoies, borp) do not.")]
        public void MissingMultipleCollections_ShouldSkipTest()
        {
            Assert.Fail("This test should have been skipped due to missing sample data.");
        }

        // A bit of a weird test; if the sample data doesn't exist, we'll skip the test.
        // If it does exist, we essentially duplicate the work that the attribute does.
        // But without dependency injection and mocking, we can't really test that it 
        // doesn't skip when data is available. 
        [Test]
        [RequiresSampleData("sample_mflix")]
        [Description("Verifies that [RequiresSampleData] does not skip the test when the specified database exists.")]
        public async Task ValidDbAndCollections_ShouldNotSkipTest()
        {
            Env.TraversePath().Load();

            var connectionString = Env.GetString("CONNECTION_STRING");
            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);

            using var client = new MongoClient(clientSettings);
            var databases = await client.ListDatabaseNamesAsync();
            var databaseList = await databases.ToListAsync();
            var dbExists = databaseList.Contains("sample_mflix");

            if (dbExists)
            {
                Assert.Pass("We confirmed that the sample data is available; test ran successfully.");
            }

            else Assert.Fail("Sample data is not available; test should have been skipped but wasn't.");
        }
    }
}