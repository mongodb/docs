import io.realm.RealmObject;
import io.realm.RealmSet;

public class Frog extends RealmObject {
    String name;
    RealmSet<Snack> favoriteSnacks;
    // realm-required empty constructor
    public Frog() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public RealmSet<Snack> getFavoriteSnacks() { return favoriteSnacks; }
    public void setFavoriteSnacks(RealmSet<Snack> favoriteSnacks) { this.favoriteSnacks = favoriteSnacks; }
}
