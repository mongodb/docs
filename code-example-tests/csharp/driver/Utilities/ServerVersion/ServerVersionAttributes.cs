namespace Utilities.ServerVersion;

using System;
using NUnit.Framework;
using NUnit.Framework.Interfaces;

/// <summary>
///     Skips a test when the connected MongoDB server is older than the specified minimum version.
///     Use this attribute on tests that depend on server features not yet available in all environments.
/// </summary>
[AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
public class RequiresMinimumServerVersionAttribute : Attribute, ITestAction
{
    private readonly bool _meetsRequirement;
    private readonly string _reason;

    /// <param name="minimumVersion">
    ///     The minimum MongoDB server version required (e.g., "8.3.0").
    ///     Tests are skipped—not failed—when the server version is below this value.
    /// </param>
    public RequiresMinimumServerVersionAttribute(string minimumVersion)
    {
        (_meetsRequirement, _reason) =
            ServerVersionChecker.CheckMinimumVersion(minimumVersion);
    }

    public void BeforeTest(ITest test)
    {
        if (!_meetsRequirement)
        {
            Assert.Ignore($"Test skipped: {_reason}");
        }
    }

    public void AfterTest(ITest test) { }

    public ActionTargets Targets => ActionTargets.Test;
}
