package mongodb.comparison;

import org.bson.Document;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Builder for resemblance-based validation that requires a schema definition.
 * Returned by {@code ExpectBuilder.shouldResemble()} and requires a call to
 * {@code withSchema()} to complete the validation.
 *
 * <p>Usage example:
 * <pre>
 * Expect.that(actualResults)
 *     .shouldResemble(expectedOutput)
 *     .withSchema(Schema.builder()
 *         .withCount(20)
 *         .withRequiredFields("_id", "title", "year")
 *         .withFieldValue("year", 2012)
 *         .build());
 * </pre>
 */
public class ResemblanceBuilder {

    private final Object actual;
    private final Object expected;

    /**
     * Package-private constructor. Use ExpectBuilder.shouldResemble() to create instances.
     */
    ResemblanceBuilder(Object actual, Object expected) {
        this.actual = actual;
        this.expected = resolveExpected(expected);
    }

    /**
     * Resolves the expected value, loading file content if it's a file path,
     * or parsing JSON/structured content strings.
     *
     * @param expected The expected value (may be a Path, file path string, JSON string, or direct data)
     * @return The resolved expected data
     */
    private Object resolveExpected(Object expected) {
        // Handle Path objects
        if (expected instanceof Path pathExpected) {
            return loadFromFile(pathExpected.toString());
        }

        // Handle string inputs
        if (expected instanceof String expectedStr) {
            // Check if it's a file path
            if (ContentAnalyzer.isFilePath(expectedStr)) {
                return loadFromFile(expectedStr);
            }

            // Check if it looks like JSON content (starts with { or [)
            String trimmed = expectedStr.trim();
            if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
                return parseContent(expectedStr);
            }
        }

