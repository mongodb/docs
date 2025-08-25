package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogDictionary": "Frog"
//    }
// }
import io.realm.RealmDictionary;
import io.realm.RealmObject;

public class FrogDictionary extends RealmObject {
    String name;
    RealmDictionary<FrogDictionary> nicknamesToFriends;
    // realm-required empty constructor
    public FrogDictionary() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public RealmDictionary<FrogDictionary> getNicknamesToFriends() { return nicknamesToFriends; }
    public void setNicknamesToFriends(RealmDictionary<FrogDictionary> nicknamesToFriends) { this.nicknamesToFriends = nicknamesToFriends; }
}
// :replace-end:
// :snippet-end:
