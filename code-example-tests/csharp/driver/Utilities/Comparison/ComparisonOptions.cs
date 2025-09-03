using System.Collections.Immutable;

namespace Utilities.Comparison;

/// <summary>
/// Defines how arrays should be compared during validation.
/// </summary>
public enum ArrayComparisonMode
{
    /// <summary>
    /// Arrays must have identical elements in the same order.
    /// </summary>
    Ordered,

    /// <summary>
    /// Arrays must have identical elements but order doesn't matter.
    /// </summary>
    Unordered
}

/// <summary>
/// Configuration options for example output comparison.
/// Immutable record type following modern C# patterns.
/// </summary>
/// <param name="ArrayMode">How to compare arrays (default: Unordered)</param>
/// <param name="IgnoredFields">Field names whose values should be ignored during comparison (case-sensitive)</param>
/// <param name="TimeoutSeconds">Maximum time to spend on comparison operations</param>
/// <param name="InheritedGlobalEllipsis">Whether global ellipsis from parent should apply (internal use)</param>
public record ComparisonOptions(
    ArrayComparisonMode ArrayMode = ArrayComparisonMode.Unordered,
    ImmutableHashSet<string>? IgnoredFields = null,
    int TimeoutSeconds = 30,
    bool InheritedGlobalEllipsis = false)
{
    /// <summary>
    /// Default comparison options with unordered array comparison.
    /// </summary>
    public static ComparisonOptions Default { get; } = new();

    /// <summary>
    /// Creates options with specific ignored fields.
    /// </summary>
    public static ComparisonOptions IgnoreFields(params string[] fieldNames) =>
        Default with { IgnoredFields = fieldNames.ToImmutableHashSet() };

    /// <summary>
    /// Creates options for ordered array comparison.
    /// </summary>
    public static ComparisonOptions Ordered =>
        Default with { ArrayMode = ArrayComparisonMode.Ordered };

    /// <summary>
    /// Creates options for ordered arrays with ignored fields.
    /// </summary>
    public static ComparisonOptions OrderedIgnoreFields(params string[] fieldNames) =>
        Ordered with { IgnoredFields = fieldNames.ToImmutableHashSet() };
}
