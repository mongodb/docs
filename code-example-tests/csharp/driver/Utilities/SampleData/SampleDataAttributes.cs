namespace Utilities.SampleData;

using System;
using NUnit.Framework;
using NUnit.Framework.Interfaces;

[AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
public class RequiresSampleDataAttribute : Attribute, ITestAction
{
    private readonly bool _dataAvailable;
    private readonly string _reason;

    public RequiresSampleDataAttribute(string dbName, string[]? requiredCollections = null)
    {
        // Check if the required sample database is available
        (_dataAvailable, _reason) = SampleDataChecker.CheckSampleDataAvailable(dbName, requiredCollections);
    }

    public RequiresSampleDataAttribute(string[] dbNames, string[]? requiredCollections = null)
    {
        // Check if the required sample databases are available
        (_dataAvailable, _reason) = SampleDataChecker.CheckSampleDataAvailable(dbNames, requiredCollections);
    }

    public void BeforeTest(ITest test)
    {
        if (!_dataAvailable)
        {
            Assert.Ignore($"Test skipped: {_reason}");
        }
    }

    public void AfterTest(ITest test)
    {
        // No action needed after the test  
    }

    public ActionTargets Targets => ActionTargets.Test;
}
