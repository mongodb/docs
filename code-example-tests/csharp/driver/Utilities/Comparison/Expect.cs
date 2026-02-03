namespace Utilities.Comparison;

public static class Expect
{
    /// <summary>
    /// Start building an expectation for the given actual results.
    /// This is the main entry point for all comparison operations.
    /// The actual value should never be a file path - file paths are only
    /// valid for the expected value in ShouldMatch().
    /// </summary>
    /// <param name="actual">The actual results to validate (from MongoDB operations)</param>
    /// <returns>ExpectBuilder for fluent configuration and comparison</returns>
    public static IBuilder That(object? actual)
    {
        return new ExpectBuilder(actual);
    }
}