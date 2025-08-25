package com.mongodb.realm.examples.model
// :snippet-start: project
import io.realm.RealmList
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import io.realm.annotations.Required
import org.bson.types.ObjectId

open class Project(
    @PrimaryKey
    var _id: ObjectId = ObjectId(),
    @Required
    var name: String = "",
    var tasks: RealmList<ProjectTask> = RealmList(),
): RealmObject()
// :snippet-end: