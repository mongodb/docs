package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "StudentKt": "Student",
//       "TeacherKt": "Teacher"
//    }
// }
import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.LinkingObjects

open class StudentKt : RealmObject() {
    var name: String? = null
    var year: Int? = null

    @LinkingObjects("students")
    val teacher: RealmResults<TeacherKt>? = null
}
// :replace-end:
// :snippet-end: