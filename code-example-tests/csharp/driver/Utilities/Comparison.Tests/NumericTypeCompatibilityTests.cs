using System.Linq;
using FluentAssertions;
using NUnit.Framework;
using Utilities.Comparison;

namespace Utilities.Comparison.Tests
{
    /// <summary>
    /// Tests for numeric type compatibility in ComparisonEngine.
    /// Addresses critical missing coverage for cross-type numeric comparisons.
    /// </summary>
    [TestFixture]
    public class NumericTypeCompatibilityTests
    {
        /// <summary>
        /// Test cross-type numeric comparisons with parameterized data.
        /// Validates that numbers of different types but same logical value are treated as equal.
        /// </summary>
        [Test]
        [TestCaseSource(nameof(PrecisionTestCases))]
        public void Compare_NumericPrecisionEdgeCases_HandlesCorrectly(object expected, object actual, bool shouldMatch)
        {
            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().Be(shouldMatch,
                $"Comparison of {expected} ({expected?.GetType().Name}) vs {actual} ({actual?.GetType().Name}) " +
                $"should {(shouldMatch ? "succeed" : "fail")}");
        }

        private static readonly object[] PrecisionTestCases =
            TestDataConstants.NumericTypes.PrecisionTestCases
                .Select(tc => new TestCaseData(tc.expected, tc.actual, tc.shouldMatch)
                    .SetName($"{tc.expected?.GetType().Name ?? "null"}_{tc.actual?.GetType().Name ?? "null"}_{tc.shouldMatch}"))
                .ToArray();

        /// <summary>
        /// Test that negative numbers work correctly across different numeric types.
        /// </summary>
        [Test]
        public void Compare_NegativeNumbers_CrossTypeCompatibility()
        {
            var result1 = ComparisonEngine.Compare(-42, -42.0);
            result1.IsSuccess.Should().BeTrue("Negative int vs double should match");

            var result2 = ComparisonEngine.Compare(-42.5f, -42.5);
            result2.IsSuccess.Should().BeTrue("Negative float vs double should match");

            var result3 = ComparisonEngine.Compare(-100, -99);
            result3.IsSuccess.Should().BeFalse("Different negative values should not match");
        }

        /// <summary>
        /// Test that same numeric values but different types are properly handled.
        /// </summary>
        [Test]
        public void Compare_SameValueDifferentNumericTypes_ReturnsSuccess()
        {
            var testCases = new (object, object)[]
            {
                (100, 100.0),     // int vs double
                (100L, 100),      // long vs int  
                (100m, 100),      // decimal vs int
                (100.0f, 100.0)   // float vs double
            };

            foreach ((object expected, object actual) in testCases)
            {
                var result = ComparisonEngine.Compare(expected, actual);
                result.IsSuccess.Should().BeTrue(
                    $"Same value comparison {expected} vs {actual} should succeed");
            }
        }

        /// <summary>
        /// Test edge cases with large numbers that won't cause overflow exceptions.
        /// </summary>
        [Test]
        public void Compare_VeryLargeNumbers_HandlesCorrectly()
        {
            // Test edge cases with large numbers that won't cause overflow exceptions
            var result1 = ComparisonEngine.Compare(long.MaxValue, int.MaxValue);
            result1.IsSuccess.Should().BeFalse("Very different values should not match");

            var result2 = ComparisonEngine.Compare(int.MaxValue, (long)int.MaxValue);
            result2.IsSuccess.Should().BeTrue("Same value with different types should match");

            var result3 = ComparisonEngine.Compare(1e10, (decimal)1e10);
            result3.IsSuccess.Should().BeTrue("Large numbers within decimal range should work");

            var result4 = ComparisonEngine.Compare(999999999L, 999999999.0);
            result4.IsSuccess.Should().BeTrue("Cross-type large number comparison should work");
        }

        /// <summary>
        /// Test zero values across different numeric types (important edge case).
        /// </summary>
        [Test]
        public void Compare_ZeroValues_CrossTypeCompatibility()
        {
            // Test zero values across different numeric types (important edge case)
            var zeroValues = new object[] { 0, 0L, 0.0, 0.0f, 0m };

            for (int i = 0; i < zeroValues.Length; i++)
            {
                for (int j = 0; j < zeroValues.Length; j++)
                {
                    var result = ComparisonEngine.Compare(zeroValues[i], zeroValues[j]);
                    result.IsSuccess.Should().BeTrue(
                        $"Zero values {zeroValues[i]} ({zeroValues[i].GetType().Name}) and " +
                        $"{zeroValues[j]} ({zeroValues[j].GetType().Name}) should be considered equal");
                }
            }
        }

        /// <summary>
        /// Test floating point precision edge cases.
        /// </summary>
        [Test]
        public void Compare_FloatingPointPrecisionEdgeCases_HandledCorrectly()
        {
            // Test floating point precision edge cases that won't cause overflow
            var cases = new (object expected, object actual, bool shouldMatch)[]
            {
                (0.1 + 0.2, 0.3, true),            // Classic floating point precision issue - should be handled
                (1.0f / 3.0f * 3.0f, 1.0f, true), // Float precision round-trip  
                (1e-10, 0.0, false),               // Very small vs zero - should be different 
                (1.0, 1.0000000000001, false)      // Very small precision difference
            };

            foreach ((object expected, object actual, bool shouldMatch) in cases)
            {
                var result = ComparisonEngine.Compare(expected, actual);
                result.IsSuccess.Should().Be(shouldMatch,
                    $"Floating point comparison {expected} vs {actual} should {(shouldMatch ? "succeed" : "fail")}");
            }
        }
    }
}
