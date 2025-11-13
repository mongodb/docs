namespace Tests;

[SetUpFixture]
public class TestSuiteSetup
{
    [OneTimeSetUp]
    [Description("Loads environment variables from .env file for the entire test suite")]
    public void GlobalSetup()
    {
        DotNetEnv.Env.TraversePath().Load();
    }
}