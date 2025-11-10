namespace Tests;

[SetUpFixture]
public class TestSuiteSetup
{
    [OneTimeSetUp]
    public void GlobalSetup()
    {
        DotNetEnv.Env.TraversePath().Load();
    }
}