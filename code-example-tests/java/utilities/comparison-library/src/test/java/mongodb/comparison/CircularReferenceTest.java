package mongodb.comparison;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

import java.util.*;

import org.bson.types.ObjectId;

/**
 * Test specifically for circular reference handling in the normalizer.
 * Tests are designed to verify that the normalizer can detect and handle
 * circular references without causing stack overflow errors.
 */
class CircularReferenceTest {

    @Test
    @DisplayName("Normalizer handles simple circular map reference")
    void testSimpleCircularMapReference() {
        // Create a circular reference using HashMap
        var circularMap = new HashMap<String, Object>();
        circularMap.put("id", 1);
        circularMap.put("name", "test");
        circularMap.put("self", circularMap); // Creates circular reference

        // This should not throw StackOverflowError
        var result = MongoTypeNormalizer.normalizeValue(circularMap);

        assertNotNull(result);
        assertTrue(result instanceof Map);

        @SuppressWarnings("unchecked")
        var resultMap = (Map<Object, Object>) result;

        // Should contain the non-circular values
        assertEquals(1, resultMap.get("id"));
        assertEquals("test", resultMap.get("name"));

        // The circular reference should be replaced with a placeholder
        Object selfValue = resultMap.get("self");
        assertNotNull(selfValue);
        assertTrue(selfValue.toString().contains("CIRCULAR_REFERENCE"));
        assertTrue(selfValue.toString().contains("HashMap"));
    }

    @Test
    @DisplayName("Normalizer handles circular list reference")
    void testCircularListReference() {
        var circularList = new ArrayList<Object>();
        circularList.add("item1");
        circularList.add("item2");
        circularList.add(circularList); // Creates circular reference

        // This should not throw StackOverflowError
        var result = MongoTypeNormalizer.normalizeValue(circularList);

        assertNotNull(result);
        assertTrue(result instanceof List);

        @SuppressWarnings("unchecked")
        var resultList = (List<Object>) result;

        // Should contain the non-circular values
        assertEquals("item1", resultList.get(0));
        assertEquals("item2", resultList.get(1));

        // The circular reference should be replaced with a placeholder
        Object circularValue = resultList.get(2);
        assertNotNull(circularValue);
        assertTrue(circularValue.toString().contains("CIRCULAR_REFERENCE"));
        assertTrue(circularValue.toString().contains("ArrayList"));
    }

    @Test
    @DisplayName("Normalizer handles nested circular references")
    void testNestedCircularReferences() {
        var parentMap = new HashMap<String, Object>();
        var childMap = new HashMap<String, Object>();

        parentMap.put("name", "parent");
        parentMap.put("child", childMap);

        childMap.put("name", "child");
        childMap.put("parent", parentMap); // Creates circular reference

        // This should not throw StackOverflowError
        var result = MongoTypeNormalizer.normalizeValue(parentMap);

        assertNotNull(result);
        assertTrue(result instanceof Map);

        @SuppressWarnings("unchecked")
        var resultMap = (Map<Object, Object>) result;

        assertEquals("parent", resultMap.get("name"));

        Object childValue = resultMap.get("child");
        assertNotNull(childValue);
        assertTrue(childValue instanceof Map);

        @SuppressWarnings("unchecked")
        var childResult = (Map<Object, Object>) childValue;
        assertEquals("child", childResult.get("name"));

        // The circular reference should be detected
        Object parentValue = childResult.get("parent");
        assertNotNull(parentValue);
        assertTrue(parentValue.toString().contains("CIRCULAR_REFERENCE"));
    }

    @Test
    @DisplayName("Normalizer handles multiple same object references (not circular)")
    void testMultipleSameObjectReferences() {
        var sharedObject = Map.of("shared", "value");

        var container = new HashMap<String, Object>();
        container.put("ref1", sharedObject);
        container.put("ref2", sharedObject); // Same object, but not circular

        // This should work fine - multiple references to same object is OK
        var result = MongoTypeNormalizer.normalizeValue(container);

        assertNotNull(result);
        assertTrue(result instanceof Map);

        @SuppressWarnings("unchecked")
        var resultMap = (Map<Object, Object>) result;

        // Both references should be normalized properly
        Object ref1 = resultMap.get("ref1");
        Object ref2 = resultMap.get("ref2");

        assertNotNull(ref1);
        assertNotNull(ref2);
        assertTrue(ref1 instanceof Map);
        assertTrue(ref2 instanceof Map);

        @SuppressWarnings("unchecked")
        var ref1Map = (Map<Object, Object>) ref1;
        @SuppressWarnings("unchecked")
        var ref2Map = (Map<Object, Object>) ref2;

        assertEquals("value", ref1Map.get("shared"));
        assertEquals("value", ref2Map.get("shared"));
    }

    @Test
    @DisplayName("Normalizer handles normal cases without issues")
    void testNormalCasesStillWork() {
        var normalData = Map.of(
                "_id", new ObjectId("507f1f77bcf86cd799439011"),
                "name", "  test  ",
                "nested", Map.of(
                        "value", 42,
                        "list", Arrays.asList(1, 2, 3)
                )
        );

        var normalized = MongoTypeNormalizer.normalizeValue(normalData);

        assertNotNull(normalized);
        assertTrue(normalized instanceof Map);

        @SuppressWarnings("unchecked")
        var resultMap = (Map<String, Object>) normalized;

        assertEquals("507f1f77bcf86cd799439011", resultMap.get("_id"));
        assertEquals("test", resultMap.get("name"));

        @SuppressWarnings("unchecked")
        var nestedResult = (Map<String, Object>) resultMap.get("nested");
        assertEquals(42, nestedResult.get("value"));
        assertEquals(Arrays.asList(1, 2, 3), nestedResult.get("list"));
    }