        // Return as-is for direct data (Documents, Maps, Lists, etc.)
        return expected;
    }

    /**
     * Parses JSON/structured content from a string.
     *
     * @param content The content string to parse
     * @return The parsed data
     * @throws IllegalArgumentException if the content cannot be parsed
     */
    private Object parseContent(String content) {
        var parseResult = ExpectedOutputParser.parseContent(content);
        if (!parseResult.isSuccess()) {
            throw new IllegalArgumentException(
                    "Failed to parse expected content for shouldResemble(): " +
                    parseResult.getErrorMessage());
        }
        return parseResult.getData();
    }

    /**
     * Loads and parses content from a file path.
     *
     * @param filePath The file path to load
     * @return The parsed data from the file
     * @throws IllegalArgumentException if the file cannot be loaded or parsed
     */
    private Object loadFromFile(String filePath) {
        var parseResult = ExpectedOutputParser.parseFile(filePath);
        if (!parseResult.isSuccess()) {
            throw new IllegalArgumentException(
                    "Failed to load expected file for shouldResemble(): " + filePath +
                    " - " + parseResult.getErrorMessage());
        }
        return parseResult.getData();
    }

    /**
     * Completes the resemblance validation with the specified schema.
     * Validates that both expected and actual outputs conform to the schema,
     * checking document count, required fields, and field values.
     *
     * @param schema the schema definition to validate against
     * @throws IllegalArgumentException if schema is invalid
     * @throws AssertionError if validation fails
     */
    public void withSchema(Schema schema) {
        // Validate schema structure
        if (schema == null) {
            throw new IllegalArgumentException("withSchema() requires a schema object");
        }
        if (schema.getCount() < 0) {
            throw new IllegalArgumentException("withSchema() requires a non-negative count number");
        }

        List<String> errors = new ArrayList<>();

        // Normalize inputs to document lists (auto-wrap single documents)
        List<Map<String, Object>> actualDocs = normalizeToDocumentList(actual, "actual", errors);
        List<Map<String, Object>> expectedDocs = normalizeToDocumentList(expected, "expected", errors);

        // If normalization failed, report errors and stop
        if (!errors.isEmpty()) {
            throw new AssertionError("Schema validation failed:\n  - " +
                    String.join("\n  - ", errors));
        }

        // Validate count
        int expectedCount = schema.getCount();
        if (actualDocs.size() != expectedCount) {
            errors.add("actual output has " + actualDocs.size() +
                    " documents, expected " + expectedCount);
        }
        if (expectedDocs.size() != expectedCount) {
            errors.add("expected output has " + expectedDocs.size() +
                    " documents, expected " + expectedCount);
        }

        // Validate required fields and field values for actual documents
        validateDocuments(actualDocs, schema, "actual", errors);

        // Validate required fields and field values for expected documents
        validateDocuments(expectedDocs, schema, "expected", errors);

        if (!errors.isEmpty()) {
            throw new AssertionError("Schema validation failed:\n  - " +
                    String.join("\n  - ", errors));
        }
    }

    /**
     * Normalizes an input to a list of document maps.
     * Handles: Collections, arrays, single Map/Document objects.
     * Single documents are auto-wrapped into a single-element list.
     */
    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> normalizeToDocumentList(Object obj, String label, List<String> errors) {
        if (obj == null) {
            errors.add(label + " output is null");
            return List.of();
        }

        // Handle Collection (List, Set, etc.)
        if (obj instanceof Collection<?> collection) {
            return toDocumentList(collection, label);
        }

        // Handle array types
        if (obj.getClass().isArray()) {
            return toDocumentList(obj, label);
        }

        // Handle single Map or Document - wrap in a single-element list
        if (obj instanceof Map) {
            return List.of((Map<String, Object>) obj);
        }

        // Unknown type - report error
        errors.add(label + " output must be an array, collection, or document, got " +
                obj.getClass().getSimpleName());
        return List.of();
    }

    /**
     * Validates a list of documents against the schema.
     */
    private void validateDocuments(List<Map<String, Object>> docs, Schema schema,
                                   String docType, List<String> errors) {
        List<String> requiredFields = schema.getRequiredFields();
        Map<String, Object> fieldValues = schema.getFieldValues();

        for (int i = 0; i < docs.size(); i++) {
            Map<String, Object> doc = docs.get(i);
            String docRef = docType + "[" + i + "]";

            // Check required fields (supports nested paths like "stages[0].$cursor.queryPlanner")
            for (String field : requiredFields) {
                if (!hasNestedField(doc, field)) {
                    errors.add(docRef + " is missing required field '" + field + "'");
                }
            }

            // Check field values (supports nested paths)
            for (Map.Entry<String, Object> entry : fieldValues.entrySet()) {
                String field = entry.getKey();
                Object expectedValue = entry.getValue();

                Object actualValue = getNestedField(doc, field);
                if (actualValue == null && !hasNestedField(doc, field)) {
                    errors.add(docRef + " is missing field '" + field + "' required by fieldValues");
                } else if (!valuesEqual(expectedValue, actualValue)) {
                    errors.add(docRef + "." + field + " has value " + formatValue(actualValue) +
                            ", expected " + formatValue(expectedValue));
                }
            }
        }
    }

    /**
     * Checks if a document has a field at the given path.
     * Supports nested paths like "stages[0].$cursor.queryPlanner.winningPlan.stage"
     */
    private boolean hasNestedField(Map<String, Object> doc, String fieldPath) {
        return getNestedField(doc, fieldPath) != null || getNestedFieldExists(doc, fieldPath);
    }

    /**
     * Checks if a nested field exists (even if its value is null).
     */
    @SuppressWarnings("unchecked")
    private boolean getNestedFieldExists(Map<String, Object> doc, String fieldPath) {
        Object current = doc;
        String[] parts = parseFieldPath(fieldPath);

        for (int i = 0; i < parts.length; i++) {
            String part = parts[i];

            if (current == null) {
                return false;
            }

            // Check for array index notation like "stages[0]"
            if (part.contains("[") && part.endsWith("]")) {
                int bracketStart = part.indexOf('[');
                String fieldName = part.substring(0, bracketStart);
                int index = Integer.parseInt(part.substring(bracketStart + 1, part.length() - 1));

                if (current instanceof Map<?, ?> map) {
                    current = map.get(fieldName);
                } else {
                    return false;
                }

                if (current instanceof List<?> list) {
                    if (index >= 0 && index < list.size()) {
                        current = list.get(index);
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                // Regular field access
                if (current instanceof Map<?, ?> map) {
                    if (!map.containsKey(part)) {
                        return false;
                    }
                    current = map.get(part);
                } else {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Gets the value at a nested field path.
     * Supports paths like "stages[0].$cursor.queryPlanner.winningPlan.stage"
     */
    @SuppressWarnings("unchecked")
    private Object getNestedField(Map<String, Object> doc, String fieldPath) {
        Object current = doc;
        String[] parts = parseFieldPath(fieldPath);

        for (String part : parts) {
            if (current == null) {
                return null;
            }

            // Check for array index notation like "stages[0]"
            if (part.contains("[") && part.endsWith("]")) {
                int bracketStart = part.indexOf('[');
                String fieldName = part.substring(0, bracketStart);
                int index = Integer.parseInt(part.substring(bracketStart + 1, part.length() - 1));

                if (current instanceof Map<?, ?> map) {
                    current = map.get(fieldName);
                } else {
                    return null;
                }

                if (current instanceof List<?> list) {
                    if (index >= 0 && index < list.size()) {
                        current = list.get(index);
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                // Regular field access
                if (current instanceof Map<?, ?> map) {
                    current = map.get(part);
                } else {
                    return null;
                }
            }
        }

        return current;
    }

    /**
     * Parses a field path into parts, handling dots within special field names like "$cursor".
     * For example: "stages[0].$cursor.queryPlanner" -> ["stages[0]", "$cursor", "queryPlanner"]
     */
    private String[] parseFieldPath(String fieldPath) {
        // Split by dots, but we need to handle this carefully
        // The path "stages[0].$cursor.queryPlanner" should split into:
        // ["stages[0]", "$cursor", "queryPlanner"]
        return fieldPath.split("\\.");
    }

    /**
     * Formats a value for error messages, using JSON-like format for objects.
     */
    private String formatValue(Object value) {
        if (value == null) {
            return "null";
        }
        if (value instanceof String) {
            return "\"" + value + "\"";
        }
        if (value instanceof Map || value instanceof Collection) {
            // Simple JSON-like representation
            return value.toString();
        }
        return String.valueOf(value);
    }

    /**
     * Compares two values for equality, handling numeric type coercion.
     */
    private boolean valuesEqual(Object expected, Object actual) {
        if (expected == null && actual == null) {
            return true;
        }
        if (expected == null || actual == null) {
            return false;
        }

        // Handle numeric comparisons with type coercion
        if (expected instanceof Number && actual instanceof Number) {
            return ((Number) expected).doubleValue() == ((Number) actual).doubleValue();
        }

        return expected.equals(actual);
    }

    /**
     * Converts an object to a list of document maps.
     */
    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> toDocumentList(Object obj, String name) {
        if (obj == null) {
            return List.of();
        }

        if (obj instanceof Collection<?> collection) {
            List<Map<String, Object>> result = new ArrayList<>();
            for (Object item : collection) {
                result.add(toDocumentMap(item, name));
            }
            return result;
        }

        // Single document - wrap in list
        return List.of(toDocumentMap(obj, name));
    }

    /**
     * Converts a single object to a document map.
     */
    @SuppressWarnings("unchecked")
    private Map<String, Object> toDocumentMap(Object obj, String name) {
        if (obj instanceof Document doc) {
            return doc;
        }
        if (obj instanceof Map<?, ?> map) {
            return (Map<String, Object>) map;
        }
        throw new IllegalArgumentException(name + " contains non-document element: " +
                (obj != null ? obj.getClass().getName() : "null"));
    }
}

