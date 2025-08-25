package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "TeacherKt": "Teacher",
//       "StudentKt": "Student"
//    }
// }
import io.realm.RealmList
import io.realm.RealmObject

open class TeacherKt : RealmObject() {
    var name: String? = null
    var numYearsTeaching: Int? = null
    var subject: String? = null
    var students: RealmList<StudentKt>? = null
}
// :replace-end:
// :snippet-end: