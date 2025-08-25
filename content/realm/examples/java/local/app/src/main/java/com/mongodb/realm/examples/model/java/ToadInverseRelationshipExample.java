package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogInverseRelationshipExample": "Frog",
//       "ToadInverseRelationshipExample": "Toad"
//    }
// }
import io.realm.RealmList;
import io.realm.RealmObject;

public class ToadInverseRelationshipExample extends RealmObject {
    private RealmList<FrogInverseRelationshipExample> frogFriends; // :emphasize:
    public ToadInverseRelationshipExample(RealmList<FrogInverseRelationshipExample> frogFriends) {
        this.frogFriends = frogFriends;
    }
    public ToadInverseRelationshipExample() {}

    public RealmList<FrogInverseRelationshipExample> getFrogFriends() { return frogFriends; }
    public void setFrogFriends(RealmList<FrogInverseRelationshipExample> frogFriends) { this.frogFriends = frogFriends; }
}
// :replace-end:
// :snippet-end: