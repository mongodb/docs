import io.realm.RealmDictionary;
import io.realm.RealmObject;

public class Frog extends RealmObject {
    String name;
    RealmDictionary<Frog> nicknamesToFriends;
    // realm-required empty constructor
    public Frog() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public RealmDictionary<Frog> getNicknamesToFriends() { return nicknamesToFriends; }
    public void setNicknamesToFriends(RealmDictionary<Frog> nicknamesToFriends) { this.nicknamesToFriends = nicknamesToFriends; }
}
