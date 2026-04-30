using DotNetEnv;
using NUnit.Framework;

namespace Utilities.ServerVersion.Tests;

[TestFixture]
public class ServerVersionCheckerTests
{
    [TestFixture]
    public class CheckMinimumVersionAsyncTests
    {
        [Test]
        [Description(
            "Verifies that CheckMinimumVersionAsync returns false when no connection " +
            "string is provided and CONNECTION_STRING is absent from the environment. " +
            "Skipped in environments where CONNECTION_STRING is already set.")]
        public async Task ShouldReturnFalse_WhenConnectionStringIsMissing()
        {
            // ServerVersionChecker internally calls Env.TraversePath().Load(), which
            // re-discovers the real .env file. This test is only meaningful when
            // no CONNECTION_STRING is available in the environment at all.
            var existingConnection = Env.GetString("CONNECTION_STRING");
            if (!string.IsNullOrEmpty(existingConnection))
                Assert.Ignore(
                    "Skipping test — CONNECTION_STRING is set in this environment. " +
                    "This test validates behavior when no connection string is available.");

            var (meetsRequirement, _) =
                await ServerVersionChecker.CheckMinimumVersionAsync("1.0.0");

            Assert.That(meetsRequirement, Is.False);
        }

        [Test]
        [Description(
            "Verifies that CheckMinimumVersionAsync returns false and does not throw " +
            "when the connection string points to an unreachable host.")]
        public async Task ShouldReturnFalse_WhenConnectionIsUnreachable()
        {
            var (meetsRequirement, reason) =
                await ServerVersionChecker.CheckMinimumVersionAsync(
                    "1.0.0", "mongodb://invalid-host-that-does-not-exist:27017");

            Assert.That(meetsRequirement, Is.False);
            Assert.That(reason, Does.Contain("Error checking server version"));
        }

        [Test]
        [Description(
            "Verifies that CheckMinimumVersionAsync returns true when the connected " +
            "server version satisfies a very low minimum version requirement.")]
        public async Task ShouldReturnTrue_WhenServerMeetsRequirement()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");

            var (meetsRequirement, reason) =
                await ServerVersionChecker.CheckMinimumVersionAsync("1.0.0", connectionString);

            Assert.That(meetsRequirement, Is.True);
            Assert.That(reason, Does.Contain("meets minimum requirement"));
        }

        [Test]
        [Description(
            "Verifies that CheckMinimumVersionAsync returns false when the connected " +
            "server version does not satisfy an impossibly high minimum version requirement.")]
        public async Task ShouldReturnFalse_WhenServerDoesNotMeetRequirement()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");

            var (meetsRequirement, reason) =
                await ServerVersionChecker.CheckMinimumVersionAsync("99.0.0", connectionString);

            Assert.That(meetsRequirement, Is.False);
            Assert.That(reason, Does.Contain("does not meet the minimum requirement"));
        }
    }

    [TestFixture]
    public class CheckAttributeTests
    {
        [Test]
        [RequiresMinimumServerVersion("99.0.0")]
        [Description(
            "Verifies that [RequiresMinimumServerVersion] skips the test when " +
            "the minimum version is impossibly high.")]
        public void TooHighVersion_ShouldSkipTest()
        {
            Assert.Fail(
                "This test should have been skipped due to the server version " +
                "not meeting the minimum requirement.");
        }

        [Test]
        [RequiresMinimumServerVersion("1.0.0")]
        [Description(
            "Verifies that [RequiresMinimumServerVersion] does not skip the test " +
            "when the minimum version is met by any production server.")]
        public void SufficientlyLowVersion_ShouldNotSkipTest()
        {
            // If we reach here the attribute correctly determined the server
            // meets the minimum version requirement and did not skip the test.
            Assert.Pass("Server meets the minimum version requirement; test ran successfully.");
        }
    }

    [TestFixture]
    public class ParseVersionTests
    {
        [Test]
        [Description(
            "Verifies that a pre-release suffix (e.g., '-rc1') is stripped when " +
            "parsing the minimum version string, and the result is identical to " +
            "the equivalent release version.")]
        public async Task ShouldStripPreReleaseSuffix()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");

            // "1.0.0-rc1" should behave identically to "1.0.0"
            var (withSuffix, _) =
                await ServerVersionChecker.CheckMinimumVersionAsync("1.0.0-rc1", connectionString);
            var (withoutSuffix, _) =
                await ServerVersionChecker.CheckMinimumVersionAsync("1.0.0", connectionString);

            Assert.That(withSuffix, Is.EqualTo(withoutSuffix));
        }

        [Test]
        [Description(
            "Verifies that a build metadata suffix (e.g., '+enterprise') is stripped " +
            "when parsing the minimum version string, and the result is identical to " +
            "the equivalent release version.")]
        public async Task ShouldStripBuildMetadataSuffix()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");

            // "99.0.0+enterprise" should behave identically to "99.0.0"
            var (withSuffix, _) =
                await ServerVersionChecker.CheckMinimumVersionAsync(
                    "99.0.0+enterprise", connectionString);
            var (withoutSuffix, _) =
                await ServerVersionChecker.CheckMinimumVersionAsync("99.0.0", connectionString);

            Assert.That(withSuffix, Is.EqualTo(withoutSuffix));
        }

        [Test]
        [Description(
            "Verifies that a two-component version string (e.g., '1.0') is padded " +
            "to three components and behaves identically to '1.0.0'.")]
        public async Task ShouldPadTwoComponentVersion()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");

            // "1.0" should behave identically to "1.0.0"
            var (twoComponent, _) =
                await ServerVersionChecker.CheckMinimumVersionAsync("1.0", connectionString);
            var (threeComponent, _) =
                await ServerVersionChecker.CheckMinimumVersionAsync("1.0.0", connectionString);

            Assert.That(twoComponent, Is.EqualTo(threeComponent));
        }
    }

    [TestFixture]
    public class CheckMinimumVersionTests
    {
        [Test]
        [Description(
            "Verifies that the synchronous CheckMinimumVersion returns false and " +
            "does not throw when the connection string points to an unreachable host.")]
        public void ShouldReturnFalse_WhenConnectionIsUnreachable()
        {
            var (meetsRequirement, reason) =
                ServerVersionChecker.CheckMinimumVersion(
                    "1.0.0", "mongodb://invalid-host-that-does-not-exist:27017");

            Assert.That(meetsRequirement, Is.False);
            Assert.That(reason, Does.Contain("Error checking server version"));
        }

        [Test]
        [Description(
            "Verifies that the synchronous CheckMinimumVersion returns true when " +
            "the connected server satisfies a very low minimum version requirement.")]
        public void ShouldReturnTrue_WhenServerMeetsRequirement()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");

            var (meetsRequirement, reason) =
                ServerVersionChecker.CheckMinimumVersion("1.0.0", connectionString);

            Assert.That(meetsRequirement, Is.True);
            Assert.That(reason, Does.Contain("meets minimum requirement"));
        }

        [Test]
        [Description(
            "Verifies that the synchronous CheckMinimumVersion returns false when the " +
            "connected server does not satisfy an impossibly high minimum version requirement.")]
        public void ShouldReturnFalse_WhenServerDoesNotMeetRequirement()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");

            var (meetsRequirement, reason) =
                ServerVersionChecker.CheckMinimumVersion("99.0.0", connectionString);

            Assert.That(meetsRequirement, Is.False);
            Assert.That(reason, Does.Contain("does not meet the minimum requirement"));
        }
    }
}
