package org.acme;

import jakarta.nosql.Column;
import jakarta.nosql.Entity;
import jakarta.nosql.Id;

/**
 * Represents a restaurant entity from the sample_restaurants database .
 * This class is used as an entity in the MongoDB database.
 */
@Entity("restaurants")
public class Restaurant {
    
    @Id 
    private String id;
    
    @Column 
    private String name;
    
    @Column 
    private String borough;
    
    @Column 
    private String cuisine;

    // Default constructor required by JNoSQL
    public Restaurant() {}

    // Constructor
    public Restaurant(String id, String name, String borough,String cuisine) {
        this.id = id;
        this.name = name;
        this.borough = borough;
        this.cuisine = cuisine;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getBorough() { return borough; }
    public void setBorough(String borough) { this.borough = borough; }
    
    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }
}
