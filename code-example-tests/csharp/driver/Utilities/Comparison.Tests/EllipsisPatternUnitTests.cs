using FluentAssertions;
using NUnit.Framework;
using Utilities.Comparison;

namespace Utilities.Comparison.Tests;

/// <summary>
/// Unit tests for individual ellipsis pattern classes.
/// Tests each pattern implementation in isolation to ensure correct behavior.
/// </summary>
[TestFixture]
public class EllipsisPatternUnitTests
{
    [TestFixture]
    public class ExactEllipsisPatternTests
    {
        [Test]
        public void Matches_ExactEllipsisString_ReturnsTrue()
        {
            // Act & Assert
            ExactEllipsisPattern.Matches("...", "anything").Should().BeTrue();
            ExactEllipsisPattern.Matches("...", null).Should().BeTrue();
            ExactEllipsisPattern.Matches("...", 123).Should().BeTrue();
            ExactEllipsisPattern.Matches("...", new { name = "test" }).Should().BeTrue();
        }

        [Test]
        public void Matches_NonEllipsisString_ReturnsFalse()
        {
            // Act & Assert
            ExactEllipsisPattern.Matches("not ellipsis", "anything").Should().BeFalse();
            ExactEllipsisPattern.Matches("..extra", "anything").Should().BeFalse();
            ExactEllipsisPattern.Matches("", "anything").Should().BeFalse();
        }

        [Test]
        public void Matches_NonStringExpected_ReturnsFalse()
        {
            // Act & Assert
            ExactEllipsisPattern.Matches(123, "anything").Should().BeFalse();
            ExactEllipsisPattern.Matches(null, "anything").Should().BeFalse();
            ExactEllipsisPattern.Matches(new object(), "anything").Should().BeFalse();
        }

        [Test]
        public void Priority_ReturnsHighestPriority()
        {
            // Act & Assert
            ExactEllipsisPattern.Priority.Should().Be(100);
        }
    }

    [TestFixture]
    public class TruncatedStringPatternTests
    {
        [Test]
        public void Matches_TruncatedString_WithMatchingPrefix_ReturnsTrue()
        {
            // Act & Assert
            TruncatedStringPattern.Matches("Hello...", "Hello World").Should().BeTrue();
            TruncatedStringPattern.Matches("Error: Connection failed...", "Error: Connection failed after 3 retries").Should().BeTrue();
            TruncatedStringPattern.Matches("MongoDB...", "MongoDB is awesome").Should().BeTrue();
        }

        [Test]
        public void Matches_TruncatedString_WithNonMatchingPrefix_ReturnsFalse()
        {
            // Act & Assert
            TruncatedStringPattern.Matches("Hello...", "Hi World").Should().BeFalse();
            TruncatedStringPattern.Matches("Error...", "Warning: Something happened").Should().BeFalse();
        }

        [Test]
        public void Matches_TruncatedString_WithNonStringActual_ReturnsFalse()
        {
            // Act & Assert
            TruncatedStringPattern.Matches("Hello...", 123).Should().BeFalse();
            TruncatedStringPattern.Matches("Hello...", null).Should().BeFalse();
            TruncatedStringPattern.Matches("Hello...", new object()).Should().BeFalse();
        }

        [Test]
        public void Matches_NonTruncatedString_ReturnsFalse()
        {
            // Act & Assert
            TruncatedStringPattern.Matches("Hello", "Hello").Should().BeFalse();
            TruncatedStringPattern.Matches("...", "anything").Should().BeFalse(); // This is handled by ExactEllipsisPattern
        }

        [Test]
        public void Matches_TooShortTruncatedString_ReturnsFalse()
        {
            // Arrange - string with only "..." (length 3)
            // Act & Assert
            TruncatedStringPattern.Matches("...", "anything").Should().BeFalse();
        }

        [Test]
        public void Priority_ReturnsCorrectPriority()
        {
            // Act & Assert
            TruncatedStringPattern.Priority.Should().Be(90);
        }
    }

    [TestFixture]
    public class JsonEllipsisPatternTests
    {
        [Test]
        public void Priority_ReturnsCorrectPriority()
        {
            // Act & Assert
            JsonEllipsisPattern.Priority.Should().Be(80);
        }

        [Test]
        public void Matches_NonStringExpected_ReturnsFalse()
        {
            // Act & Assert
            JsonEllipsisPattern.Matches(123, "{}").Should().BeFalse();
            JsonEllipsisPattern.Matches(null, "{}").Should().BeFalse();
            JsonEllipsisPattern.Matches(new object(), "{}").Should().BeFalse();
        }

        [Test]
        public void Matches_NonStringActual_ReturnsFalse()
        {
            // Act & Assert
            JsonEllipsisPattern.Matches("{...}", 123).Should().BeFalse();
            JsonEllipsisPattern.Matches("{...}", null).Should().BeFalse();
            JsonEllipsisPattern.Matches("{...}", new object()).Should().BeFalse();
        }

        [Test]
        public void Matches_StringWithoutEllipsis_ReturnsFalse()
        {
            // Act & Assert
            JsonEllipsisPattern.Matches("""{"field": "value"}""", """{"field": "value"}""").Should().BeFalse();
            JsonEllipsisPattern.Matches("regular string", "another string").Should().BeFalse();
        }
    }

