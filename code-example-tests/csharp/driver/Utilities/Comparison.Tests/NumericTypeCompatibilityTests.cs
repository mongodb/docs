using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Tests for numeric type compatibility in ComparisonEngine.
///     Addresses critical missing coverage for cross-type numeric comparisons.
/// </summary>
[TestFixture]
public class NumericTypeCompatibilityTests
{
    private static readonly object[] PrecisionTestCases =
        TestDataConstants.NumericTypes.PrecisionTestCases
            .Select(tc => new TestCaseData(tc.expected, tc.actual, tc.shouldMatch)
                .SetName(
                    $"{tc.expected?.GetType().Name ?? "null"}_{tc.actual?.GetType().Name ?? "null"}_{tc.shouldMatch}"))
            .ToArray();

    /// <summary>
    ///     Test that negative numbers work correctly across different numeric types.
    /// </summary>
    [Test]
    public void Compare_NegativeNumbers_CrossTypeCompatibility()
    {
        Expect.That(-42).ShouldMatch(-42.0);

        Expect.That(-42.5f).ShouldMatch(-42.5);

        Expect.That(-100).ShouldNotMatch(-99);
    }

    /// <summary>
    ///     Test that same numeric values but different types are properly handled.
    /// </summary>
    [Test]
    public void Compare_SameValueDifferentNumericTypes_ReturnsSuccess()
    {
        var testCases = new (object, object)[]
        {
            (100, 100.0), // int vs double
            (100L, 100), // long vs int  
            (100m, 100), // decimal vs int
            (100.0f, 100.0) // float vs double
        };

        foreach (var (expected, actual) in testCases)
        {
            var result = Expect.That(expected).ShouldMatch(actual);
            Assert.That(result.IsSuccess, Is.True);
        }
    }

    /// <summary>
    ///     Test edge cases with large numbers that won't cause overflow exceptions.
    /// </summary>
    [Test]
    public void Compare_VeryLargeNumbers_HandlesCorrectly()
    {
        // Test edge cases with large numbers that won't cause overflow exceptions
        Expect.That(long.MaxValue).ShouldNotMatch(int.MaxValue);

        Expect.That(int.MaxValue).ShouldMatch((long)int.MaxValue);

        Expect.That(1e10).ShouldMatch((decimal)1e10);

        Expect.That(999999999L).ShouldMatch(999999999.0);
    }

    /// <summary>
    ///     Test zero values across different numeric types (important edge case).
    /// </summary>
    [Test]
    public void Compare_ZeroValues_CrossTypeCompatibility()
    {
        // Test zero values across different numeric types (important edge case)
        var zeroValues = new object[] { 0, 0L, 0.0, 0.0f, 0m };

        for (var i = 0; i < zeroValues.Length; i++)
        {
            for (var j = 0; j < zeroValues.Length; j++)
            {
                Expect.That(zeroValues[j]).ShouldMatch(zeroValues[j]);
            }
        }
    }

    /// <summary>
    ///     Test floating point precision edge cases.
    /// </summary>
    [Test]
    public void Compare_FloatingPointPrecisionEdgeCases_HandledCorrectly()
    {
        // Test floating point precision edge cases that won't cause overflow
        var validCases = new (object expected, object actual)[]
        {
            (0.1 + 0.2, 0.3), // Classic floating point precision issue - should be handled
            (1.0f / 3.0f * 3.0f, 1.0f), // Float precision round-trip  
            
        };
        var failCases = new (object expected, object actual)[]
        {
            (1e-10, 0.0), // Very small vs zero - should be different 
            (1.0, 1.0000000000001) // Very small precision difference
        };

        foreach (var (expected, actual) in validCases)
        {
            Expect.That(actual).ShouldMatch(expected);
        }
        foreach (var (expected, actual) in failCases)
        {
            Expect.That(actual).ShouldNotMatch(expected);
        }
    }
}