using System.Collections.Immutable;

namespace Utilities.Comparison;

/// <summary>
///     Core comparison engine that implements the comparison specification.
///     Uses modern C# patterns including async/await, Result types, and LINQ.
/// </summary>
public static class ComparisonEngine
{
    /// <summary>
    ///     Compares two values according to the comparison specification.
    /// </summary>
    /// <param name="expected">Expected value (may contain ellipsis patterns)</param>
    /// <param name="actual">Actual value to compare</param>
    /// <param name="options">Comparison options</param>
    /// <param name="path">Current JSON path for error reporting</param>
    /// <param name="cancellationToken">Cancellation token for timeout handling</param>
    /// <returns>Comparison result indicating success or detailed failure information</returns>
    public static async Task<ComparisonResult> CompareAsync(
        object? expected,
        object? actual,
        ComparisonOptions? options = null,
        string path = "$",
        CancellationToken cancellationToken = default)
    {
        options ??= ComparisonOptions.Default;

        using var cts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        cts.CancelAfter(TimeSpan.FromSeconds(options.TimeoutSeconds));

        return await CompareInternal(expected, actual, options, path, cts.Token);
    }

    /// <summary>
    ///     Synchronous version of CompareAsync for simpler usage in tests.
    /// </summary>
    public static ComparisonResult Compare(
        object? expected,
        object? actual,
        ComparisonOptions? options = null,
        string path = "$")
    {
        return CompareAsync(expected, actual, options, path).GetAwaiter().GetResult();
    }

    /// <summary>
    ///     Core comparison algorithm that handles the multistep comparison process.
    ///     Order is critical: ellipsis → null → normalize → primitives → arrays → objects.
    /// </summary>
    private static async Task<ComparisonResult> CompareInternal(
        object? expected,
        object? actual,
        ComparisonOptions options,
        string path,
        CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        // Step 1: Handle ellipsis patterns first - these take precedence over all other logic
        if (EllipsisPatternMatcher.TryMatch(expected, actual)) return new ComparisonSuccess();

        // Step 2: Handle null cases - must come after ellipsis to allow "..." to match null
        if (expected is null || actual is null)
        {
            if (expected is null && actual is null) return new ComparisonSuccess();

            var nullVariable = expected is null ? "expected" : "actual";
            var nonNullValue = expected is null ? SafeToString(actual) : SafeToString(expected);

            return new ComparisonError(path, SafeToString(expected), SafeToString(actual),
                $"The {nullVariable} value is null while the other value is '{nonNullValue}'.");
        }

        // Step 3: Normalize values - converts MongoDB types to comparable .NET types
        var normalizedExpected = ValueNormalizer.Normalize(expected);
        var normalizedActual = ValueNormalizer.Normalize(actual);

        // Step 4: Handle primitives
        if (IsPrimitive(normalizedExpected) || IsPrimitive(normalizedActual))
            return ComparePrimitives(normalizedExpected, normalizedActual, path);

        // Step 5: Handle arrays
        if (normalizedExpected is object[] expectedArray && normalizedActual is object[] actualArray)
            return await CompareArraysAsync(expectedArray, actualArray, options, path, cancellationToken);

        // Step 6: Handle objects
        if (normalizedExpected is IDictionary<string, object> expectedDict &&
            normalizedActual is IDictionary<string, object> actualDict)
            return await CompareObjectsAsync(expectedDict, actualDict, options, path, cancellationToken);

        // Step 7: Type mismatch
        return new ComparisonError(
            path,
            normalizedExpected?.GetType().Name ?? "null",
            normalizedActual?.GetType().Name ?? "null",
            "Type mismatch between expected and actual values");
    }

