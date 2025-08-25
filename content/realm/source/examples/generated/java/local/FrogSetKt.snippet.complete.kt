import io.realm.RealmObject
import io.realm.RealmSet

open class Frog
    : RealmObject() {
    var name: String = ""
    var favoriteSnacks: RealmSet<Snack> = RealmSet<Snack>();
}
