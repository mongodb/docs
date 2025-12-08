using System.Collections.Immutable;

namespace Utilities;

/// <summary>
///     Defines how arrays should be compared during validation.
/// </summary>
public enum ArrayComparisonMode
{
    /// <summary>
    ///     Arrays must have identical elements in the same order.
    /// </summary>
    Ordered,

    /// <summary>
    ///     Arrays must have identical elements but order doesn't matter.
    /// </summary>
    Unordered
}

/// <summary>
///     Configuration options for example output comparison.
///     Immutable record type following modern C# patterns.
/// </summary>
/// <param name="ArrayMode">How to compare arrays (default: Unordered)</param>
/// <param name="IgnoredFields">Field names whose values should be ignored during comparison (case-sensitive)</param>
/// <param name="TimeoutSeconds">Maximum time to spend on comparison operations</param>
/// <param name="InheritedGlobalEllipsis">Whether global ellipsis from parent should apply (internal use)</param>
public record ComparisonOptions
{
    public ArrayComparisonMode ArrayMode { get; set; } = ArrayComparisonMode.Unordered;
    public List<string>? IgnoredFields { get; set; } = new List<string>();
    public int TimeoutSeconds { get; set; } = 30;
    public bool InheritedGlobalEllipsis { get; set; } = false;

    /// <summary>
    ///     Default comparison options with unordered array comparison.
    /// </summary>
    public static ComparisonOptions Default { get; } = new();

    /// <summary>
    ///     Creates options for ordered array comparison.
    /// </summary>
    public static ComparisonOptions Ordered =>
        Default with { ArrayMode = ArrayComparisonMode.Ordered };

    /// <summary>
    ///     Creates options for ordered array comparison.
    /// </summary>
    public static ComparisonOptions Unordered =>
        Default with { ArrayMode = ArrayComparisonMode.Unordered };


    /// <summary>
    ///     Creates options with specific ignored fields.
    /// </summary>
    public static ComparisonOptions IgnoreFields(params string[] fieldNames)
    {
        return Default with { IgnoredFields = fieldNames.ToList() };
    }

}