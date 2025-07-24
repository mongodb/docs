namespace Tests;

using DotNetEnv;

[SetUpFixture]
public class TestSuiteSetup
{
    [OneTimeSetUp]
    public void GlobalSetup()
    {
        Env.TraversePath().Load();
    }
}
