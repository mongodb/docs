package mongodb.comparison;

import org.bson.Document;

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
        this.expected = expected;
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

            // Check required fields
            for (String field : requiredFields) {
                if (!doc.containsKey(field)) {
                    errors.add(docRef + " is missing required field '" + field + "'");
                }
            }

            // Check field values
            for (Map.Entry<String, Object> entry : fieldValues.entrySet()) {
                String field = entry.getKey();
                Object expectedValue = entry.getValue();

                if (!doc.containsKey(field)) {
                    errors.add(docRef + " is missing field '" + field + "' required by fieldValues");
                } else {
                    Object actualValue = doc.get(field);
                    if (!valuesEqual(expectedValue, actualValue)) {
                        errors.add(docRef + "." + field + " has value " + formatValue(actualValue) +
                                ", expected " + formatValue(expectedValue));
                    }
                }
            }
        }
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

