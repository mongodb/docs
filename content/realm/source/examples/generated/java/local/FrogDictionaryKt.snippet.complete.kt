import io.realm.RealmDictionary
import io.realm.RealmObject

open class Frog
    : RealmObject() {
    var name: String? = null
    var nicknamesToFriends: RealmDictionary<Frog> = RealmDictionary<Frog>()
}
