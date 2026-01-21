package mongodb.comparison;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Collections;

/**
 * Schema definition for resemblance-based validation.
 * Used with the {@code shouldResemble().withSchema()} API to validate that
 * documents match an expected structure without requiring exact value matches.
 *
 * <p>This is useful for scenarios where MongoDB results may vary, such as:
 * <ul>
 *   <li>Vector Search results where document order may differ</li>
 *   <li>Queries where the exact matching documents may change based on environment</li>
 *   <li>Any case where document count and structure matter more than exact content</li>
 * </ul>
 *
 * <p>Usage example:
 * <pre>
 * Schema schema = Schema.builder()
 *     .withCount(20)
 *     .withRequiredFields("_id", "title", "year")
 *     .withFieldValue("year", 2012)
 *     .build();
 *
 * Expect.that(actualResults)
 *     .shouldResemble(expectedOutput)
 *     .withSchema(schema);
 * </pre>
 */
public class Schema {

    private final int count;
    private final List<String> requiredFields;
    private final Map<String, Object> fieldValues;

    private Schema(int count, List<String> requiredFields, Map<String, Object> fieldValues) {
        this.count = count;
        this.requiredFields = Collections.unmodifiableList(new ArrayList<>(requiredFields));
        this.fieldValues = Collections.unmodifiableMap(new HashMap<>(fieldValues));
    }

    /**
     * Returns the expected count of documents.
     *
     * @return the expected document count
     */
    public int getCount() {
        return count;
    }

    /**
     * Returns the list of fields that must be present in all documents.
     *
     * @return an unmodifiable list of required field names
     */
    public List<String> getRequiredFields() {
        return requiredFields;
    }

    /**
     * Returns the field-value pairs that must match in all documents.
     * All documents must contain these fields with the specified values.
     *
     * @return an unmodifiable map of field names to expected values
     */
    public Map<String, Object> getFieldValues() {
        return fieldValues;
    }

    /**
     * Creates a new builder for constructing a Schema.
     *
     * @return a new Builder instance
     */
    public static Builder builder() {
        return new Builder();
    }

    /**
     * Builder for creating Schema instances.
     */
    public static class Builder {
        private int count = -1; // -1 indicates count not specified
        private List<String> requiredFields = new ArrayList<>();
        private Map<String, Object> fieldValues = new HashMap<>();

        /**
         * Sets the expected document count.
         *
         * @param count the expected number of documents
         * @return this builder for method chaining
         * @throws IllegalArgumentException if count is negative
         */
        public Builder withCount(int count) {
            if (count < 0) {
                throw new IllegalArgumentException("Count must be non-negative, got: " + count);
            }
            this.count = count;
            return this;
        }

        /**
         * Sets the fields that must be present in all documents.
         *
         * @param fields field names that must exist in every document
         * @return this builder for method chaining
         */
        public Builder withRequiredFields(String... fields) {
            this.requiredFields = new ArrayList<>(List.of(fields));
            return this;
        }

        /**
         * Sets the fields that must be present in all documents.
         *
         * @param fields list of field names that must exist in every document
         * @return this builder for method chaining
         */
        public Builder withRequiredFields(List<String> fields) {
            this.requiredFields = new ArrayList<>(fields);
            return this;
        }

        /**
         * Sets field-value pairs that must match in all documents.
         * All documents must contain these fields with the specified values.
         *
         * @param fieldValues map of field names to expected values
         * @return this builder for method chaining
         */
        public Builder withFieldValues(Map<String, Object> fieldValues) {
            this.fieldValues = new HashMap<>(fieldValues);
            return this;
        }

        /**
         * Builds the Schema instance.
         *
         * @return a new Schema with the configured values
         */
        public Schema build() {
            return new Schema(count, requiredFields, fieldValues);
        }
    }
}

