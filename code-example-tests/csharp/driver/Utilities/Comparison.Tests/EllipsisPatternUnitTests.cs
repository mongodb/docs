using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Unit tests for individual ellipsis pattern classes.
///     Tests each pattern implementation in isolation to ensure correct behavior.
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
            Assert.That(ExactEllipsisPattern.Matches("...", "anything") == true);
            Assert.That(ExactEllipsisPattern.Matches("...", null) == true);
            Assert.That(ExactEllipsisPattern.Matches("...", 123) == true);
            Assert.That(ExactEllipsisPattern.Matches("...", new { name = "test" }) == true);
        }

        [Test]
        public void Matches_NonEllipsisString_ReturnsFalse()
        {
            Assert.That(ExactEllipsisPattern.Matches("not ellipsis", "anything") == false);
            Assert.That(ExactEllipsisPattern.Matches("..extra", "anything") == false);
            Assert.That(ExactEllipsisPattern.Matches("", "anything") == false);
        }

        [Test]
        public void Matches_NonStringExpected_ReturnsFalse()
        {
            Assert.That(ExactEllipsisPattern.Matches(123, "anything") == false);
            Assert.That(ExactEllipsisPattern.Matches(null, "anything") == false);
            Assert.That(ExactEllipsisPattern.Matches(new object(), "anything") == false);
        }

        [Test]
        public void Priority_ReturnsHighestPriority()
        {
            Assert.That(ExactEllipsisPattern.Priority == 100); ;
        }
    }

    [TestFixture]
    public class TruncatedStringPatternTests
    {
        [Test]
        public void Matches_TruncatedString_WithMatchingPrefix_ReturnsTrue()
        {
            Assert.That(TruncatedStringPattern.Matches("Hello...", "Hello World") == true);
            Assert.That(TruncatedStringPattern.Matches("Error: Connection failed...", "Error: Connection failed after 3 retries"));
            Assert.That(TruncatedStringPattern.Matches("MongoDB...", "MongoDB is awesome") == true);
        }

        [Test]
        public void Matches_TruncatedString_WithNonMatchingPrefix_ReturnsFalse()
        {
            Assert.That(TruncatedStringPattern.Matches("Hello...", "Hi World") == false);
            Assert.That(TruncatedStringPattern.Matches("Error...", "Warning: Something happened") == false);
        }

        [Test]
        public void Matches_TruncatedString_WithNonStringActual_ReturnsFalse()
        {
            Assert.That(TruncatedStringPattern.Matches("Hello...", 123) == false);
            Assert.That(TruncatedStringPattern.Matches("Hello...", null) == false);
            Assert.That(TruncatedStringPattern.Matches("Hello...", new object()) == false);
        }

        [Test]
        public void Matches_NonTruncatedString_ReturnsFalse()
        {
            Assert.That(TruncatedStringPattern.Matches("Hello", "Hello") == false);
            Assert.That(TruncatedStringPattern.Matches("...", "anything") == false); // This is handled by ExactEllipsisPattern
        }

        [Test]
        public void Matches_TooShortTruncatedString_ReturnsFalse()
        {
            Assert.That(TruncatedStringPattern.Matches("...", "anything") == false);
        }

        [Test]
        public void Priority_ReturnsCorrectPriority()
        {
            Assert.That(TruncatedStringPattern.Priority == 90);
        }
    }

    [TestFixture]
    public class JsonEllipsisPatternTests
    {
        [Test]
        public void Priority_ReturnsCorrectPriority()
        {
            Assert.That(JsonEllipsisPattern.Priority == 80); ;
        }

        [Test]
        public void Matches_NonStringExpected_ReturnsFalse()
        {
            Assert.That(JsonEllipsisPattern.Matches(123, "{}") == false);
            Assert.That(JsonEllipsisPattern.Matches(null, "{}") == false);
            Assert.That(JsonEllipsisPattern.Matches(new object(), "{}") == false);
        }

        [Test]
        public void Matches_NonStringActual_ReturnsFalse()
        {
            Assert.That(JsonEllipsisPattern.Matches("{...}", 123) == false);
            Assert.That(JsonEllipsisPattern.Matches("{...}", null) == false);
            Assert.That(JsonEllipsisPattern.Matches("{...}", new object()) == false);
        }

        [Test]
        public void Matches_StringWithoutEllipsis_ReturnsFalse()
        {
            Assert.That(JsonEllipsisPattern.Matches("""{"field": "value"}""", """{"field": "value"}""") == false);
            Assert.That(JsonEllipsisPattern.Matches("regular string", "another string") == false);
        }
    }

    [TestFixture]
    public class ArrayWildcardPatternTests
    {
        [Test]
        public void Matches_ArrayWildcard_WithArray_ReturnsTrue()
        {
            var expectedArray = new object[] { "..." };
            var actualArray = new[] { "item1", "item2", "item3" };


            Assert.That(ArrayWildcardPattern.Matches(expectedArray, actualArray));
        }

        [Test]
        public void Matches_ArrayWildcard_WithEmptyArray_ReturnsTrue()
        {
            var expectedArray = new object[] { "..." };
            var actualArray = Array.Empty<object>();


            Assert.That(ArrayWildcardPattern.Matches(expectedArray, actualArray));
        }

        [Test]
        public void Matches_ArrayWildcard_WithNonArray_ReturnsFalse()
        {
            var expectedArray = new object[] { "..." };


            Assert.That(ArrayWildcardPattern.Matches(expectedArray, "not an array") == false);
            Assert.That(ArrayWildcardPattern.Matches(expectedArray, 123) == false);
            Assert.That(ArrayWildcardPattern.Matches(expectedArray, null) == false);
        }

        [Test]
        public void Matches_NonWildcardArray_ReturnsFalse()
        {
            var expectedArray = new object[] { "item1", "item2" };
            var actualArray = new[] { "item1", "item2" };


            Assert.That(ArrayWildcardPattern.Matches(expectedArray, actualArray) == false);
        }

        [Test]
        public void Matches_MultiElementArrayWithEllipsis_ReturnsFalse()
        {
            var expectedArray = new object[] { "item1", "...", "item3" };
            var actualArray = new[] { "item1", "item2", "item3" };


            Assert.That(ArrayWildcardPattern.Matches(expectedArray, actualArray) == false);
        }

        [Test]
        public void Priority_ReturnsCorrectPriority()
        {
            Assert.That(ArrayWildcardPattern.Priority == 95);
        }
    }

    [TestFixture]
    public class ObjectWildcardPatternTests
    {
        [Test]
        public void Matches_ObjectWildcard_WithObject_ReturnsTrue()
        {
            var expectedDict = new Dictionary<string, object> { { "...", "..." } };
            var actualDict = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };


            Assert.That(ObjectWildcardPattern.Matches(expectedDict, actualDict) == true);
        }

        [Test]
        public void Matches_ObjectWildcard_WithEmptyObject_ReturnsTrue()
        {
            var expectedDict = new Dictionary<string, object> { { "...", "..." } };
            var actualDict = new Dictionary<string, object>();


            Assert.That(ObjectWildcardPattern.Matches(expectedDict, actualDict) == true);
        }

        [Test]
        public void Matches_ObjectWildcard_WithNonObject_ReturnsFalse()
        {
            var expectedDict = new Dictionary<string, object> { { "...", "..." } };


            Assert.That(ObjectWildcardPattern.Matches(expectedDict, "not an object") == false);
            Assert.That(ObjectWildcardPattern.Matches(expectedDict, 123) == false);
            Assert.That(ObjectWildcardPattern.Matches(expectedDict, null) == false);
            Assert.That(ObjectWildcardPattern.Matches(expectedDict, new[] { "array" }) == false);
        }

        [Test]
        public void Matches_NonWildcardObject_ReturnsFalse()
        {
            var expectedDict = new Dictionary<string, object> { { "name", "Alice" } };
            var actualDict = new Dictionary<string, object> { { "name", "Alice" } };


            Assert.That(ObjectWildcardPattern.Matches(expectedDict, actualDict) == false);
        }

        [Test]
        public void Matches_MultiPropertyObjectWithEllipsis_ReturnsFalse()
        {
            var expectedDict = new Dictionary<string, object> { { "name", "Alice" }, { "...", "..." } };
            var actualDict = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };


            Assert.That(ObjectWildcardPattern.Matches(expectedDict, actualDict) == false);
        }

        [Test]
        public void Matches_EllipsisKeyWithWrongValue_ReturnsFalse()
        {
            var expectedDict = new Dictionary<string, object> { { "...", "not ellipsis" } };
            var actualDict = new Dictionary<string, object> { { "name", "Alice" } };


            Assert.That(ObjectWildcardPattern.Matches(expectedDict, actualDict) == false);
        }

        [Test]
        public void Priority_ReturnsCorrectPriority()
        {
            Assert.That(ObjectWildcardPattern.Priority == 95);
        }
    }
}