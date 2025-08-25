import io.realm.RealmList
import io.realm.RealmObject

open class Teacher : RealmObject() {
    var name: String? = null
    var numYearsTeaching: Int? = null
    var subject: String? = null
    var students: RealmList<Student>? = null
}
