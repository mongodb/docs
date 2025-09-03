using System.Collections.Immutable;

namespace Utilities.Comparison;

/// <summary>
/// Main API for validating code example outputs.
/// Provides fluent interface for clean, readable test assertions.
/// </summary>
public static class OutputValidator
{
    /// <summary>
    /// Starts validation of actual output against an expected output file.
    /// </summary>
    /// <param name="actualOutput">The actual output from running a code example</param>
    /// <returns>Fluent validation builder</returns>
    public static ValidationBuilder Expect(object? actualOutput)
    {
        return new ValidationBuilder(actualOutput);
    }

    /// <summary>
    /// Validates that actual output matches expected output from a file.
    /// Uses default comparison options (unordered arrays, no ignored fields).
    /// </summary>
    /// <param name="expectedFilePath">Path to expected output file (relative to examples directory)</param>
    /// <param name="actualOutput">Actual output to validate</param>
    /// <returns>Validation result</returns>
    public static ValidationResult ToMatchFile(string expectedFilePath, object? actualOutput)
    {
        return Expect(actualOutput).ToMatchFile(expectedFilePath);
    }

    /// <summary>
    /// Validates with custom comparison options.
    /// </summary>
    public static ValidationResult ToMatchFile(string expectedFilePath, object? actualOutput, ComparisonOptions options)
    {
        return Expect(actualOutput).ToMatchFile(expectedFilePath, options);
    }
}

/// <summary>
/// Fluent builder for output validation with method chaining.
/// </summary>
public sealed class ValidationBuilder
{
    private readonly object? _actualOutput;

    internal ValidationBuilder(object? actualOutput)
    {
        _actualOutput = actualOutput;
    }

    /// <summary>
    /// Validates against an expected output file with default options.
    /// </summary>
    /// <param name="expectedFilePath">Path to expected output file (relative to examples directory)</param>
    /// <returns>Validation result</returns>
    public ValidationResult ToMatchFile(string expectedFilePath)
    {
        return ToMatchFile(expectedFilePath, ComparisonOptions.Default);
    }

    /// <summary>
    /// Validates against an expected output file with custom options.
    /// </summary>
    /// <param name="expectedFilePath">Path to expected output file (relative to examples directory)</param>
    /// <param name="options">Comparison options</param>
    /// <returns>Validation result</returns>
    public ValidationResult ToMatchFile(string expectedFilePath, ComparisonOptions options)
    {
        try
        {
            var fullPath = ResolveExpectedFilePath(expectedFilePath);
            var parseResult = ExpectedOutputParser.ParseFile(fullPath);

            if (!parseResult.IsSuccess)
            {
                return ValidationResult.Failure($"Failed to parse expected output file: {parseResult.Error}");
            }

            return PerformValidation(parseResult.Data!, options);
        }
        catch (Exception ex)
        {
            return ValidationResult.Failure($"Validation error: {ex.Message}");
        }
    }

    /// <summary>
    /// Validates against expected text content with default options.
    /// </summary>
    /// <param name="expectedText">Expected text content to parse and compare</param>
    /// <returns>Validation result</returns>
    public ValidationResult ToMatchText(string expectedText)
    {
        return ToMatchText(expectedText, ComparisonOptions.Default);
    }

    /// <summary>
    /// Validates against expected text content with custom options.
    /// </summary>
    /// <param name="expectedText">Expected text content to parse and compare</param>
    /// <param name="options">Comparison options</param>
    /// <returns>Validation result</returns>
    public ValidationResult ToMatchText(string expectedText, ComparisonOptions options)
    {
        try
        {
            var expectedData = ExpectedOutputParser.ParseText(expectedText);
            return PerformValidation(expectedData, options);
        }
        catch (Exception ex)
        {
            return ValidationResult.Failure($"Validation error: {ex.Message}");
        }
    }

    /// <summary>
    /// Core validation logic shared between file and text validation.
    /// </summary>
    private ValidationResult PerformValidation(List<object> expectedData, ComparisonOptions options)
    {
        var (normalizedExpected, normalizedActual) = NormalizeForComparison(expectedData, _actualOutput);

        var comparisonOptions = DetermineComparisonOptions(normalizedExpected, options);
        var comparisonResult = ComparisonEngine.Compare(normalizedExpected, normalizedActual, comparisonOptions);

        return comparisonResult.IsSuccess
            ? ValidationResult.Success()
            : ValidationResult.Failure(comparisonResult.Error!.ToString());
    }

    /// <summary>
    /// Determines final comparison options based on global ellipsis detection.
    /// </summary>
    private static ComparisonOptions DetermineComparisonOptions(object normalizedExpected, ComparisonOptions options)
    {
        var hasRootGlobalEllipsis = normalizedExpected is IDictionary<string, object> dict &&
                                   EllipsisPatternMatcher.HasGlobalEllipsis(dict);

        return hasRootGlobalEllipsis
            ? options with { InheritedGlobalEllipsis = true }
            : options;
    }

    /// <summary>
    /// Validates with ignored fields (fluent syntax).
    /// </summary>
    /// <param name="fieldNames">Field names to ignore during comparison</param>
    /// <returns>Builder with ignored fields configured</returns>
    public ValidationBuilderWithOptions IgnoringFields(params string[] fieldNames)
    {
        return new ValidationBuilderWithOptions(_actualOutput,
            ComparisonOptions.Default with { IgnoredFields = fieldNames.ToImmutableHashSet() });
    }

    /// <summary>
    /// Validates with ordered array comparison (fluent syntax).
    /// </summary>
    /// <returns>Builder with ordered comparison configured</returns>
    public ValidationBuilderWithOptions WithOrderedArrays()
    {
        return new ValidationBuilderWithOptions(_actualOutput, ComparisonOptions.Ordered);
    }

    private static string ResolveExpectedFilePath(string expectedFilePath)
    {
        // If absolute path, use as-is
        if (Path.IsPathRooted(expectedFilePath))
            return expectedFilePath;

        // Look for examples directory relative to current directory or test assembly
        var currentDir = Directory.GetCurrentDirectory();
        var possiblePaths = new[]
        {
            Path.Combine(currentDir, "..", "examples", expectedFilePath),
            Path.Combine(currentDir, "examples", expectedFilePath),
            Path.Combine(currentDir, "..", "..", "examples", expectedFilePath),
            expectedFilePath // Fallback to original path
        };

        return possiblePaths.FirstOrDefault(File.Exists) ?? expectedFilePath;
    }

    private static (object Expected, object Actual) NormalizeForComparison(List<object> expectedData, object? actualOutput)
    {
        // If expected has single item and actual is not array, compare as single objects
        if (expectedData.Count == 1 && actualOutput is not IEnumerable<object>)
        {
            return (expectedData[0], actualOutput ?? new object());
        }

        // If expected has single item that is an array and actual is also an array, 
        // unwrap the expected to compare arrays directly
        if (expectedData.Count == 1 &&
            expectedData[0] is IEnumerable<object> expectedArray &&
            actualOutput is IEnumerable<object>)
        {
            return (expectedArray, actualOutput);
        }

        // Otherwise compare as collections
        return (expectedData.ToArray(), actualOutput ?? Array.Empty<object>());
    }
}

/// <summary>
/// Fluent builder with pre-configured options.
/// </summary>
public sealed class ValidationBuilderWithOptions
{
    private readonly object? _actualOutput;
    private readonly ComparisonOptions _options;

    internal ValidationBuilderWithOptions(object? actualOutput, ComparisonOptions options)
    {
        _actualOutput = actualOutput;
        _options = options;
    }

    /// <summary>
    /// Validates against expected output file using configured options.
    /// </summary>
    public ValidationResult ToMatchFile(string expectedFilePath)
    {
        return new ValidationBuilder(_actualOutput).ToMatchFile(expectedFilePath, _options);
    }

    /// <summary>
    /// Validates against expected text content using configured options.
    /// </summary>
    public ValidationResult ToMatchText(string expectedText)
    {
        return new ValidationBuilder(_actualOutput).ToMatchText(expectedText, _options);
    }

    /// <summary>
    /// Adds additional ignored fields to existing configuration.
    /// </summary>
    public ValidationBuilderWithOptions AndIgnoringFields(params string[] additionalFields)
    {
        var existingFields = _options.IgnoredFields ?? ImmutableHashSet<string>.Empty;
        var newFields = existingFields.Union(additionalFields);

        return new ValidationBuilderWithOptions(_actualOutput,
            _options with { IgnoredFields = newFields.ToImmutableHashSet() });
    }

    /// <summary>
    /// Switches to ordered array comparison.
    /// </summary>
    public ValidationBuilderWithOptions WithOrderedArrays()
    {
        return new ValidationBuilderWithOptions(_actualOutput,
            _options with { ArrayMode = ArrayComparisonMode.Ordered });
    }
}

/// <summary>
/// Result of a validation operation.
/// </summary>
public abstract record ValidationResult
{
    public abstract bool IsSuccess { get; }
    public abstract string? ErrorMessage { get; }

    public static ValidationResult Success() => ValidationSuccess.Instance;
    public static ValidationResult Failure(string message) => new ValidationFailure(message);

    /// <summary>
    /// Throws an exception if validation failed (for use in test assertions).
    /// </summary>
    public void ThrowIfFailed()
    {
        if (!IsSuccess)
        {
            throw new ValidationException(ErrorMessage ?? "Validation failed");
        }
    }
}

public sealed record ValidationSuccess : ValidationResult
{
    public override bool IsSuccess => true;
    public override string? ErrorMessage => null;

    public static ValidationSuccess Instance { get; } = new();
}

public sealed record ValidationFailure : ValidationResult
{
    public ValidationFailure(string errorMessage)
    {
        ErrorMessage = errorMessage;
    }

    public override bool IsSuccess => false;
    public override string ErrorMessage { get; }
}

/// <summary>
/// Exception thrown when validation fails.
/// </summary>
public class ValidationException : Exception
{
    public ValidationException(string message) : base(message) { }
    public ValidationException(string message, Exception innerException) : base(message, innerException) { }
}
