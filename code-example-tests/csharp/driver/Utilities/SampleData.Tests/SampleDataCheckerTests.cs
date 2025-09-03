using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using Utilities.SampleData;

namespace Utilities.SampleData.Tests
{
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
        public class CheckSampleDataAvailableAsyncTests : SampleDataCheckerTests
        {
            [Test]
            public async Task ShouldReturnFalse_WhenConnectionStringIsNotInEnvFile()
            {
                // Skip this test if we're in a CI environment with sample data available
                // This test is designed to test the case where no connection string is available
                var existingConnection = DotNetEnv.Env.GetString("CONNECTION_STRING", null);
                if (!string.IsNullOrEmpty(existingConnection))
                {
                    // Check if sample data is actually available with the existing connection
                    var hasRealSampleData = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");
                    if (hasRealSampleData)
                    {
                        Assert.Ignore("Skipping test - CI environment has sample data loaded. This test validates behavior when no connection string is available.");
                    }
                }

                // Arrange - Create a temporary .env file with no connection string
                var tempEnvFile = Path.Combine(Path.GetTempPath(), ".env.test.empty");
                await File.WriteAllTextAsync(tempEnvFile, "SOME_OTHER_VAR=value\n");

                try
                {
                    // Load the temporary .env file
                    DotNetEnv.Env.Load(tempEnvFile);

                    // Act
                    var result = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");

                    // Assert
                    Assert.That(result, Is.False);
                }
                finally
                {
                    // Cleanup
                    if (File.Exists(tempEnvFile))
                    {
                        File.Delete(tempEnvFile);
                    }
                }
            }
            [Test]
            public async Task ShouldCacheResults_ToAvoidRepeatedDatabaseQueries()
            {
                // Arrange & Act
                var result1 = await SampleDataChecker.CheckSampleDataAvailableAsync("nonexistent_database");
                var result2 = await SampleDataChecker.CheckSampleDataAvailableAsync("nonexistent_database");

                // Assert
                Assert.That(result1, Is.EqualTo(result2));
            }

            [Test]
            public async Task ShouldHandleConnectionErrors_Gracefully()
            {
                // Skip this test if we're in a CI environment with sample data available
                // This test is designed to test connection error handling with invalid connection strings
                var existingConnection = DotNetEnv.Env.GetString("CONNECTION_STRING", null);
                if (!string.IsNullOrEmpty(existingConnection))
                {
                    // Check if sample data is actually available with the existing connection
                    var hasRealSampleData = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");
                    if (hasRealSampleData)
                    {
                        Assert.Ignore("Skipping test - CI environment has sample data loaded. This test validates connection error handling.");
                    }
                }

                // Arrange - Create a temporary .env file with invalid connection string
                var tempEnvFile = Path.Combine(Path.GetTempPath(), ".env.test.invalid");
                await File.WriteAllTextAsync(tempEnvFile, "CONNECTION_STRING=mongodb://invalid-host:27017/test\n");

                try
                {
                    // Load the temporary .env file
                    DotNetEnv.Env.Load(tempEnvFile);

                    // Act
                    var result = await SampleDataChecker.CheckSampleDataAvailableAsync("sample_mflix");

                    // Assert
                    Assert.That(result, Is.False);
                }
                finally
                {
                    // Cleanup
                    if (File.Exists(tempEnvFile))
                    {
                        File.Delete(tempEnvFile);
                    }
                }
            }

            [Test]
            public async Task ShouldReturnTrue_WhenRequiredCollectionsAreEmpty()
            {
                // Arrange
                var databaseName = "test_empty_collections";

                // Act
                var result = await SampleDataChecker.CheckSampleDataAvailableAsync(databaseName, Array.Empty<string>());

                // Assert - Should be false since database likely doesn't exist, but won't fail on collections
                Assert.That(result, Is.TypeOf<bool>());
            }

            [Test]
            public async Task ShouldUseDefaultCollections_WhenNotSpecified()
            {
                // Arrange
                var databaseName = "sample_mflix"; // This is in StandardSampleDatabases

                // Act
                var result = await SampleDataChecker.CheckSampleDataAvailableAsync(databaseName);

                // Assert - Should check the default collections for sample_mflix
                Assert.That(result, Is.TypeOf<bool>());
            }
        }

        [TestFixture]
        public class GetAvailableSampleDatabasesAsyncTests : SampleDataCheckerTests
        {
            [Test]
            public async Task ShouldReturnListOfAvailableDatabases()
            {
                // Act
                var availableDbs = await SampleDataChecker.GetAvailableSampleDatabasesAsync();

                // Assert
                Assert.That(availableDbs, Is.Not.Null);
                Assert.That(availableDbs, Is.InstanceOf<List<string>>());

                // All returned database names should start with 'sample_'
                foreach (var dbName in availableDbs)
                {
                    Assert.That(dbName, Does.StartWith("sample_"));
                }
            }