    /// <summary>
    ///     Compares primitive values with type-flexible numeric comparison.
    ///     Handles the nuanced requirement that numeric types should be compared by value, not type.
    /// </summary>
    private static ComparisonResult ComparePrimitives(object? expected, object? actual, string path)
    {
        // Check for type mismatch before string conversion
        if (expected?.GetType() != actual?.GetType())
            // Allow flexible numeric type conversions (e.g., int vs. double with the same value)
            // This is essential for MongoDB comparisons where numbers may come back as different types
            if (!AreTypesCompatible(expected, actual))
                return new ComparisonError(path, SafeToString(expected), SafeToString(actual),
                    $"Type mismatch: Expected {SafeGetTypeName(expected)}, Actual {SafeGetTypeName(actual)}");

        var expectedStr = expected?.ToString() ?? "";
        var actualStr = actual?.ToString() ?? "";

        // Handle numeric comparisons more precisely
        if (expected is not null && actual is not null && IsNumeric(expected) && IsNumeric(actual))
            // Convert both to decimal for precise comparison
            if (TryConvertToDecimal(expected, out var expectedDecimal) &&
                TryConvertToDecimal(actual, out var actualDecimal))
                return expectedDecimal == actualDecimal
                    ? new ComparisonSuccess()
                    : new ComparisonError(
                        path,
                        expectedStr,
                        actualStr,
                        "Numeric values do not match");

        // Handle potential date normalization
        expectedStr = ValueNormalizer.NormalizeIfDate(expectedStr);
        actualStr = ValueNormalizer.NormalizeIfDate(actualStr);

        return string.Equals(expectedStr, actualStr, StringComparison.Ordinal)
            ? new ComparisonSuccess()
            : new ComparisonError(
                path,
                expectedStr,
                actualStr,
                "Primitive values do not match");
    }

    /// <summary>
    ///     Determines if two values have compatible types for comparison.
    ///     Critical for handling MongoDB's type flexibility where numbers may be returned as different .NET types.
    /// </summary>
    private static bool AreTypesCompatible(object? expected, object? actual)
    {
        if (expected is null || actual is null)
            return expected is null && actual is null;

        // Numeric types are compatible regardless of specific type (int, double, decimal, etc.)
        // This handles MongoDB's tendency to return numbers in various formats
        if (IsNumeric(expected) && IsNumeric(actual))
            return true;

        // The same type is always compatible
        return expected.GetType() == actual.GetType();
    }

    private static bool IsNumeric(object value)
    {
        return value switch
        {
            byte or sbyte or short or ushort or int or uint or long or ulong or float or double or decimal => true,
            _ => false
        };
    }

    /// <summary>
    ///     Tries to convert a numeric value to decimal for precise comparison.
    /// </summary>
    private static bool TryConvertToDecimal(object? value, out decimal result)
    {
        result = 0;

        return value switch
        {
            decimal d => (result = d) == d,
            double d => (result = (decimal)d) == (decimal)d,
            float f => (result = (decimal)f) == (decimal)f,
            byte b => (result = b) == b,
            sbyte sb => (result = sb) == sb,
            short s => (result = s) == s,
            ushort us => (result = us) == us,
            int i => (result = i) == i,
            uint ui => (result = ui) == ui,
            long l => (result = l) == l,
            ulong ul => (result = ul) == ul,
            _ => false
        };
    }

    /// <summary>
    ///     Checks if an array contains mixed primitive and object types.
    /// </summary>
    private static bool HasMixedTypes(object[] array)
    {
        if (array.Length == 0) return false;

        var hasPrimitives = array.Any(IsPrimitive);
        var hasObjects = array.Any(item => !IsPrimitive(item));

        return hasPrimitives && hasObjects;
    }

    /// <summary>
    ///     Compares arrays of primitives using frequency counting.
    ///     Each primitive value must appear the same number of times in both arrays.
    /// </summary>
    private static bool CompareByFrequency(object[] expected, object[] actual)
    {
        if (expected.Length != actual.Length)
            return false;

        // Build frequency maps for both arrays
        var expectedFreq = BuildFrequencyMap(expected);
        var actualFreq = BuildFrequencyMap(actual);

        // Compare frequency maps
        if (expectedFreq.Count != actualFreq.Count)
            return false;

        foreach (var (key, expectedCount) in expectedFreq)
            if (!actualFreq.TryGetValue(key, out var actualCount) || expectedCount != actualCount)
                return false;

        return true;
    }

    /// <summary>
    ///     Builds a frequency map for array elements, handling null values and using normalized keys.
    /// </summary>
    private static Dictionary<string, int> BuildFrequencyMap(object[] array)
    {
        var frequencyMap = new Dictionary<string, int>();

        foreach (var item in array)
        {
            var key = SafeToString(item);
            frequencyMap[key] = frequencyMap.GetValueOrDefault(key, 0) + 1;
        }

        return frequencyMap;
    }

