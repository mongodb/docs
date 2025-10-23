# Test Data Files Documentation

This directory contains test data files used by the Comparison.Tests project to validate end-to-end scenarios.

## File Organization

### Integration Test Files

- **`integration-complex.txt`** - Complex MongoDB document with nested structures, arrays, ellipsis patterns, and global
  ellipsis. Used for comprehensive end-to-end validation.

### Feature-Specific Test Files

- **`array-expected.txt`** - Array comparison scenarios with different ordering strategies
- **`basic-expected.txt`** - Simple document structures for basic validation
- **`ellipsis-patterns.txt`** - Various ellipsis pattern examples (property-level, array-level)
- **`global-ellipsis.txt`** - Documents using global ellipsis (`...`) for flexible matching
- **`ordered-array.txt`** - Arrays that must match in specific order
- **`with-ignored-fields.txt`** - Documents with fields that should be ignored during comparison

### Error Testing Files

- **`invalid-syntax.txt`** - Invalid syntax examples to test error handling
- **`debug-user.txt`** - Debug scenarios for troubleshooting test failures

### Multi-Document Files

- **`multiple-docs.txt`** - JSONL format with multiple documents per file
- **`simple-output.txt`** - Single document for simple validation scenarios

## File Format Standards

### Expected File Syntax

All test data files support:

- **C# style comments**: `//` single-line, `/* */` multi-line
- **MongoDB Extended JSON**: `ObjectId('...')`, `Date('...')`, `Decimal128('...')`
- **Ellipsis patterns**: `'...'` for flexible matching
- **Global ellipsis**: `...` at end of document to allow extra fields
- **JSONL format**: Multiple JSON objects, one per line

### Example File Structure

```javascript
// This is a comment explaining the test scenario
{
  _id: ObjectId('507f1f77bcf86cd799439011'),
  created: Date('2024-01-01T12:00:00Z'),
  amount: Decimal128('123.45'),
  dynamicField: '...',  // Property-level ellipsis
  tags: ['...'],        // Array-level ellipsis
  nested: {
    field1: 'value',
    field2: '...'
  }
}

...  // Global ellipsis - allows extra top-level fields
```

## Adding New Test Data Files

### File Naming Convention

- Use descriptive names indicating the test scenario: `feature-scenario.txt`
- Group related tests: `array-*`, `ellipsis-*`, `mongodb-*`
- Include complexity level: `simple-*`, `complex-*`, `integration-*`

### Content Guidelines

1. **Include comments** explaining the test scenario and expected behavior
2. **Use realistic MongoDB data** that matches actual driver output
3. **Test edge cases** like empty arrays, null values, deeply nested structures
4. **Demonstrate ellipsis patterns** where appropriate for flexible matching
5. **Keep files focused** - one test scenario per file when possible

### Integration with Tests

Test files are referenced in `IntegrationTests.cs` using:

```csharp
private string GetTestDataPath(string fileName) => 
    Path.Combine(TestContext.CurrentContext.TestDirectory, "TestData", fileName);
```

Example usage:

```csharp
var result = OutputValidator.ToMatchFile(GetTestDataPath("integration-complex.txt"), actualOutput);
```

## Maintenance Notes

- **Update files** when adding new MongoDB types or comparison features
- **Validate syntax** using the ExpectedOutputParser before committing changes
- **Document regression tests** - if a real-world scenario fails, add a test file
- **Keep files synchronized** with the actual MongoDB driver output formats

## Common Pitfalls

1. **Date format inconsistency** - Always use ISO 8601 format: `2024-01-01T12:00:00Z`
2. **ObjectId format** - Use valid ObjectId hex strings or `'...'` for ellipsis
3. **Decimal128 precision** - Match the exact precision returned by MongoDB driver
4. **Array ordering** - Be aware of ordered vs unordered comparison modes
5. **Comment placement** - Comments inside string values won't be removed
