
import io.realm.RealmObject;

public class Item extends RealmObject {
    int id;
    String name;

    public Item() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