    @Test
    @DisplayName("Recursion depth limit prevents infinite loops")
    void testRecursionDepthLimit() {
        // Create a deeply nested structure
        Map<String, Object> current = new HashMap<>();
        Map<String, Object> root = current;

        // Create a deep nesting structure (should hit our depth limit)
        for (int i = 0; i < 100; i++) {
            Map<String, Object> next = new HashMap<>();
            current.put("level" + i, "value" + i);
            current.put("next", next);
            current = next;
        }

        // This should not cause stack overflow due to depth limit
        var result = MongoTypeNormalizer.normalizeValue(root);

        assertNotNull(result);
        assertTrue(result instanceof Map);

        // The result should be normalized without causing stack overflow
        // We don't check the full structure since it may be truncated by depth limit
    }

    @Test
    @DisplayName("Normalizer handles null values in collections")
    void testNullValueHandling() {
        // Test null values that would break Map.of()
        var mapWithNull = new HashMap<String, Object>();
        mapWithNull.put("_id", null);
        mapWithNull.put("count", 5);
        mapWithNull.put("data", Arrays.asList("a", null, "c"));

        var normalized = MongoTypeNormalizer.normalizeValue(mapWithNull);

        assertNotNull(normalized);
        assertTrue(normalized instanceof Map);

        @SuppressWarnings("unchecked")
        var resultMap = (Map<String, Object>) normalized;

        assertNull(resultMap.get("_id"));
        assertEquals(5, resultMap.get("count"));
        assertEquals(Arrays.asList("a", null, "c"), resultMap.get("data"));
    }

    @Test
    @DisplayName("Performance test - normalizer with large datasets")
    void testPerformanceWithLargeDataset() {
        // Create a large dataset similar to real MongoDB results
        var largeList = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < 1000; i++) {
            var item = new HashMap<String, Object>();
            item.put("_id", new ObjectId());
            item.put("index", i);
            item.put("name", "item_" + i);
            item.put("metadata", Map.of(
                    "score", Math.random() * 100,
                    "tags", Arrays.asList("tag1", "tag2", "tag3")
            ));
            largeList.add(item);
        }

        long startTime = System.currentTimeMillis();
        var normalized = MongoTypeNormalizer.normalizeValue(largeList);
        long endTime = System.currentTimeMillis();

        assertNotNull(normalized);
        assertTrue(normalized instanceof List);
        assertEquals(1000, ((List<?>) normalized).size());

        // Should complete within reasonable time (less than 1 second)
        assertTrue(endTime - startTime < 1000,
                "Normalization took too long: " + (endTime - startTime) + "ms");
    }


    @Test
    @DisplayName("Circular reference detection and handling")
    void testCircularReferenceDetectionAndHandling() {
        // Create circular reference structures
        var circular1 = new HashMap<String, Object>();
        circular1.put("name", "object1");
        circular1.put("self", circular1);
        circular1.put("data", Arrays.asList(1, 2, 3));

        var circular2 = new HashMap<String, Object>();
        circular2.put("name", "object1");
        circular2.put("self", circular2);
        circular2.put("data", Arrays.asList(1, 2, 3));

        // Should detect circular references and handle gracefully
        Expect.that(circular1).shouldMatch(circular2);

        // Test mutual circular references
        var obj1 = new HashMap<String, Object>();
        var obj2 = new HashMap<String, Object>();
        obj1.put("name", "first");
        obj1.put("other", obj2);
        obj2.put("name", "second");
        obj2.put("other", obj1);

        var obj3 = new HashMap<String, Object>();
        var obj4 = new HashMap<String, Object>();
        obj3.put("name", "first");
        obj3.put("other", obj4);
        obj4.put("name", "second");
        obj4.put("other", obj3);

        Expect.that(obj1).shouldMatch(obj3);
    }

    @Test
    @DisplayName("Circular reference should be detected and reported appropriately")
    void testCircularReferenceDetectionAndReporting() {
        // Create circular reference
        var circular = new HashMap<String, Object>();
        circular.put("self", circular);
        circular.put("name", "test");

        var nonCircular = Map.of("name", "test", "self", "different");

        // Should not match due to different self reference
        assertThrows(AssertionError.class, () ->
                Expect.that(nonCircular).shouldMatch(circular));
    }

    @Test
    @DisplayName("Multiple circular references should be handled gracefully")
    void testMultipleCircularReferences() {
        // Create two objects that reference each other
        var obj1 = new HashMap<String, Object>();
        var obj2 = new HashMap<String, Object>();
        obj1.put("other", obj2);
        obj1.put("id", "obj1");
        obj2.put("other", obj1);
        obj2.put("id", "obj2");

        var expected = Map.of(
                "first", obj1,
                "second", obj2
        );

        var actual = Map.of(
                "first", Map.of("id", "obj1", "other", "broken"),
                "second", Map.of("id", "obj2", "other", "broken")
        );

        // Should not crash with infinite recursion and should properly throw AssertionError
        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected),
                "Multiple circular references should not cause infinite recursion");
    }

    @Test
    @DisplayName("Self-referencing array should be detected")
    void testSelfReferencingArray() {
        var selfArray = new ArrayList<Object>();
        selfArray.add("item");
        selfArray.add(selfArray); // Self reference

        var nonSelfArray = Arrays.asList("item", "different");

        assertThrows(AssertionError.class, () ->
                Expect.that(nonSelfArray).shouldMatch(selfArray));
    }
}
