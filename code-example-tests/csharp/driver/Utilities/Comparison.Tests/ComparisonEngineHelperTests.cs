using System.Reflection;
using MongoDB.Bson;
using NUnit.Framework;


namespace Utilities.Comparison.Tests;

/// <summary>
///     Tests for ComparisonEngine helper methods used internally by the comparison system.
///     These tests ensure the helper methods work correctly and maintain system reliability.
/// </summary>
[TestFixture]
public class ComparisonEngineHelperTests
{
    /// <summary>
    ///     Test the SafeToString helper method using reflection since it's private.
    ///     This method ensures safe string conversion without null reference exceptions.
    /// </summary>
    [TestFixture]
    public class SafeToStringTests
    {
        [SetUp]
        public void SetUp()
        {
            // Use reflection to access the private SafeToString method
            _safeToStringMethod = typeof(ComparisonEngine)
                .GetMethod("SafeToString", BindingFlags.NonPublic | BindingFlags.Static);

            Assert.That(_safeToStringMethod, Is.Not.Null);
        }

        private MethodInfo? _safeToStringMethod;

        [Test]
        [Description("Verifies that SafeToString method returns 'null' string when given a null value input")]
        public void SafeToString_WithNullValue_ReturnsNullString()
        {
            var result = _safeToStringMethod!.Invoke(null, new object?[] { null! });

            Assert.That(result?.ToString() == "null");
        }

        [Test]
        [Description("Verifies that SafeToString method returns the original string when given a string value")]
        public void SafeToString_WithStringValue_ReturnsString()
        {
            var testString = "test value";

            var result = _safeToStringMethod!.Invoke(null, new object?[] { testString });

            Assert.That(result, Is.EqualTo("test value"));
        }

        [Test]
        [Description("Verifies that SafeToString method correctly converts ObjectId to its string representation")]
        public void SafeToString_WithObjectIdValue_ReturnsStringRepresentation()
        {
            var objectId = new ObjectId("507f1f77bcf86cd799439011");

            var result = _safeToStringMethod!.Invoke(null, new object?[] { objectId });

            Assert.That(result, Is.EqualTo("507f1f77bcf86cd799439011"));
        }

        [Test]
        [Description("Verifies that SafeToString method calls ToString() on complex objects and returns meaningful string representation")]
        public void SafeToString_WithComplexObject_ReturnsToStringResult()
        {
            var testObject = new { Name = "Test", Value = 42 };

            var result = _safeToStringMethod!.Invoke(null, new object?[] { testObject });

            Assert.That(result, Is.Not.Null);
            Assert.That(result?.GetType(), Is.EqualTo(typeof(string)));
            var stringResult = (string)result!;
            Assert.That(result != null && result.ToString()!.Contains("Name"));
            Assert.That(result != null && result.ToString()!.Contains("Test"));
        }

        [Test]
        [Description("Verifies that SafeToString method propagates exceptions when the object's ToString() method throws")]
        public void SafeToString_WithObjectThatThrowsInToString_StillThrowsException()
        {
            var throwingObject = new ThrowingToStringObject();

            Assert.Throws<TargetInvocationException>(() =>
            {
                _safeToStringMethod!.Invoke(null, new object?[] { throwingObject });
            });
        }

        private class ThrowingToStringObject
        {
            public override string ToString()
            {
                throw new InvalidOperationException("ToString failed");
            }
        }
    }
}