package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogEmbeddedExample": "Frog",
//       "FlyEmbeddedExample": "Fly"
//    }
// }
import io.realm.RealmObject;

public class FrogEmbeddedExample extends RealmObject {
    private String name;
    private int age;
    private String species;
    private String owner;
    private FlyEmbeddedExample lastMeal; // :emphasize:
    public FrogEmbeddedExample(String name, int age, String species, String owner, FlyEmbeddedExample lastMeal) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.owner = owner;
        this.lastMeal = lastMeal;
    }
    public FrogEmbeddedExample(){} // RealmObject subclasses must provide an empty constructor

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }
    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
    public FlyEmbeddedExample getLastMeal() { return lastMeal; }
    public void setLastMeal(FlyEmbeddedExample lastMeal) { this.lastMeal = lastMeal; }
}
// :replace-end:
// :snippet-end: