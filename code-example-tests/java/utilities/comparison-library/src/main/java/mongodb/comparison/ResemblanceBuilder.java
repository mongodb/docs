package mongodb.comparison;

import java.io.IOException;

/**
 * Builder for resemblance-based validation. Returned by
 * {@link ExpectBuilder#shouldResemble(Object)} and finalised via
 * {@link #withSchema(Schema)}.
 *
 * <p>The actual schema validation is performed by the language-agnostic
 * comparison kernel so behaviour matches every other driver suite.
 */
public class ResemblanceBuilder {

    private final Object actual;
    private final Object expected;

    /** Package-private constructor. Use ExpectBuilder.shouldResemble() to create instances. */
    ResemblanceBuilder(Object actual, Object expected) {
        this.actual = actual;
        this.expected = expected;
    }

    /**
     * Complete the resemblance validation against the given schema.
     *
     * @throws IllegalArgumentException if schema is null or invalid
     * @throws AssertionError if validation fails
     */
    public void withSchema(Schema schema) {
        if (schema == null) {
            throw new IllegalArgumentException("withSchema() requires a schema object");
        }
        if (schema.getCount() < 0) {
            throw new IllegalArgumentException("withSchema() requires a non-negative count number");
        }

        ComparisonResult result;
        try {
            result = KernelBridge.compare(
                    expected, actual, ComparisonOptions.defaultOptions(), schema);
        } catch (IOException e) {
            throw new AssertionError(
                    "Schema validation kernel invocation failed: " + e.getMessage(), e);
        }
        if (!result.isMatch()) {
            throw new AssertionError("Schema validation failed:\n" + result.message());
        }
    }
}
