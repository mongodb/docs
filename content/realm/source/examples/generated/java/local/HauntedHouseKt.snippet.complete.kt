import io.realm.MutableRealmInteger
import io.realm.RealmObject
import io.realm.annotations.Required

open class HauntedHouse: RealmObject() {
    @Required
    val ghosts: MutableRealmInteger = MutableRealmInteger.valueOf(0)
}
