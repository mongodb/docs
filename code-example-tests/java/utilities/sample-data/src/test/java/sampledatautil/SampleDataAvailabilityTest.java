package sampledatautil;

import org.junit.jupiter.api.Test;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class SampleDataAvailabilityTest {

    @Test
    void testConstructorAndGetters() {
        List<String> missingDatabases = Arrays.asList("sample_mflix", "sample_restaurants");
        List<String> availableDatabases = Arrays.asList("sample_training");
        
        SampleDataAvailability availability = new SampleDataAvailability(
            false, missingDatabases, availableDatabases);
        
        assertFalse(availability.isAvailable());
        assertEquals(2, availability.getMissingDatabases().size());
        assertTrue(availability.getMissingDatabases().contains("sample_mflix"));
        assertTrue(availability.getMissingDatabases().contains("sample_restaurants"));
        assertEquals(1, availability.getAvailableDatabases().size());
        assertTrue(availability.getAvailableDatabases().contains("sample_training"));
    }

    @Test
    void testAllAvailable() {
        List<String> availableDatabases = Arrays.asList("sample_mflix", "sample_restaurants");
        
        SampleDataAvailability availability = new SampleDataAvailability(
            true, Collections.emptyList(), availableDatabases);
        
        assertTrue(availability.isAvailable());
        assertTrue(availability.getMissingDatabases().isEmpty());
        assertEquals(2, availability.getAvailableDatabases().size());
    }

    @Test
    void testNoneAvailable() {
        List<String> missingDatabases = Arrays.asList("sample_mflix", "sample_restaurants");
        
        SampleDataAvailability availability = new SampleDataAvailability(
            false, missingDatabases, Collections.emptyList());
        
        assertFalse(availability.isAvailable());
        assertEquals(2, availability.getMissingDatabases().size());
        assertTrue(availability.getAvailableDatabases().isEmpty());
    }

    @Test
    void testImmutableLists() {
        List<String> missingDatabases = new ArrayList<>(Arrays.asList("sample_mflix"));
        List<String> availableDatabases = new ArrayList<>(Arrays.asList("sample_restaurants"));
        
        SampleDataAvailability availability = new SampleDataAvailability(
            false, missingDatabases, availableDatabases);
        
        // Modify original lists
        missingDatabases.add("sample_training");
        availableDatabases.add("sample_analytics");
        
        // Verify that the availability object was not affected
        assertEquals(1, availability.getMissingDatabases().size());
        assertEquals(1, availability.getAvailableDatabases().size());
        
        // Verify that returned lists are immutable
        assertThrows(UnsupportedOperationException.class, () -> {
            availability.getMissingDatabases().add("sample_new");
        });
        
        assertThrows(UnsupportedOperationException.class, () -> {
            availability.getAvailableDatabases().add("sample_new");
        });
    }

    @Test
    void testToString() {
        List<String> missingDatabases = Arrays.asList("sample_mflix");
        List<String> availableDatabases = Arrays.asList("sample_restaurants");
        
        SampleDataAvailability availability = new SampleDataAvailability(
            false, missingDatabases, availableDatabases);
        
        String toString = availability.toString();
        assertNotNull(toString);
        assertTrue(toString.contains("isAvailable=false"));
        assertTrue(toString.contains("sample_mflix"));
        assertTrue(toString.contains("sample_restaurants"));
    }
}
