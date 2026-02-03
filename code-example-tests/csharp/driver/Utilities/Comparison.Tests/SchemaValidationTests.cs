using MongoDB.Bson;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Tests for the ShouldResemble() and WithSchema() APIs.
///     These APIs support schema-based validation where MongoDB results may vary
///     but must conform to a defined structure (count, required fields, field values).
/// </summary>
[TestFixture]
public class SchemaValidationTests
{
    [TestFixture]
    public class BasicSchemaValidationTests
    {
        [Test]
        [Description("Tests that ShouldResemble with matching count validates successfully")]
        public void ShouldResemble_WithMatchingCount_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } },
                new Dictionary<string, object> { { "title", "Movie B" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie C" }, { "year", 2012 } },
                new Dictionary<string, object> { { "title", "Movie D" }, { "year", 2012 } }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 2,
                    RequiredFields = new[] { "title", "year" },
                    FieldValues = new Dictionary<string, object?> { { "year", 2012 } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble fails when actual count doesn't match schema")]
        public void ShouldResemble_WithMismatchedActualCount_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } },
                new Dictionary<string, object> { { "title", "Movie B" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie C" }, { "year", 2012 } }
                // Only 1 document, but schema expects 2
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 2,
                        RequiredFields = new[] { "title", "year" }
                    }));

            Assert.That(exception?.Message, Does.Contain("actual has 1 document(s), but schema requires 2"));
        }

        [Test]
        [Description("Tests that ShouldResemble fails when expected count doesn't match schema")]
        public void ShouldResemble_WithMismatchedExpectedCount_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } }
                // Only 1 document, but schema expects 2
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie C" }, { "year", 2012 } },
                new Dictionary<string, object> { { "title", "Movie D" }, { "year", 2012 } }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 2,
                        RequiredFields = new[] { "title", "year" }
                    }));

            Assert.That(exception?.Message, Does.Contain("expected has 1 document(s), but schema requires 2"));
        }
    }

    [TestFixture]
    public class RequiredFieldsTests
    {
        [Test]
        [Description("Tests that ShouldResemble validates required fields exist in all documents")]
        public void ShouldResemble_WithAllRequiredFields_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "_id", "1" }, { "title", "Movie A" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "_id", "2" }, { "title", "Movie B" }, { "year", 2012 } }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "_id", "title", "year" }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble fails when actual document is missing required field")]
        public void ShouldResemble_WithMissingRequiredFieldInActual_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "_id", "1" }, { "title", "Movie A" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "_id", "2" }, { "title", "Movie B" } }
                // Missing 'year' field
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 1,
                        RequiredFields = new[] { "_id", "title", "year" }
                    }));

            Assert.That(exception?.Message, Does.Contain("Missing required field 'year'"));
            Assert.That(exception?.Message, Does.Contain("actual[0]"));
        }

        [Test]
        [Description("Tests that ShouldResemble fails when expected document is missing required field")]
        public void ShouldResemble_WithMissingRequiredFieldInExpected_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "_id", "1" }, { "title", "Movie A" } }
                // Missing 'year' field
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "_id", "2" }, { "title", "Movie B" }, { "year", 2012 } }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 1,
                        RequiredFields = new[] { "_id", "title", "year" }
                    }));

            Assert.That(exception?.Message, Does.Contain("Missing required field 'year'"));
            Assert.That(exception?.Message, Does.Contain("expected[0]"));
        }

        [Test]
        [Description("Tests that empty RequiredFields array allows any fields")]
        public void ShouldResemble_WithEmptyRequiredFields_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "anyField", "value" } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "differentField", "value" } }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = Array.Empty<string>()
                });

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    [TestFixture]
    public class FieldValuesTests
    {
        [Test]
        [Description("Tests that ShouldResemble validates field values match in all documents")]
        public void ShouldResemble_WithMatchingFieldValues_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } },
                new Dictionary<string, object> { { "title", "Movie B" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Different Movie" }, { "year", 2012 } },
                new Dictionary<string, object> { { "title", "Another Movie" }, { "year", 2012 } }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 2,
                    RequiredFields = new[] { "title", "year" },
                    FieldValues = new Dictionary<string, object?> { { "year", 2012 } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble fails when actual document has wrong field value")]
        public void ShouldResemble_WithMismatchedFieldValueInActual_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie B" }, { "year", 2015 } }
                // year is 2015, but schema requires 2012
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 1,
                        RequiredFields = new[] { "title", "year" },
                        FieldValues = new Dictionary<string, object?> { { "year", 2012 } }
                    }));

            Assert.That(exception?.Message, Does.Contain("Field 'year' has value '2015', but schema requires '2012'"));
        }

        [Test]
        [Description("Tests that ShouldResemble fails when actual document is missing field specified in fieldValues")]
        public void ShouldResemble_WithMissingFieldFromFieldValues_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie B" } }
                // Missing 'year' field
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 1,
                        RequiredFields = new[] { "title", "year" },
                        FieldValues = new Dictionary<string, object?> { { "year", 2012 } }
                    }));

            // Will fail on RequiredFields check first since year is now required
            Assert.That(exception?.Message, Does.Contain("Missing required field 'year'"));
        }

        [Test]
        [Description("Tests that ShouldResemble handles null field values correctly")]
        public void ShouldResemble_WithNullFieldValue_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object?> { { "title", "Movie A" }, { "sequel", null } }
            };

            var actual = new[]
            {
                new Dictionary<string, object?> { { "title", "Movie B" }, { "sequel", null } }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "title", "sequel" },
                    FieldValues = new Dictionary<string, object?> { { "sequel", null } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble validates string field values correctly")]
        public void ShouldResemble_WithStringFieldValue_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "genre", "Action" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "genre", "Action" }, { "year", 2015 } }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "genre", "year" },
                    FieldValues = new Dictionary<string, object?> { { "genre", "Action" } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble validates multiple field values correctly")]
        public void ShouldResemble_WithMultipleFieldValues_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "genre", "Action" }, { "year", 2012 }, { "rating", "PG-13" } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "genre", "Action" }, { "year", 2012 }, { "rating", "PG-13" } }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "genre", "year", "rating" },
                    FieldValues = new Dictionary<string, object?>
                    {
                        { "genre", "Action" },
                        { "year", 2012 },
                        { "rating", "PG-13" }
                    }
                });

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    [TestFixture]
    public class MutualExclusivityTests
    {
        [Test]
        [Description("Tests that ShouldResemble throws when WithIgnoredFields was called")]
        public void ShouldResemble_WithIgnoredFields_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "_id", "1" }, { "title", "Movie A" } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "_id", "2" }, { "title", "Movie B" } }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .WithIgnoredFields("_id")
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions { Count = 1 }));

            Assert.That(exception?.Message, Does.Contain("WithIgnoredFields() cannot be used with ShouldResemble()"));
        }

        [Test]
        [Description("Tests that ShouldResemble throws when multiple ignored fields were specified")]
        public void ShouldResemble_WithMultipleIgnoredFields_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "_id", "1" }, { "title", "Movie A" }, { "score", 0.9 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "_id", "2" }, { "title", "Movie B" }, { "score", 0.8 } }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .WithIgnoredFields("_id", "score")
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions { Count = 1 }));

            Assert.That(exception?.Message, Does.Contain("WithIgnoredFields() cannot be used with ShouldResemble()"));
        }

        [Test]
        [Description("Tests that ShouldResemble throws when WithOrderedSort was called")]
        public void ShouldResemble_AfterWithOrderedSort_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie B" }, { "year", 2012 } }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .WithOrderedSort()
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions { Count = 1 }));

            Assert.That(exception?.Message, Does.Contain("WithOrderedSort()"));
            Assert.That(exception?.Message, Does.Contain("cannot be used with ShouldResemble()"));
        }

        [Test]
        [Description("Tests that ShouldResemble throws when WithUnorderedSort was called")]
        public void ShouldResemble_AfterWithUnorderedSort_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie B" }, { "year", 2012 } }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .WithUnorderedSort()
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions { Count = 1 }));

            Assert.That(exception?.Message, Does.Contain("WithUnorderedSort()"));
            Assert.That(exception?.Message, Does.Contain("cannot be used with ShouldResemble()"));
        }

        [Test]
        [Description("Tests that ShouldMatch works correctly with WithIgnoredFields")]
        public void ShouldMatch_WithIgnoredFields_Succeeds()
        {
            var expected = new Dictionary<string, object> { { "_id", "1" }, { "title", "Movie A" } };
            var actual = new Dictionary<string, object> { { "_id", "different" }, { "title", "Movie A" } };

            // This should work - WithIgnoredFields is compatible with ShouldMatch
            var result = Expect.That(actual)
                .WithIgnoredFields("_id")
                .ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldMatch throws when called after ShouldResemble on the same builder")]
        public void ShouldMatch_AfterShouldResemble_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie B" } }
            };

            var builder = Expect.That(actual);

            // Call ShouldResemble first
            builder.ShouldResemble(expected);

            // Now try to call ShouldMatch on the same builder - should throw
            var exception = Assert.Throws<ComparisonException>(() =>
                builder.ShouldMatch(expected));

            Assert.That(exception?.Message, Does.Contain("ShouldMatch() cannot be called after ShouldResemble()"));
            Assert.That(exception?.Message, Does.Contain("mutually exclusive"));
        }

        [Test]
        [Description("Tests that ShouldResemble throws when called after ShouldMatch on the same builder")]
        public void ShouldResemble_AfterShouldMatch_ThrowsException()
        {
            var expected = new Dictionary<string, object> { { "title", "Movie A" } };
            var actual = new Dictionary<string, object> { { "title", "Movie A" } };

            var builder = Expect.That(actual);

            // Call ShouldMatch first (this will succeed since they match)
            builder.ShouldMatch(expected);

            // Now try to call ShouldResemble on the same builder - should throw
            var exception = Assert.Throws<ComparisonException>(() =>
                builder.ShouldResemble(expected));

            Assert.That(exception?.Message, Does.Contain("ShouldResemble() cannot be called after ShouldMatch()"));
            Assert.That(exception?.Message, Does.Contain("mutually exclusive"));
        }

        [Test]
        [Description("Tests that ShouldMatchAsync also enforces mutual exclusivity")]
        public void ShouldMatchAsync_AfterShouldResemble_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie B" } }
            };

            var builder = Expect.That(actual);

            // Call ShouldResemble first
            builder.ShouldResemble(expected);

            // Now try to call ShouldMatchAsync on the same builder - should throw
            var exception = Assert.ThrowsAsync<ComparisonException>(async () =>
                await builder.ShouldMatchAsync(expected));

            Assert.That(exception?.Message, Does.Contain("ShouldMatch() cannot be called after ShouldResemble()"));
        }

        [Test]
        [Description("Tests that ShouldResemble works correctly without WithIgnoredFields")]
        public void ShouldResemble_WithoutIgnoredFields_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie B" }, { "year", 2012 } }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "title", "year" },
                    FieldValues = new Dictionary<string, object?> { { "year", 2012 } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    [TestFixture]
    public class MongoDbTypeTests
    {
        [Test]
        [Description("Tests that ShouldResemble handles BsonDocument arrays correctly")]
        public void ShouldResemble_WithBsonDocuments_Succeeds()
        {
            var expected = new List<BsonDocument>
            {
                new() { { "_id", new ObjectId("507f1f77bcf86cd799439011") }, { "title", "Movie A" }, { "year", 2012 } }
            };

            var actual = new List<BsonDocument>
            {
                new() { { "_id", new ObjectId("507f1f77bcf86cd799439012") }, { "title", "Movie B" }, { "year", 2012 } }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "_id", "title", "year" },
                    FieldValues = new Dictionary<string, object?> { { "year", 2012 } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble handles mixed numeric types correctly")]
        public void ShouldResemble_WithMixedNumericTypes_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "count", 100 } }  // int
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "count", 100L } }  // long
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "count" },
                    FieldValues = new Dictionary<string, object?> { { "count", 100 } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    [TestFixture]
    public class EdgeCaseTests
    {
        [Test]
        [Description("Tests that ShouldResemble with null schema throws exception")]
        public void ShouldResemble_WithNullSchema_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie B" } }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(null!));

            Assert.That(exception?.Message, Does.Contain("Schema validation options cannot be null"));
        }

        [Test]
        [Description("Tests that ShouldResemble handles empty arrays with count 0")]
        public void ShouldResemble_WithEmptyArrays_Succeeds()
        {
            var expected = Array.Empty<Dictionary<string, object>>();
            var actual = Array.Empty<Dictionary<string, object>>();

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 0
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble handles single document correctly")]
        public void ShouldResemble_WithSingleDocument_Succeeds()
        {
            var expected = new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } };
            var actual = new Dictionary<string, object> { { "title", "Movie B" }, { "year", 2012 } };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "title", "year" },
                    FieldValues = new Dictionary<string, object?> { { "year", 2012 } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble with non-document type throws exception")]
        public void ShouldResemble_WithNonDocumentType_ThrowsException()
        {
            var expected = new[] { "string1", "string2" };  // Array of strings, not documents
            var actual = new[] { "string3", "string4" };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 2
                    }));

            Assert.That(exception?.Message, Does.Contain("Schema validation requires documents"));
        }

        [Test]
        [Description("Tests that ShouldResemble with null actual throws meaningful exception")]
        public void ShouldResemble_WithNullActual_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" } }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(null)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 1
                    }));

            Assert.That(exception?.Message, Does.Contain("actual has 0 document(s), but schema requires 1"));
        }

        [Test]
        [Description("Tests that FieldValues keys must be in RequiredFields")]
        public void ShouldResemble_WithFieldValueNotInRequiredFields_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object> { { "title", "Movie A" }, { "year", 2012 } }
            };

            var actual = new[]
            {
                new Dictionary<string, object> { { "title", "Movie B" }, { "year", 2012 } }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 1,
                        RequiredFields = new[] { "title" },  // 'year' is NOT in RequiredFields
                        FieldValues = new Dictionary<string, object?> { { "year", 2012 } }  // but it's in FieldValues
                    }));

            Assert.That(exception?.Message, Does.Contain("FieldValues contains field(s)"));
            Assert.That(exception?.Message, Does.Contain("'year'"));
            Assert.That(exception?.Message, Does.Contain("not in RequiredFields"));
        }
    }

    [TestFixture]
    public class VectorSearchUseCaseTests
    {
        [Test]
        [Description("Tests real-world Vector Search scenario where result documents vary but schema is consistent")]
        public void ShouldResemble_VectorSearchResults_ValidatesSchemaCorrectly()
        {
            // Simulating Vector Search where we get similar movies but exact results may vary
            var expectedVectorSearchResults = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                    { "title", "The Matrix" },
                    { "year", 1999 },
                    { "score", 0.95 }
                },
                new Dictionary<string, object>
                {
                    { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                    { "title", "Blade Runner" },
                    { "year", 1982 },
                    { "score", 0.89 }
                }
            };

            var actualVectorSearchResults = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", new ObjectId("507f1f77bcf86cd799439099") },
                    { "title", "Ghost in the Shell" },
                    { "year", 1995 },
                    { "score", 0.92 }
                },
                new Dictionary<string, object>
                {
                    { "_id", new ObjectId("507f1f77bcf86cd799439098") },
                    { "title", "Akira" },
                    { "year", 1988 },
                    { "score", 0.88 }
                }
            };

            // Schema validation only checks structure, not values
            // No fieldValues means all field values can vary
            var result = Expect.That(actualVectorSearchResults)
                .ShouldResemble(expectedVectorSearchResults)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 2,
                    RequiredFields = new[] { "_id", "title", "year", "score" }
                    // No fieldValues - all fields can have different values
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests Vector Search with year filter where year must match")]
        public void ShouldResemble_VectorSearchWithFilter_ValidatesFilteredField()
        {
            var expectedResults = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "id1" }, { "title", "Movie A" }, { "year", 2020 }, { "score", 0.9 }
                },
                new Dictionary<string, object>
                {
                    { "_id", "id2" }, { "title", "Movie B" }, { "year", 2020 }, { "score", 0.85 }
                },
                new Dictionary<string, object>
                {
                    { "_id", "id3" }, { "title", "Movie C" }, { "year", 2020 }, { "score", 0.80 }
                }
            };

            var actualResults = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "id4" }, { "title", "Different A" }, { "year", 2020 }, { "score", 0.95 }
                },
                new Dictionary<string, object>
                {
                    { "_id", "id5" }, { "title", "Different B" }, { "year", 2020 }, { "score", 0.88 }
                },
                new Dictionary<string, object>
                {
                    { "_id", "id6" }, { "title", "Different C" }, { "year", 2020 }, { "score", 0.82 }
                }
            };

            // Only year is validated via fieldValues - other fields just need to exist
            var result = Expect.That(actualResults)
                .ShouldResemble(expectedResults)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 3,
                    RequiredFields = new[] { "_id", "title", "year", "score" },
                    FieldValues = new Dictionary<string, object?> { { "year", 2020 } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    [TestFixture]
    public class NestedFieldsTests
    {
        [Test]
        [Description("Tests that ShouldResemble validates documents with 2 levels of nesting")]
        public void ShouldResemble_WithTwoLevelNestedFields_ValidatesTopLevelPresence()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "title", "Movie A" },
                    { "director", new Dictionary<string, object>
                        {
                            { "name", "John Smith" },
                            { "birthYear", 1970 }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "title", "Movie B" },
                    { "director", new Dictionary<string, object>
                        {
                            { "name", "Jane Doe" },
                            { "birthYear", 1985 }
                        }
                    }
                }
            };

            // Validates that 'director' field exists (presence check on top-level nested object)
            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "_id", "title", "director" }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble fails when nested object field is missing")]
        public void ShouldResemble_WithMissingNestedObjectField_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "title", "Movie A" },
                    { "director", new Dictionary<string, object> { { "name", "John" } } }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "title", "Movie B" }
                    // Missing 'director' field entirely
                }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 1,
                        RequiredFields = new[] { "_id", "title", "director" }
                    }));

            Assert.That(exception?.Message, Does.Contain("Missing required field 'director'"));
        }

        [Test]
        [Description("Tests that ShouldResemble validates documents with 3 levels of nesting")]
        public void ShouldResemble_WithThreeLevelNestedFields_ValidatesTopLevelPresence()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "title", "Movie A" },
                    { "metadata", new Dictionary<string, object>
                        {
                            { "production", new Dictionary<string, object>
                                {
                                    { "studio", new Dictionary<string, object>
                                        {
                                            { "name", "Warner Bros" },
                                            { "location", "Burbank" }
                                        }
                                    },
                                    { "budget", 150000000 }
                                }
                            },
                            { "releaseYear", 2023 }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "title", "Movie B" },
                    { "metadata", new Dictionary<string, object>
                        {
                            { "production", new Dictionary<string, object>
                                {
                                    { "studio", new Dictionary<string, object>
                                        {
                                            { "name", "Universal" },
                                            { "location", "Los Angeles" }
                                        }
                                    },
                                    { "budget", 200000000 }
                                }
                            },
                            { "releaseYear", 2024 }
                        }
                    }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "_id", "title", "metadata" }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble with BsonDocument nested fields works correctly")]
        public void ShouldResemble_WithBsonNestedFields_Succeeds()
        {
            var expected = new List<BsonDocument>
            {
                new()
                {
                    { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                    { "title", "Movie A" },
                    { "cast", new BsonDocument
                        {
                            { "lead", new BsonDocument
                                {
                                    { "name", "Actor A" },
                                    { "role", "Hero" }
                                }
                            },
                            { "supporting", new BsonArray
                                {
                                    new BsonDocument { { "name", "Actor B" }, { "role", "Sidekick" } }
                                }
                            }
                        }
                    }
                }
            };

            var actual = new List<BsonDocument>
            {
                new()
                {
                    { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                    { "title", "Movie B" },
                    { "cast", new BsonDocument
                        {
                            { "lead", new BsonDocument
                                {
                                    { "name", "Actor X" },
                                    { "role", "Villain" }
                                }
                            },
                            { "supporting", new BsonArray
                                {
                                    new BsonDocument { { "name", "Actor Y" }, { "role", "Henchman" } }
                                }
                            }
                        }
                    }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "_id", "title", "cast" }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldResemble validates nested object with arrays at multiple levels")]
        public void ShouldResemble_WithNestedArraysAndObjects_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "title", "Movie A" },
                    { "reviews", new[]
                        {
                            new Dictionary<string, object>
                            {
                                { "reviewer", new Dictionary<string, object>
                                    {
                                        { "name", "Critic A" },
                                        { "publication", new Dictionary<string, object>
                                            {
                                                { "name", "Times" },
                                                { "country", "USA" }
                                            }
                                        }
                                    }
                                },
                                { "score", 8.5 }
                            }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "title", "Movie B" },
                    { "reviews", new[]
                        {
                            new Dictionary<string, object>
                            {
                                { "reviewer", new Dictionary<string, object>
                                    {
                                        { "name", "Critic B" },
                                        { "publication", new Dictionary<string, object>
                                            {
                                                { "name", "Post" },
                                                { "country", "UK" }
                                            }
                                        }
                                    }
                                },
                                { "score", 7.5 }
                            }
                        }
                    }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "_id", "title", "reviews" }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests documents with address containing street, city, and country nested 2 levels deep")]
        public void ShouldResemble_WithAddressNestedTwoLevels_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "user1" },
                    { "name", "Alice" },
                    { "address", new Dictionary<string, object>
                        {
                            { "street", "123 Main St" },
                            { "city", "New York" },
                            { "country", "USA" }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "user2" },
                    { "name", "Bob" },
                    { "address", new Dictionary<string, object>
                        {
                            { "street", "456 Oak Ave" },
                            { "city", "Los Angeles" },
                            { "country", "USA" }
                        }
                    }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "_id", "name", "address" }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests documents with company -> department -> manager hierarchy 3 levels deep")]
        public void ShouldResemble_WithCompanyHierarchyThreeLevels_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "emp1" },
                    { "name", "John" },
                    { "company", new Dictionary<string, object>
                        {
                            { "name", "Acme Corp" },
                            { "department", new Dictionary<string, object>
                                {
                                    { "name", "Engineering" },
                                    { "manager", new Dictionary<string, object>
                                        {
                                            { "name", "Sarah" },
                                            { "email", "sarah@acme.com" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "emp2" },
                    { "name", "Jane" },
                    { "company", new Dictionary<string, object>
                        {
                            { "name", "Tech Inc" },
                            { "department", new Dictionary<string, object>
                                {
                                    { "name", "Sales" },
                                    { "manager", new Dictionary<string, object>
                                        {
                                            { "name", "Mike" },
                                            { "email", "mike@tech.com" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "_id", "name", "company" }
                });

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    [TestFixture]
    public class DotNotationTests
    {
        [Test]
        [Description("Tests that dot notation works for RequiredFields to check nested field existence")]
        public void ShouldResemble_WithDotNotationRequiredField_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "queryPlanner", new Dictionary<string, object>
                        {
                            { "winningPlan", new Dictionary<string, object>
                                {
                                    { "stage", "IXSCAN" }
                                }
                            }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "queryPlanner", new Dictionary<string, object>
                        {
                            { "winningPlan", new Dictionary<string, object>
                                {
                                    { "stage", "COLLSCAN" }
                                }
                            }
                        }
                    }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "queryPlanner.winningPlan.stage" }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that dot notation works for FieldValues to validate nested field values")]
        public void ShouldResemble_WithDotNotationFieldValue_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "queryPlanner", new Dictionary<string, object>
                        {
                            { "winningPlan", new Dictionary<string, object>
                                {
                                    { "inputStage", new Dictionary<string, object>
                                        {
                                            { "indexName", "timestamp_1" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "queryPlanner", new Dictionary<string, object>
                        {
                            { "winningPlan", new Dictionary<string, object>
                                {
                                    { "inputStage", new Dictionary<string, object>
                                        {
                                            { "indexName", "timestamp_1" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "queryPlanner.winningPlan.inputStage.indexName" },
                    FieldValues = new Dictionary<string, object?> { { "queryPlanner.winningPlan.inputStage.indexName", "timestamp_1" } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that dot notation fails when nested field is missing")]
        public void ShouldResemble_WithDotNotationMissingNestedField_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "queryPlanner", new Dictionary<string, object>
                        {
                            { "winningPlan", new Dictionary<string, object>
                                {
                                    { "stage", "IXSCAN" }
                                }
                            }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "queryPlanner", new Dictionary<string, object>
                        {
                            { "winningPlan", new Dictionary<string, object>
                                {
                                    // Missing 'inputStage' field
                                    { "stage", "COLLSCAN" }
                                }
                            }
                        }
                    }
                }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 1,
                        RequiredFields = new[] { "queryPlanner.winningPlan.inputStage.indexName" }
                    }));

            Assert.That(exception?.Message, Does.Contain("Missing required field 'queryPlanner.winningPlan.inputStage.indexName'"));
        }

        [Test]
        [Description("Tests that dot notation fails when nested field value doesn't match")]
        public void ShouldResemble_WithDotNotationMismatchedFieldValue_ThrowsException()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "queryPlanner", new Dictionary<string, object>
                        {
                            { "winningPlan", new Dictionary<string, object>
                                {
                                    { "inputStage", new Dictionary<string, object>
                                        {
                                            { "indexName", "timestamp_1" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "queryPlanner", new Dictionary<string, object>
                        {
                            { "winningPlan", new Dictionary<string, object>
                                {
                                    { "inputStage", new Dictionary<string, object>
                                        {
                                            { "indexName", "wrong_index" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            var exception = Assert.Throws<ComparisonException>(() =>
                Expect.That(actual)
                    .ShouldResemble(expected)
                    .WithSchema(new SchemaValidationOptions
                    {
                        Count = 1,
                        RequiredFields = new[] { "queryPlanner.winningPlan.inputStage.indexName" },
                        FieldValues = new Dictionary<string, object?> { { "queryPlanner.winningPlan.inputStage.indexName", "timestamp_1" } }
                    }));

            Assert.That(exception?.Message, Does.Contain("Field 'queryPlanner.winningPlan.inputStage.indexName' has value '\"wrong_index\"', but schema requires '\"timestamp_1\"'"));
        }

        [Test]
        [Description("Tests that simple field names without dots use direct lookup")]
        public void ShouldResemble_WithSimpleFieldName_UsesDirectLookup()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "title", "Movie A" },
                    { "year", 2020 }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "title", "Movie B" },
                    { "year", 2020 }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "title", "year" },
                    FieldValues = new Dictionary<string, object?> { { "year", 2020 } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that dot notation works with BsonDocument nested structures")]
        public void ShouldResemble_WithDotNotationAndBsonDocument_Succeeds()
        {
            var expected = new List<BsonDocument>
            {
                new()
                {
                    { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                    { "queryPlanner", new BsonDocument
                        {
                            { "winningPlan", new BsonDocument
                                {
                                    { "inputStage", new BsonDocument
                                        {
                                            { "indexName", "timestamp_1" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            var actual = new List<BsonDocument>
            {
                new()
                {
                    { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                    { "queryPlanner", new BsonDocument
                        {
                            { "winningPlan", new BsonDocument
                                {
                                    { "inputStage", new BsonDocument
                                        {
                                            { "indexName", "timestamp_1" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "queryPlanner.winningPlan.inputStage.indexName" },
                    FieldValues = new Dictionary<string, object?> { { "queryPlanner.winningPlan.inputStage.indexName", "timestamp_1" } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that mixed dot notation and simple field names work together")]
        public void ShouldResemble_WithMixedDotNotationAndSimpleFields_Succeeds()
        {
            var expected = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "1" },
                    { "title", "Movie A" },
                    { "metadata", new Dictionary<string, object>
                        {
                            { "director", new Dictionary<string, object>
                                {
                                    { "name", "John Smith" }
                                }
                            }
                        }
                    }
                }
            };

            var actual = new[]
            {
                new Dictionary<string, object>
                {
                    { "_id", "2" },
                    { "title", "Movie B" },
                    { "metadata", new Dictionary<string, object>
                        {
                            { "director", new Dictionary<string, object>
                                {
                                    { "name", "John Smith" }
                                }
                            }
                        }
                    }
                }
            };

            var result = Expect.That(actual)
                .ShouldResemble(expected)
                .WithSchema(new SchemaValidationOptions
                {
                    Count = 1,
                    RequiredFields = new[] { "_id", "title", "metadata.director.name" },
                    FieldValues = new Dictionary<string, object?> { { "metadata.director.name", "John Smith" } }
                });

            Assert.That(result.IsSuccess, Is.True);
        }
    }
}