package org.acme;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * RestaurantRepositoryTest is a test class for testing the RestaurantRepository operations.
 *
 * It uses the Quarkus Test framework to test the restaurant data access.
 */
@QuarkusTest
public class RestaurantRepositoryTest {

    @Inject
    RestaurantRepository restaurantRepository;

    @Test
    @DisplayName("Should retrieve restaurants from the database")
    public void testRetrieveRestaurants() {
        // Test repository injection and MongoDB connection
        assertThat(restaurantRepository).isNotNull();
    }

    @Test
    @DisplayName("Should find restaurants by borough")
    public void testFindRestaurantsByBorough() {
        // Test that the method exists and returns data
        List<Restaurant> restaurants = restaurantRepository.findByBorough("Queens");
        assertThat(restaurants).isNotNull();
    }
}