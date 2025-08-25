package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogInverseRelationshipExample": "Frog",
//       "ToadInverseRelationshipExample": "Toad"
//    }
// }
import io.realm.RealmObject;
import io.realm.RealmResults;
import io.realm.annotations.LinkingObjects;

public class FrogInverseRelationshipExample extends RealmObject {
    private String name;
    private int age;
    private String species;
    private String owner;
    @LinkingObjects("frogFriends") // :emphasize:
    private final RealmResults<ToadInverseRelationshipExample> toadFriends = null; // :emphasize:

    public FrogInverseRelationshipExample(String name, int age, String species, String owner) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.owner = owner;
    }
    public FrogInverseRelationshipExample(){} // RealmObject subclasses must provide an empty constructor

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }
    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
}
// :replace-end:
// :snippet-end: