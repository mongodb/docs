import com.mongodb.realm.examples.model.kotlin.Person;

import io.realm.RealmAny;
import io.realm.RealmObject;

public class Frog extends RealmObject {
    String name;
    RealmAny bestFriend;
    // realm-required empty constructor
    public Frog() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public RealmAny getBestFriend() { return bestFriend; }
    public void setBestFriend(RealmAny bestFriend) { this.bestFriend = bestFriend; }
    public String bestFriendToString() {
        switch(bestFriend.getType()) {
            case NULL: {
                return "no best friend";
            }
            case STRING: {
                return bestFriend.asString();
            }
            case OBJECT: {
                if (bestFriend.getValueClass().equals(Person.class)) {
                    Person person = bestFriend.asRealmModel(Person.class);
                    return person.getName();
                }
            }
            default: {
                return "unknown type";
            }
        }
    }
}
