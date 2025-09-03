namespace Utilities.Comparison;

/// <summary>
/// Represents the result of a comparison operation.
/// Uses discriminated union pattern with records for clean error handling.
/// </summary>
public abstract record ComparisonResult
{
    /// <summary>
    /// Indicates whether the comparison was successful (values matched).
    /// </summary>
    public abstract bool IsSuccess { get; }

    /// <summary>
    /// Gets error information if the comparison failed.
    /// </summary>
    public abstract ComparisonError? Error { get; }
}

/// <summary>
/// Represents a successful comparison where values matched.
/// </summary>
public sealed record ComparisonSuccess : ComparisonResult
{
    public override bool IsSuccess => true;
    public override ComparisonError? Error => null;

    public static ComparisonSuccess Instance { get; } = new();
}

/// <summary>
/// Represents a failed comparison with detailed error information.
/// </summary>
public sealed record ComparisonFailure : ComparisonResult
{
    public ComparisonFailure(ComparisonError error)
    {
        Error = error;
    }

    public override bool IsSuccess => false;
    public override ComparisonError Error { get; }
}

/// <summary>
/// Detailed information about a comparison failure.
/// </summary>
/// <param name="Path">JSON path to the mismatched element (e.g., "users[0].name")</param>
/// <param name="Expected">String representation of expected value</param>
/// <param name="Actual">String representation of actual value</param>
/// <param name="Message">Human-readable description of the mismatch</param>
public record ComparisonError(
    string Path,
    string Expected,
    string Actual,
    string Message)
{
    public override string ToString() =>
        $"Comparison failed at '{Path}': {Message}. Expected: {Expected}, Actual: {Actual}";
}
