import io.realm.RealmAny
import io.realm.RealmObject

open class Frog(var bestFriend: RealmAny? = RealmAny.nullValue()) : RealmObject() {
    var name: String? = null
    open fun bestFriendToString(): String {
        if (bestFriend == null) {
            return "null"
        }
        return when (bestFriend!!.type) {
            RealmAny.Type.NULL -> {
                "no best friend"
            }
            RealmAny.Type.STRING -> {
                bestFriend!!.asString()
            }
            RealmAny.Type.OBJECT -> {
                if (bestFriend!!.valueClass == Person::class.java) {
                    val person = bestFriend!!.asRealmModel(Person::class.java)
                    person.name
                }
                "unknown type"
            }
            else -> {
                "unknown type"
            }
        }
    }
}
