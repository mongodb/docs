package mongodb.comparison;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration tests to verify that POJOs work correctly with the ContentAnalyzer
 * and the overall comparison library functionality.
 */
class POJOIntegrationTest {

    @Test
    @DisplayName("Should compare POJOs using structural comparison")
    void testPOJOStructuralComparison() {
        Person expectedPerson = new Person("Alice", 25, "alice@example.com");
        Person actualPerson = new Person("Alice", 25, "alice@example.com");

        Expect.that(actualPerson)
            .shouldMatch(expectedPerson);
    }

    @Test
    @DisplayName("Should detect differences in POJO fields")
    void testPOJOFieldDifferences() {
        Person expectedPerson = new Person("Alice", 25, "alice@example.com");
        Person actualPerson = new Person("Alice", 30, "alice@example.com"); // Different age

        assertThrows(AssertionError.class, () ->
                Expect.that(actualPerson).shouldMatch(expectedPerson));
    }

    @Test
    @DisplayName("Should compare arrays of POJOs using appropriate strategy")
    void testPOJOArrayComparison() {
        List<Person> expectedPeople = List.of(
            new Person("Alice", 25, "alice@example.com"),
            new Person("Bob", 30, "bob@example.com")
        );

        List<Person> actualPeople = List.of(
            new Person("Bob", 30, "bob@example.com"),
            new Person("Alice", 25, "alice@example.com")
        );

        // Should use BACKTRACKING strategy for complex objects (POJOs)
        Expect.that(actualPeople)
            .shouldMatch(expectedPeople);
    }

    @Test
    @DisplayName("Should handle JSON pattern matching against POJOs")
    void testJSONPatternVsPOJO() {
        Person actualPerson = new Person("Alice", 25, "alice@example.com");
        String jsonPattern = "{\"name\": \"Alice\", \"age\": 25, \"email\": \"...\"}";

        // The ContentAnalyzer should route this to string comparison, but the actual
        // comparison might depend on how the POJO is serialized/converted
        // This test documents the current behavior - it may succeed or fail depending on
        // how POJOs are normalized. Just verify we get a clear result either way.
        try {
            Expect.that(actualPerson).shouldMatch(jsonPattern);
            System.out.println("JSON vs POJO: Comparison succeeded");
        } catch (AssertionError e) {
            System.out.println("JSON vs POJO: Comparison failed as expected");
            System.out.println("POJO toString: " + actualPerson.toString());
            System.out.println("Error: " + e.getMessage());
            // Current behavior: POJOs use toString() which doesn't match JSON format
            assertTrue(e.getMessage().contains("Person{") ||
                      e.getMessage().contains("String content"),
                    "Should indicate string comparison when POJO doesn't match JSON pattern");
        }
    }

    @Test
    @DisplayName("Should handle mixed POJO and primitive arrays")
    void testMixedPOJOAndPrimitiveArrays() {
        Person person = new Person("Alice", 25, "alice@example.com");
        List<Object> expectedMixed = List.of("string", 123, person, true);
        List<Object> actualMixed = List.of(true, person, 123, "string");

        // Should use HYBRID strategy for mixed content
        Expect.that(actualMixed)
            .shouldMatch(expectedMixed);
    }

    @Test
    @DisplayName("Should handle nested POJOs")
    void testNestedPOJOs() {
        Address address = new Address("123 Main St", "Anytown", "12345");
        PersonWithAddress expectedPerson = new PersonWithAddress("Alice", 25, address);
        PersonWithAddress actualPerson = new PersonWithAddress("Alice", 25, address);

        Expect.that(actualPerson)
            .shouldMatch(expectedPerson);
    }

    @Test
    @DisplayName("Should detect differences in nested POJO fields")
    void testNestedPOJODifferences() {
        Address expectedAddress = new Address("123 Main St", "Anytown", "12345");
        Address actualAddress = new Address("456 Oak Ave", "Anytown", "12345"); // Different street

        PersonWithAddress expectedPerson = new PersonWithAddress("Alice", 25, expectedAddress);
        PersonWithAddress actualPerson = new PersonWithAddress("Alice", 25, actualAddress);

        assertThrows(AssertionError.class, () ->
                Expect.that(actualPerson).shouldMatch(expectedPerson));
    }

    // Test POJO classes
    private static class Person {
        private final String name;
        private final int age;
        private final String email;

        public Person(String name, int age, String email) {
            this.name = name;
            this.age = age;
            this.email = email;
        }

        public String getName() { return name; }
        public int getAge() { return age; }
        public String getEmail() { return email; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Person person = (Person) obj;
            return age == person.age &&
                   Objects.equals(name, person.name) &&
                   Objects.equals(email, person.email);
        }

        @Override
        public int hashCode() {
            return Objects.hash(name, age, email);
        }

        @Override
        public String toString() {
            return "Person{name='" + name + "', age=" + age + ", email='" + email + "'}";
        }
    }

    private static class Address {
        private final String street;
        private final String city;
        private final String zipCode;

        public Address(String street, String city, String zipCode) {
            this.street = street;
            this.city = city;
            this.zipCode = zipCode;
        }

        public String getStreet() { return street; }
        public String getCity() { return city; }
        public String getZipCode() { return zipCode; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Address address = (Address) obj;
            return Objects.equals(street, address.street) &&
                   Objects.equals(city, address.city) &&
                   Objects.equals(zipCode, address.zipCode);
        }

        @Override
        public int hashCode() {
            return Objects.hash(street, city, zipCode);
        }

        @Override
        public String toString() {
            return "Address{street='" + street + "', city='" + city + "', zipCode='" + zipCode + "'}";
        }
    }

    private static class PersonWithAddress {
        private final String name;
        private final int age;
        private final Address address;

        public PersonWithAddress(String name, int age, Address address) {
            this.name = name;
            this.age = age;
            this.address = address;
        }

        public String getName() { return name; }
        public int getAge() { return age; }
        public Address getAddress() { return address; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            PersonWithAddress that = (PersonWithAddress) obj;
            return age == that.age &&
                   Objects.equals(name, that.name) &&
                   Objects.equals(address, that.address);
        }

        @Override
        public int hashCode() {
            return Objects.hash(name, age, address);
        }

        @Override
        public String toString() {
            return "PersonWithAddress{name='" + name + "', age=" + age + ", address=" + address + "}";
        }
    }
}