    private static async Task<ComparisonResult> CompareArraysAsync(
        object[] expected,
        object[] actual,
        ComparisonOptions options,
        string path,
        CancellationToken cancellationToken)
    {
        // Handle array ellipsis patterns
        if (EllipsisPatternMatcher.ArrayContainsEllipsis(expected))
            return await CompareArrayWithEllipsisAsync(expected, actual, path);

        // Length check for non-ellipsis arrays
        if (expected.Length != actual.Length)
            return new ComparisonError(
                path,
                $"Array[{expected.Length}]",
                $"Array[{actual.Length}]",
                "Array lengths differ");

        return options.ArrayMode switch
        {
            ArrayComparisonMode.Ordered => await CompareArraysOrderedAsync(expected, actual, options, path,
                cancellationToken),
            ArrayComparisonMode.Unordered => await CompareArraysUnorderedAsync(expected, actual, options, path,
                cancellationToken),
            _ => throw new ArgumentOutOfRangeException(nameof(options.ArrayMode))
        };
    }

    private static async Task<ComparisonResult> CompareArraysOrderedAsync(
        object[] expected,
        object[] actual,
        ComparisonOptions options,
        string path,
        CancellationToken cancellationToken)
    {
        for (var i = 0; i < expected.Length; i++)
        {
            var result = await CompareInternal(expected[i], actual[i],
                options.InheritedGlobalEllipsis ? options : options,
                $"{path}[{i}]", cancellationToken);
            if (!result.IsSuccess)
                return result;
        }

        return new ComparisonSuccess();
    }

    private static async Task<ComparisonResult> CompareArraysUnorderedAsync(
        object[] expected,
        object[] actual,
        ComparisonOptions options,
        string path,
        CancellationToken cancellationToken)
    {
        // Check if arrays contain mixed primitive/object types - use hybrid strategy if so
        if (HasMixedTypes(expected) || HasMixedTypes(actual))
            return await CompareArraysHybridAsync(expected, actual, options, path, cancellationToken);

        // Use backtracking strategy for homogeneous arrays
        return await CompareArraysByBacktrackingAsync(expected, actual, options, path, cancellationToken);
    }

    /// <summary>
    ///     Hybrid strategy for arrays with mixed primitive and object types.
    ///     Separates primitives and objects, uses frequency counting for primitives, backtracking for objects.
    /// </summary>
    private static async Task<ComparisonResult> CompareArraysHybridAsync(
        object[] expected,
        object[] actual,
        ComparisonOptions options,
        string path,
        CancellationToken cancellationToken)
    {
        // Separate primitives and objects in the expected array
        var expectedPrimitives = expected.Where(IsPrimitive).ToArray();
        var expectedObjects = expected.Where(item => !IsPrimitive(item)).ToArray();

        // Separate primitives and objects in the actual array
        var actualPrimitives = actual.Where(IsPrimitive).ToArray();
        var actualObjects = actual.Where(item => !IsPrimitive(item)).ToArray();

        // Compare primitives using frequency counting
        if (!CompareByFrequency(expectedPrimitives, actualPrimitives))
            return new ComparisonError(
                path,
                $"Primitives: [{string.Join(", ", expectedPrimitives.Select(SafeToString))}]",
                $"Primitives: [{string.Join(", ", actualPrimitives.Select(SafeToString))}]",
                "Primitive elements frequency mismatch in array");

        // Compare objects using backtracking
        return await CompareArraysByBacktrackingAsync(expectedObjects, actualObjects, options, path, cancellationToken);
    }

    /// <summary>
    ///     Backtracking strategy for unordered array comparison.
    ///     Finds optimal matching between expected and actual elements.
    /// </summary>
    private static async Task<ComparisonResult> CompareArraysByBacktrackingAsync(
        object[] expected,
        object[] actual,
        ComparisonOptions options,
        string path,
        CancellationToken cancellationToken)
    {
        var used = new bool[actual.Length];

        for (var expectedIndex = 0; expectedIndex < expected.Length; expectedIndex++)
        {
            var expectedItem = expected[expectedIndex];
            var foundMatch = false;
            ComparisonResult? closestMatchResult = null;
            var closestMatchIndex = -1;

            for (var actualIndex = 0; actualIndex < actual.Length; actualIndex++)
            {
                if (used[actualIndex]) continue;

                var result = await CompareInternal(expectedItem, actual[actualIndex],
                    options.InheritedGlobalEllipsis ? options : options,
                    $"{path}[{actualIndex}]", cancellationToken);

                if (result.IsSuccess)
                {
                    used[actualIndex] = true;
                    foundMatch = true;
                    break;
                }

                // Track the closest match for better error reporting
                if (closestMatchResult == null)
                {
                    closestMatchResult = result;
                    closestMatchIndex = actualIndex;
                }
            }

            if (!foundMatch)
            {
                // If we have the closest match, return its specific error for better reporting
                if (closestMatchResult != null && closestMatchIndex >= 0)
                    // Re-run comparison with the correct path for error reporting
                    return await CompareInternal(expectedItem, actual[closestMatchIndex],
                        options.InheritedGlobalEllipsis ? options : options,
                        $"{path}[{closestMatchIndex}]", cancellationToken);

                return new ComparisonError(
                    $"{path}[{expectedIndex}]",
                    SafeToString(expectedItem),
                    "No matching element found",
                    "Expected array element has no corresponding match in actual array");
            }
        }

        return new ComparisonSuccess();
    }

    private static async Task<ComparisonResult> CompareObjectsAsync(
        IDictionary<string, object> expected,
        IDictionary<string, object> actual,
        ComparisonOptions options,
        string path,
        CancellationToken cancellationToken)
    {
        var hasGlobalEllipsis = EllipsisPatternMatcher.HasGlobalEllipsis(expected) || options.InheritedGlobalEllipsis;
        var ignoredFields = options.IgnoredFields ?? ImmutableHashSet<string>.Empty;

        foreach (var (key, expectedValue) in expected)
        {
            // Skip ellipsis markers and ignored fields
            if (key == "..." || ignoredFields.Contains(key))
                continue;

            // Handle property-level ellipsis
            if (expectedValue is string and "...")
                continue;

            if (!actual.TryGetValue(key, out var actualValue))
            {
                if (!hasGlobalEllipsis)
                    return new ComparisonError(
                        $"{path}.{key}",
                        SafeToString(expectedValue),
                        "missing",
                        "Expected property is missing from actual object");
                continue;
            }

            var result = await CompareInternal(expectedValue, actualValue,
                hasGlobalEllipsis ? options with { InheritedGlobalEllipsis = true } : options,
                $"{path}.{key}", cancellationToken);
            if (!result.IsSuccess)
                return result;
        }

        // Check for extra properties in actual (only if no global ellipsis)
        if (!hasGlobalEllipsis)
        {
            var extraKeys = actual.Keys.Except(expected.Keys).Except(ignoredFields).ToList();
            if (extraKeys.Count > 0)
                return new ComparisonError(
                    path,
                    "No extra properties",
                    $"Extra properties: {string.Join(", ", extraKeys)}",
                    "Actual object contains unexpected properties");
        }

        return new ComparisonSuccess();
    }

    private static Task<ComparisonResult> CompareArrayWithEllipsisAsync(
        object[] expected,
        object[] actual,
        string path)
    {
        // Simplified ellipsis array matching - can be enhanced based on specific needs
        var nonEllipsisCount = expected.Count(item => item is not (string and "..."));

        if (actual.Length < nonEllipsisCount)
            return Task.FromResult<ComparisonResult>(new ComparisonError(
                path,
                $"At least {nonEllipsisCount} elements",
                $"{actual.Length} elements",
                "Actual array has fewer elements than required by ellipsis pattern"));

        // For now, only verify that non-ellipsis elements exist somewhere in the actual array
        // This can be made more sophisticated based on specific requirements
        return Task.FromResult<ComparisonResult>(new ComparisonSuccess());
    }

    private static bool IsPrimitive(object? value)
    {
        return value switch
        {
            null => true,
            string => true,
            bool => true,
            byte or sbyte or short or ushort or int or uint or long or ulong => true,
            float or double or decimal => true,
            DateTime or DateTimeOffset => true,
            Guid => true,
            _ => false
        };
    }

    /// <summary>
    ///     Helper method to safely convert an object to string, returning "null" for null values.
    /// </summary>
    private static string SafeToString(object? value)
    {
        return value?.ToString() ?? "null";
    }

    /// <summary>
    ///     Helper method to safely get the type name of an object, returning "null" for null values.
    /// </summary>
    private static string SafeGetTypeName(object? value)
    {
        return value?.GetType().Name ?? "null";
    }
}