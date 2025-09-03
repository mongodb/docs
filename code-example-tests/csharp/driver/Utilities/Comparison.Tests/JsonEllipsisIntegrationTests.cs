using FluentAssertions;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
/// Integration tests for JsonEllipsisPattern functionality.
/// Tests the JsonEllipsisPattern behavior with real-world MongoDB documentation scenarios
/// and complex nested JSON structures with ellipsis patterns.
/// </summary>
[TestFixture]
public class JsonEllipsisIntegrationTests
{
    #region Basic JSON Ellipsis Matching

    [Test]
    public void JsonEllipsisPattern_ObjectWithEllipsis_ShouldMatch()
    {
        // Arrange
        var expected = """
            { "name": "John Doe", "age": 30, ... }
            """;
        var actual = """
            { "name": "John Doe", "age": 30, "city": "New York", "email": "john@example.com" }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("object with ellipsis should match when all specified fields are present");
    }

    [Test]
    public void JsonEllipsisPattern_ArrayWithEllipsis_ShouldMatch()
    {
        // Arrange
        var expected = """
            [
              { "name": "item1", "price": 10.0, ... },
              { "name": "item2", "price": 20.0, ... },
              ...
            ]
            """;
        var actual = """
            [
              { "name": "item1", "price": 10.0, "category": "A", "stock": 5 },
              { "name": "item2", "price": 20.0, "category": "B", "stock": 3 },
              { "name": "item3", "price": 15.0, "category": "C", "stock": 8 }
            ]
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("array with ellipsis should match when all specified elements are present");
    }

    [Test]
    public void JsonEllipsisPattern_EmptyArrayWithEllipsis_ShouldMatch()
    {
        // Arrange
        var expected = "[...]";
        var actual = "[]";

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("empty array should match ellipsis-only array");
    }

    [Test]
    public void JsonEllipsisPattern_EmptyObjectWithEllipsis_ShouldMatch()
    {
        // Arrange
        var expected = "{ ... }";
        var actual = "{}";

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("empty object should match ellipsis-only object");
    }

    #endregion

    #region MongoDB Documentation Scenarios

    [Test]
    public void JsonEllipsisPattern_RestaurantDocumentStyle_ShouldMatch()
    {
        // Arrange - Testing the actual restaurant document pattern from MongoDB docs
        var expected = """
            [
              { name: "Como Pizza", cuisine: "Pizza", ... },
              { name: "New York Pizza Suprema", cuisine: "Pizza", ... },
              ...
            ]
            """;
        var actual = """
            [
              { name: "Como Pizza", cuisine: "Pizza", borough: "Brooklyn", address: { building: "2206", street: "86th Street" } },
              { name: "New York Pizza Suprema", cuisine: "Pizza", borough: "Manhattan", address: { building: "413", street: "8th Avenue" } },
              { name: "Tony's Brick Oven Pizza", cuisine: "Pizza", borough: "Queens" }
            ]
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("restaurant document style with ellipsis should match");
    }

    [Test]
    public void JsonEllipsisPattern_UserManagementScenario_ShouldMatch()
    {
        // Arrange - Testing user management scenario
        var expected = """
            { 
                "users": [
                    { "name": "Alice", "role": "admin", ... },
                    { "name": "Bob", "role": "user", ... }
                ],
                "metadata": { "version": "1.0", ... },
                ...
            }
            """;
        var actual = """
            { 
                "users": [
                    { "name": "Alice", "role": "admin", "id": 1, "email": "alice@test.com" },
                    { "name": "Bob", "role": "user", "id": 2, "email": "bob@test.com" }
                ],
                "metadata": { "version": "1.0", "created": "2023-01-01", "lastModified": "2023-12-01" },
                "settings": { "theme": "dark", "notifications": true }
            }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("complex user management JSON with ellipsis should match when all specified elements are present");
    }

    #endregion

    #region Complex Nested Structures

    [Test]
    public void JsonEllipsisPattern_NestedArrayWithEllipsis_ShouldMatch()
    {
        // Arrange
        var expected = """
            [
              { "id": 1, "items": [{"name": "apple", "price": 1.0}, ...] },
              { "id": 2, "items": [{"name": "banana", "price": 0.5}, ...] },
              ...
            ]
            """;
        var actual = """
            [
              { "id": 1, "items": [{"name": "apple", "price": 1.0}, {"name": "orange", "price": 1.5}] },
              { "id": 2, "items": [{"name": "banana", "price": 0.5}, {"name": "grape", "price": 2.0}] },
              { "id": 3, "items": [{"name": "kiwi", "price": 3.0}] }
            ]
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("nested arrays with ellipsis should match when specified elements are present");
    }

    [Test]
    public void JsonEllipsisPattern_DeepNestedStructures_ShouldMatch()
    {
        // Arrange
        var expected = """
            {
              "company": {
                "departments": [
                  {
                    "name": "Engineering", 
                    "employees": [
                      { "name": "Alice", "position": "Senior Dev", ... },
                      ...
                    ],
                    ...
                  },
                  ...
                ],
                ...
              },
              ...
            }
            """;
        var actual = """
            {
              "company": {
                "name": "TechCorp",
                "departments": [
                  {
                    "name": "Engineering", 
                    "budget": 1000000,
                    "employees": [
                      { "name": "Alice", "position": "Senior Dev", "salary": 120000, "skills": ["C#", "MongoDB"] },
                      { "name": "Bob", "position": "Junior Dev", "salary": 80000, "skills": ["JavaScript", "React"] }
                    ],
                    "location": "Building A"
                  },
                  {
                    "name": "Marketing",
                    "budget": 500000,
                    "employees": []
                  }
                ],
                "founded": 2010
              },
              "metadata": { "lastUpdated": "2023-12-01" }
            }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("deeply nested JSON with multiple ellipsis patterns should match");
    }

    #endregion

    #region Real-World MongoDB Documentation Scenarios

    [Test]
    public void JsonEllipsisPattern_RestaurantDocuments_WithAdditionalData_ShouldMatch()
    {
        // Arrange - Testing real restaurant document pattern from MongoDB C# Driver documentation
        var expected = TestDataConstants.RealWorldExamples.RestaurantDocuments;
        var actualWithMoreData = """
            [
              { name: "Como Pizza", cuisine: "Pizza", borough: "Brooklyn", address: { building: "2206", street: "86th Street" } },
              { name: "New York Pizza Suprema", cuisine: "Pizza", borough: "Manhattan", address: { building: "413", street: "8th Avenue" } },
              { name: "Tony's Brick Oven Pizza", cuisine: "Pizza", borough: "Queens" }
            ]
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actualWithMoreData);

        // Assert
        result.IsSuccess.Should().BeTrue("ellipsis patterns should match with additional data");
        result.Error.Should().BeNull();
    }

    [Test]
    public void JsonEllipsisPattern_RestaurantDocuments_WithMissingRequiredData_ShouldNotMatch()
    {
        // Arrange
        var expected = TestDataConstants.RealWorldExamples.RestaurantDocuments;
        var actualMissingRequiredField = """
            [
              { "cuisine": "Pizza", "borough": "Brooklyn" },
              { "name": "New York Pizza Suprema", "cuisine": "Pizza" }
            ]
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actualMissingRequiredField);

        // Assert
        result.IsSuccess.Should().BeFalse("missing required fields should cause mismatch even with ellipsis");
        result.Error.Should().NotBeNull();
        result.Error!.ToString().Should().Contain("name");
    }

    [Test]
    public void JsonEllipsisPattern_ComplexArrayWithNestedEllipsis_ShouldMatch()
    {
        // Arrange - Test complex array patterns from aggregation pipeline results
        var expected = """
            [
              { "total": 150.50, "items": [{"name": "item1", "price": 50.0}, ...] },
              { "total": 200.75, "items": [{"name": "item2", "price": 75.25}, ...] },
              ...
            ]
            """;
        var actualWithFullData = """
            [
              { "total": 150.50, "items": [{"name": "item1", "price": 50.0}, {"name": "item1b", "price": 100.5}] },
              { "total": 200.75, "items": [{"name": "item2", "price": 75.25}, {"name": "item2b", "price": 125.5}] },
              { "total": 75.25, "items": [{"name": "item3", "price": 25.0}, {"name": "item3b", "price": 50.25}] }
            ]
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actualWithFullData);

        // Assert
        result.IsSuccess.Should().BeTrue("nested ellipsis patterns in arrays should match with additional data");
    }

    #endregion

    #region Pattern Behavior Validation

    [Test]
    public void JsonEllipsisPattern_NonJsonString_ShouldNotApply()
    {
        // Arrange - Plain text should not be handled by JsonEllipsisPattern
        var expected = "This is a regular string with ellipsis ...";
        var actual = "This is a different string";

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeFalse("non-JSON strings should not use JSON ellipsis pattern");
    }

    [Test]
    public void JsonEllipsisPattern_ValidationFailure_WithMissingRequiredValues()
    {
        // Arrange - Test case that should legitimately fail
        var expected = """
            [
              { "name": "item1", "price": 10.0 },
              { "name": "required_item", "price": 99.99 }
            ]
            """;
        var actual = """
            [
              { "name": "item1", "price": 10.0 },
              { "name": "different_item", "price": 25.0 }
            ]
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeFalse("should not match when required element has different values");
    }

    [Test]
    public void JsonEllipsisPattern_SuccessfulMatch_WithAllRequiredFields()
    {
        // Arrange - Positive test case showing JsonEllipsisPattern working correctly
        var expected = """
            { "name": "John Doe", "age": 30, ... }
            """;
        var actual = """
            { "name": "John Doe", "age": 30, "city": "New York", "phone": "123-456-7890" }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("should match when all required fields are present and extra fields are allowed");
    }

    #endregion
}
