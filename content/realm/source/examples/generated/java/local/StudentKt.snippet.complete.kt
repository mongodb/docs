import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.LinkingObjects

open class Student : RealmObject() {
    var name: String? = null
    var year: Int? = null

    @LinkingObjects("students")
    val teacher: RealmResults<Teacher>? = null
}
