
import io.realm.RealmObject

open class Item(var id: Int = 0,
                var name: String? = null): RealmObject()
