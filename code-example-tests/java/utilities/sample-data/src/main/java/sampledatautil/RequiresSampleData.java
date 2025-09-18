package sampledatautil;

import org.junit.jupiter.api.extension.ExtendWith;
import java.lang.annotation.*;

/**
 * JUnit 5 annotation that marks tests as requiring specific sample data.
 * Works with SampleDataExtension to conditionally skip tests.
 * 
 * <p>Examples:</p>
 * <pre>{@code
 * @Test
 * @RequiresSampleData("sample_mflix")
 * public void testMovieQueries() {
 *     // This test will only run if sample_mflix database is available
 * }
 * 
 * @Test
 * @RequiresSampleData({"sample_mflix", "sample_restaurants"})
 * public void testCrossDatabaseQueries() {
 *     // This test will only run if both sample databases are available
 * }
 * 
 * @Test
 * @RequiresSampleData(value = "sample_mflix", collections = {"movies", "theaters"})
 * public void testSpecificCollections() {
 *     // This test will only run if sample_mflix has movies and theaters collections
 * }
 * }</pre>
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@ExtendWith(SampleDataExtension.class)
public @interface RequiresSampleData {
    /**
     * The sample database names required for the test.
     * Can specify multiple databases for tests that use data from multiple sources.
     */
    String[] value() default {};
    
    /**
     * Single database name for backward compatibility and convenience.
     * If both database and value are specified, value takes precedence.
     */
    String database() default "";
    
    /**
     * Specific collections required within the database(s).
     * When specified with multiple databases, these collections are required in ALL databases.
     * For per-database collection requirements, use programmatic checking with SampleDataTestHelper.
     */
    String[] collections() default {};
}
