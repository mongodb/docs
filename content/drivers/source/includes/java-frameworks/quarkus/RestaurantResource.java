package org.acme;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 * REST API controller for restaurant operations.
 * Provides endpoints for retrieving restaurant data from MongoDB.
 */
@Path("/restaurants")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RestaurantResource {

    @Inject
    RestaurantRepository restaurantRepository;

    /**
     * Retrieves all restaurants from the database.
     * 
     * @return List of all restaurants
     */
    @GET
    public Response getAllRestaurants() {
        try {
            List<Restaurant> restaurants = restaurantRepository.findAll().toList();
            System.out.println("Found " + restaurants.size() + " restaurants");
            return Response.ok(restaurants).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving restaurants: " + e.getMessage())
                    .build();
        }
    }

    /**
     * Retrieves filtered restaurants in Queens that contain "Moon" in the name.
     * 
     * @return List of filtered restaurants
     */
    @GET
    @Path("/browse")
    public Response getFilteredRestaurants() {
        try {
            // Temporarily use findAll() to test basic connectivity
            List<Restaurant> allRestaurants = restaurantRepository.findAll().toList();
            System.out.println("Total restaurants found: " + allRestaurants.size());
            
            // Filter for Queens restaurants that also have "Moon" in the name
            List<Restaurant> queensRestaurants = allRestaurants.stream()
                    .filter(restaurant -> "Queens".equals(restaurant.getBorough()) &&
                            restaurant.getName() != null && 
                            restaurant.getName().toLowerCase().contains("moon"))
                    .toList();
            System.out.println("Queens restaurants found: " + queensRestaurants.size());
            
            return Response.ok(queensRestaurants).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving filtered restaurants: " + e.getMessage())
                    .build();
        }
    }

    /**
     * Retrieves restaurants by cuisine type.
     * 
     * @param cuisine The cuisine type to filter for
     * @return List of restaurants that have the specified cuisine
     */
    @GET
    @Path("/cuisine/{cuisine}")
    public Response getRestaurantsByCuisine(@PathParam("cuisine") String cuisine) {
        try {
            List<Restaurant> restaurants = restaurantRepository.findByCuisine(cuisine);
            return Response.ok(restaurants).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving restaurants by cuisine: " + e.getMessage())
                    .build();
        }
    }
}