package org.acme;

import jakarta.data.repository.Repository;
import org.eclipse.jnosql.mapping.NoSQLRepository;

import java.util.List;

/**
 * Interface for managing restaurant data.
 *
 * It uses the Jakarta Data Specification capabilities.
 *
 */
@Repository
public interface RestaurantRepository extends NoSQLRepository<Restaurant, String> {

    List<Restaurant> findByBorough(String borough);

    List<Restaurant> findByCuisine(String cuisine);
}
