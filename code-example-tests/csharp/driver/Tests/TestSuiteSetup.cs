using DotNetEnv;

namespace Tests;

[SetUpFixture]
public class TestSuiteSetup
{
    [OneTimeSetUp]
    public void GlobalSetup()
    {
        Env.TraversePath().Load();
    }
}