    [TestFixture]
    public class ArrayWildcardPatternTests
    {
        [Test]
        public void Matches_ArrayWildcard_WithArray_ReturnsTrue()
        {
            // Arrange
            var expectedArray = new object[] { "..." };
            var actualArray = new[] { "item1", "item2", "item3" };

            // Act & Assert
            ArrayWildcardPattern.Matches(expectedArray, actualArray).Should().BeTrue();
        }

        [Test]
        public void Matches_ArrayWildcard_WithEmptyArray_ReturnsTrue()
        {
            // Arrange
            var expectedArray = new object[] { "..." };
            var actualArray = Array.Empty<object>();

            // Act & Assert
            ArrayWildcardPattern.Matches(expectedArray, actualArray).Should().BeTrue();
        }

        [Test]
        public void Matches_ArrayWildcard_WithNonArray_ReturnsFalse()
        {
            // Arrange
            var expectedArray = new object[] { "..." };

            // Act & Assert
            ArrayWildcardPattern.Matches(expectedArray, "not an array").Should().BeFalse();
            ArrayWildcardPattern.Matches(expectedArray, 123).Should().BeFalse();
            ArrayWildcardPattern.Matches(expectedArray, null).Should().BeFalse();
        }

        [Test]
        public void Matches_NonWildcardArray_ReturnsFalse()
        {
            // Arrange
            var expectedArray = new object[] { "item1", "item2" };
            var actualArray = new[] { "item1", "item2" };

            // Act & Assert
            ArrayWildcardPattern.Matches(expectedArray, actualArray).Should().BeFalse();
        }

        [Test]
        public void Matches_MultiElementArrayWithEllipsis_ReturnsFalse()
        {
            // Arrange - this should not match array wildcard (handled differently)
            var expectedArray = new object[] { "item1", "...", "item3" };
            var actualArray = new[] { "item1", "item2", "item3" };

            // Act & Assert
            ArrayWildcardPattern.Matches(expectedArray, actualArray).Should().BeFalse();
        }

        [Test]
        public void Priority_ReturnsCorrectPriority()
        {
            // Act & Assert
            ArrayWildcardPattern.Priority.Should().Be(95);
        }
    }

    [TestFixture]
    public class ObjectWildcardPatternTests
    {
        [Test]
        public void Matches_ObjectWildcard_WithObject_ReturnsTrue()
        {
            // Arrange
            var expectedDict = new Dictionary<string, object> { { "...", "..." } };
            var actualDict = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };

            // Act & Assert
            ObjectWildcardPattern.Matches(expectedDict, actualDict).Should().BeTrue();
        }

        [Test]
        public void Matches_ObjectWildcard_WithEmptyObject_ReturnsTrue()
        {
            // Arrange
            var expectedDict = new Dictionary<string, object> { { "...", "..." } };
            var actualDict = new Dictionary<string, object>();

            // Act & Assert
            ObjectWildcardPattern.Matches(expectedDict, actualDict).Should().BeTrue();
        }

        [Test]
        public void Matches_ObjectWildcard_WithNonObject_ReturnsFalse()
        {
            // Arrange
            var expectedDict = new Dictionary<string, object> { { "...", "..." } };

            // Act & Assert
            ObjectWildcardPattern.Matches(expectedDict, "not an object").Should().BeFalse();
            ObjectWildcardPattern.Matches(expectedDict, 123).Should().BeFalse();
            ObjectWildcardPattern.Matches(expectedDict, null).Should().BeFalse();
            ObjectWildcardPattern.Matches(expectedDict, new[] { "array" }).Should().BeFalse();
        }

        [Test]
        public void Matches_NonWildcardObject_ReturnsFalse()
        {
            // Arrange
            var expectedDict = new Dictionary<string, object> { { "name", "Alice" } };
            var actualDict = new Dictionary<string, object> { { "name", "Alice" } };

            // Act & Assert
            ObjectWildcardPattern.Matches(expectedDict, actualDict).Should().BeFalse();
        }

        [Test]
        public void Matches_MultiPropertyObjectWithEllipsis_ReturnsFalse()
        {
            // Arrange - this should not match object wildcard
            var expectedDict = new Dictionary<string, object> { { "name", "Alice" }, { "...", "..." } };
            var actualDict = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };

            // Act & Assert
            ObjectWildcardPattern.Matches(expectedDict, actualDict).Should().BeFalse();
        }

        [Test]
        public void Matches_EllipsisKeyWithWrongValue_ReturnsFalse()
        {
            // Arrange
            var expectedDict = new Dictionary<string, object> { { "...", "not ellipsis" } };
            var actualDict = new Dictionary<string, object> { { "name", "Alice" } };

            // Act & Assert
            ObjectWildcardPattern.Matches(expectedDict, actualDict).Should().BeFalse();
        }

        [Test]
        public void Priority_ReturnsCorrectPriority()
        {
            // Act & Assert
            ObjectWildcardPattern.Priority.Should().Be(95);
        }
    }
}
