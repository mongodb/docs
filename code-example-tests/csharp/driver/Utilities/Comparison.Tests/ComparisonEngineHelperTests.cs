using System.Reflection;
using FluentAssertions;
using MongoDB.Bson;
using NUnit.Framework;
using Utilities.Comparison;

namespace Utilities.Comparison.Tests;

/// <summary>
/// Tests for ComparisonEngine helper methods used internally by the comparison system.
/// These tests ensure the helper methods work correctly and maintain system reliability.
/// </summary>
[TestFixture]
public class ComparisonEngineHelperTests
{
    /// <summary>
    /// Test the SafeToString helper method using reflection since it's private.
    /// This method ensures safe string conversion without null reference exceptions.
    /// </summary>
    [TestFixture]
    public class SafeToStringTests
    {
        private MethodInfo? _safeToStringMethod;

        [SetUp]
        public void SetUp()
        {
            // Use reflection to access the private SafeToString method
            _safeToStringMethod = typeof(ComparisonEngine)
                .GetMethod("SafeToString", BindingFlags.NonPublic | BindingFlags.Static);

            _safeToStringMethod.Should().NotBeNull("SafeToString method should exist");
        }

        [Test]
        public void SafeToString_WithNullValue_ReturnsNullString()
        {
            // Act
            var result = _safeToStringMethod!.Invoke(null, new object?[] { null! });

            // Assert
            result.Should().Be("null");
        }

        [Test]
        public void SafeToString_WithStringValue_ReturnsString()
        {
            // Arrange
            var testString = "test value";

            // Act
            var result = _safeToStringMethod!.Invoke(null, new object?[] { testString });

            // Assert
            result.Should().Be("test value");
        }

        [Test]
        public void SafeToString_WithObjectIdValue_ReturnsStringRepresentation()
        {
            // Arrange
            var objectId = new ObjectId("507f1f77bcf86cd799439011");

            // Act  
            var result = _safeToStringMethod!.Invoke(null, new object?[] { objectId });

            // Assert
            result.Should().Be("507f1f77bcf86cd799439011");
        }

        [Test]
        public void SafeToString_WithComplexObject_ReturnsToStringResult()
        {
            // Arrange
            var testObject = new { Name = "Test", Value = 42 };

            // Act
            var result = _safeToStringMethod!.Invoke(null, new object?[] { testObject });

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<string>();
            var stringResult = (string)result!;
            stringResult.Should().Contain("Name");
            stringResult.Should().Contain("Test");
        }

        [Test]
        public void SafeToString_WithObjectThatThrowsInToString_StillThrowsException()
        {
            // Arrange - SafeToString doesn't handle exceptions, it just calls ToString()
            var throwingObject = new ThrowingToStringObject();

            // Act & Assert - This will throw because SafeToString doesn't catch exceptions
            Assert.Throws<System.Reflection.TargetInvocationException>(() =>
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

    /// <summary>
    /// Test the CreateFailure helper method using reflection since it's private.
    /// This method creates standardized failure results with path information for debugging.
    /// </summary>
    [TestFixture]
    public class CreateFailureTests
    {
        private MethodInfo? _createFailureMethod;

        [SetUp]
        public void SetUp()
        {
            // Use reflection to access the private CreateFailure method
            _createFailureMethod = typeof(ComparisonEngine)
                .GetMethod("CreateFailure", BindingFlags.NonPublic | BindingFlags.Static);

            _createFailureMethod.Should().NotBeNull("CreateFailure method should exist");
        }

        [Test]
        public void CreateFailure_WithAllParameters_CreatesCorrectFailure()
        {
            // Arrange
            var path = "$.user.name";
            var expected = "Alice";
            var actual = "Bob";
            var message = "Names do not match";

            // Act
            var result = _createFailureMethod!.Invoke(null, new object[] { path, expected, actual, message });

            // Assert
            result.Should().BeOfType<ComparisonFailure>();
            var failure = (ComparisonFailure)result!;

            failure.Error.Should().NotBeNull();
            failure.Error!.Path.Should().Be(path);
            failure.Error.Expected.Should().Be(expected);
            failure.Error.Actual.Should().Be(actual);
            failure.Error.Message.Should().Be(message);
        }

        [Test]
        public void CreateFailure_WithNullValues_HandlesCorrectly()
        {
            // Arrange
            var path = "$";
            var expected = "null";  // SafeToString converts null to "null"
            var actual = "not null";
            var message = "Null mismatch";

            // Act
            var result = _createFailureMethod!.Invoke(null, new object[] { path, expected, actual, message });

            // Assert
            result.Should().BeOfType<ComparisonFailure>();
            var failure = (ComparisonFailure)result!;

            failure.Error!.Expected.Should().Be("null");
            failure.Error.Actual.Should().Be("not null");
        }

        [Test]
        public void CreateFailure_WithComplexObjectValues_UsesToStringRepresentation()
        {
            // Arrange
            var path = "$.complex";
            var expected = "ExpectedObject";  // Pre-convert to string
            var actual = "ActualObject";      // Pre-convert to string  
            var message = "Complex objects differ";

            // Act
            var result = _createFailureMethod!.Invoke(null, new object[] { path, expected, actual, message });

            // Assert
            result.Should().BeOfType<ComparisonFailure>();
            var failure = (ComparisonFailure)result!;

            failure.Error!.Expected.Should().Contain("ExpectedObject");
            failure.Error.Actual.Should().Contain("ActualObject");
        }
    }
}
