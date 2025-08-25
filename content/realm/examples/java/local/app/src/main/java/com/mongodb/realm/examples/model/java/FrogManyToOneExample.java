package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogManyToOneExample": "Frog"
//    }
// }
import io.realm.RealmObject;

public class FrogManyToOneExample extends RealmObject {
    private String name;
    private int age;
    private String species;
    private String owner;
    private FrogManyToOneExample bestFriend; // :emphasize:
    public FrogManyToOneExample(String name, int age, String species, String owner, FrogManyToOneExample bestFriend) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.owner = owner;
        this.bestFriend = bestFriend;
    }
    public FrogManyToOneExample(){} // RealmObject subclasses must provide an empty constructor

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }
    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
    public FrogManyToOneExample getBestFriend() { return bestFriend; }
    public void setBestFriend(FrogManyToOneExample bestFriend) { this.bestFriend = bestFriend; }
}
// :replace-end:
// :snippet-end:
