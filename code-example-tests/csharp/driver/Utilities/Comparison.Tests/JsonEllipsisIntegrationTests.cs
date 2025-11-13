using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Integration tests for JsonEllipsisPattern functionality.
///     Tests the JsonEllipsisPattern behavior with real-world MongoDB documentation scenarios
///     and complex nested JSON structures with ellipsis patterns.
/// </summary>
[TestFixture]
public class JsonEllipsisIntegrationTests
{
    [Test]
    [Description("Tests that JSON objects with ellipsis patterns match correctly with additional properties")]
    public void JsonEllipsisPattern_ObjectWithEllipsis_ShouldMatch()
    {
        var expected = """
                       { "name": "John Doe", "age": 30, ... }
                       """;
        var actual = """
                     { "name": "John Doe", "age": 30, "city": "New York", "email": "john@example.com" }
                     """;

        Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that JSON arrays with ellipsis patterns match correctly with additional elements")]
    public void JsonEllipsisPattern_ArrayWithEllipsis_ShouldMatch()
    {
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

        Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that empty arrays with ellipsis patterns match correctly")]
    public void JsonEllipsisPattern_EmptyArrayWithEllipsis_ShouldMatch()
    {
        var expected = "[...]";
        var actual = "[]";

        Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that empty objects with ellipsis patterns match correctly")]
    public void JsonEllipsisPattern_EmptyObjectWithEllipsis_ShouldMatch()
    {
        var expected = "{ ... }";
        var actual = "{}";

        Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that restaurant document style JSON with ellipsis patterns matches correctly")]
    public void JsonEllipsisPattern_RestaurantDocumentStyle_ShouldMatch()
    {
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

        Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that user management scenario JSON with nested ellipsis patterns matches correctly")]
    public void JsonEllipsisPattern_UserManagementScenario_ShouldMatch()
    {
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

        Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that nested arrays with ellipsis patterns match correctly")]
    public void JsonEllipsisPattern_NestedArrayWithEllipsis_ShouldMatch()
    {
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

        Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that deeply nested JSON structures with ellipsis patterns match correctly")]
    public void JsonEllipsisPattern_DeepNestedStructures_ShouldMatch()
    {
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

        Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that restaurant documents with additional data match correctly against ellipsis patterns")]
    public void JsonEllipsisPattern_RestaurantDocuments_WithAdditionalData_ShouldMatch()
    {
        var expected = TestDataConstants.RealWorldExamples.RestaurantDocuments;
        var actualWithMoreData = """
                                 [
                                   { name: "Como Pizza", cuisine: "Pizza", borough: "Brooklyn", address: { building: "2206", street: "86th Street" } },
                                   { name: "New York Pizza Suprema", cuisine: "Pizza", borough: "Manhattan", address: { building: "413", street: "8th Avenue" } },
                                   { name: "Tony's Brick Oven Pizza", cuisine: "Pizza", borough: "Queens" }
                                 ]
                                 """;

        Expect.That(actualWithMoreData).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that restaurant documents with missing required data should not match")]
    public void JsonEllipsisPattern_RestaurantDocuments_WithMissingRequiredData_ShouldNotMatch()
    {
        var expected = TestDataConstants.RealWorldExamples.RestaurantDocuments;
        var actualMissingRequiredField = """
                                         [
                                           { "cuisine": "Pizza", "borough": "Brooklyn" },
                                           { "name": "New York Pizza Suprema", "cuisine": "Pizza" }
                                         ]
                                         """;

        Expect.That(actualMissingRequiredField).ShouldNotMatch(expected);
    }

    [Test]
    [Description("Tests that complex arrays with nested ellipsis patterns match correctly")]
    public void JsonEllipsisPattern_ComplexArrayWithNestedEllipsis_ShouldMatch()
    {
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

        Expect.That(actualWithFullData).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that non-JSON strings should not apply JSON ellipsis patterns")]
    public void JsonEllipsisPattern_NonJsonString_ShouldNotApply()
    {
        var expected = "This is a regular string with ellipsis ...";
        var actual = "This is a different string";

        Expect.That(actual).ShouldNotMatch(expected);
    }

    [Test]
    [Description("Tests that validation fails when required values are missing from JSON patterns")]
    public void JsonEllipsisPattern_ValidationFailure_WithMissingRequiredValues()
    {
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

        Expect.That(actual).ShouldNotMatch(expected);
    }

    [Test]
    [Description("Tests that successful matches occur when all required fields are present with ellipsis patterns")]
    public void JsonEllipsisPattern_SuccessfulMatch_WithAllRequiredFields()
    {
        var expected = """
                       { "name": "John Doe", "age": 30, ... }
                       """;
        var actual = """
                     { "name": "John Doe", "age": 30, "city": "New York", "phone": "123-456-7890" }
                     """;

        Expect.That(actual).ShouldMatch(expected);
    }
}