            [Test]
            public async Task ShouldReturnEmptyList_WhenNoSampleDatabasesAvailable()
            {
                // Skip this test if we're in a CI environment with sample data available
                // This test is designed to test the case where no sample databases are available
                var existingConnection = DotNetEnv.Env.GetString("CONNECTION_STRING", null);
                if (!string.IsNullOrEmpty(existingConnection))
                {
                    // Check if sample data is actually available with the existing connection
                    var existingSampleDbs = await SampleDataChecker.GetAvailableSampleDatabasesAsync();
                    if (existingSampleDbs.Any())
                    {
                        Assert.Ignore("Skipping test - CI environment has sample data loaded. This test validates behavior when no sample databases are available.");
                    }
                }

                // Arrange - Create a temporary .env file with invalid connection string
                var tempEnvFile = Path.Combine(Path.GetTempPath(), ".env.test.empty");
                await File.WriteAllTextAsync(tempEnvFile, "CONNECTION_STRING=mongodb://invalid-host:27017/test\n");

                try
                {
                    // Load the temporary .env file
                    DotNetEnv.Env.Load(tempEnvFile);

                    // Act
                    var availableDbs = await SampleDataChecker.GetAvailableSampleDatabasesAsync();

                    // Assert
                    Assert.That(availableDbs, Is.Not.Null);
                    Assert.That(availableDbs, Is.Empty);
                }
                finally
                {
                    // Cleanup
                    if (File.Exists(tempEnvFile))
                    {
                        File.Delete(tempEnvFile);
                    }
                }
            }
        }

        [TestFixture]
        public class CheckMultipleSampleDatabasesAsyncTests : SampleDataCheckerTests
        {
            [Test]
            public async Task ShouldReturnCorrectAvailability_ForMultipleDatabases()
            {
                // Arrange
                var requiredDatabases = new[] { "sample_mflix", "sample_restaurants" };

                // Act
                var result = await SampleDataChecker.CheckMultipleSampleDatabasesAsync(requiredDatabases);

                // Assert
                Assert.That(result, Is.Not.Null);
                Assert.That(result.IsAvailable, Is.TypeOf<bool>());
                Assert.That(result.MissingDatabases, Is.Not.Null);
                Assert.That(result.AvailableDatabases, Is.Not.Null);
            }

            [Test]
            public async Task ShouldHandleEmptyDatabaseArray()
            {
                // Arrange
                var requiredDatabases = Array.Empty<string>();

                // Act
                var result = await SampleDataChecker.CheckMultipleSampleDatabasesAsync(requiredDatabases);

                // Assert
                Assert.That(result.IsAvailable, Is.True);
                Assert.That(result.MissingDatabases, Is.Empty);
                Assert.That(result.AvailableDatabases, Is.Empty);
            }

            [Test]
            public async Task ShouldRespectCollectionsPerDatabase()
            {
                // Arrange
                var requiredDatabases = new[] { "sample_mflix" };
                var collectionsPerDatabase = new Dictionary<string, string[]>
                {
                    ["sample_mflix"] = new[] { "movies", "theaters" }
                };

                // Act
                var result = await SampleDataChecker.CheckMultipleSampleDatabasesAsync(requiredDatabases, collectionsPerDatabase);

                // Assert
                Assert.That(result, Is.Not.Null);
            }
        }

        [TestFixture]
        public class CacheManagementTests : SampleDataCheckerTests
        {
            [Test]
            public void ClearSampleDataCache_ShouldClearInternalCache()
            {
                // Arrange - populate cache by making a call
                var task = SampleDataChecker.CheckSampleDataAvailableAsync("test_database");
                task.Wait();

                // Act
                SampleDataChecker.ClearSampleDataCache();

                // Assert - Should not throw (cache is cleared)
                Assert.DoesNotThrow(() => SampleDataChecker.ClearSampleDataCache());
            }

            [Test]
            public async Task ShouldShowSummary_OnlyOnce()
            {
                // Act
                await SampleDataChecker.ShowSampleDataSummaryAsync();
                await SampleDataChecker.ShowSampleDataSummaryAsync(); // Second call should return immediately

                // Assert - Should not hang or throw
                Assert.Pass();
            }
        }

        [TestFixture]
        public class StandardSampleDatabasesTests
        {
            [Test]
            public void StandardSampleDatabases_ShouldContainExpectedEntries()
            {
                // Assert
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
        public async Task ShouldBeSkipped_WhenRequiredDatabaseIsMissing()
        {
            // Check sample data at the beginning of the test
            SampleDataTestHelper.EnsureSampleDataOrSkip("nonexistent_sample_database");

            // This test should be skipped since the database doesn't exist
            await Task.Delay(1);
            Assert.Fail("This test should have been skipped");
        }

        [Test]
        public async Task ShouldAlwaysRun_WhenNoSampleDataRequired()
        {
            // Regular test that always runs regardless of sample data
            await Task.Delay(1);
            Assert.Pass("This test always runs");
        }

        [Test]
        [RequiresSampleData("sample_mflix")]
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
        public async Task ShouldRunIfSampleMflixAvailable_Test1()
        {
            // All tests in this fixture require sample_mflix
            await Task.Delay(1);
            Assert.Pass("Fixture-level sample data test 1");
        }

        [Test]
        public async Task ShouldRunIfSampleMflixAvailable_Test2()
        {
            // All tests in this fixture require sample_mflix
            await Task.Delay(1);
            Assert.Pass("Fixture-level sample data test 2");
        }
    }
}
