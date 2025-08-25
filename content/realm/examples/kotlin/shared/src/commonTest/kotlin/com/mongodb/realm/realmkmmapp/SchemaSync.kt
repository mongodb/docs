package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.ext.backlinks
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.EmbeddedRealmObject
import io.realm.kotlin.types.RealmInstant
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId

// :replace-start: {
//   "terms": {
//      "ExampleSyncObject_": "",
//      "ExampleSyncRelationship_": "",
//      "Inverse_": "",
//      "Many_": "",
//      "Embedded_": "",
//      "SyncTask": "Task"
//   }
// }

/*
******** Object Models to use in Sync examples and tests *********
*/

class Toad : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
}

// :snippet-start: flexible-sync-models
class SyncTask : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var taskName: String = ""
    var assignee: String? = null
    var completed: Boolean = false
    var progressMinutes: Int = 0
    var dueDate: RealmInstant? = null
}

class Team : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var teamName: String = ""
    var tasks: RealmList<SyncTask>? = realmListOf()
    var members: RealmList<String> = realmListOf()
}
// :snippet-end:

/*
****** Used on Model Data with Device Sync page ******
** Tested on SchemaSyncTest.kt **
*/

// :snippet-start: sync-define-realm-object
// Maps to `Frog` collection
class ExampleSyncObject_Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
}

// Maps to `Pond` collection
class ExampleSyncRelationship_Pond : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
}
// :snippet-end:

// :snippet-start: sync-define-to-one-relationship
class ExampleSyncRelationship_Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // To-one relationship (MUST be optional)
    var favoritePond: ExampleSyncRelationship_Pond? = null
}
// :snippet-end:

// :snippet-start: sync-define-to-many-relationship
class ExampleSyncRelationship_Many_Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // To-many relationship (can have many ponds)
    var favoritePonds: RealmList<ExampleSyncRelationship_Pond> = realmListOf()
}
// :snippet-end:

// :snippet-start: sync-define-inverse-relationship
class ExampleSyncRelationship_Inverse_Pond : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Backlink to the `Frog` that has this `Pond` as its favorite
    val frog: RealmResults<ExampleSyncRelationship_Inverse_Frog> by backlinks(ExampleSyncRelationship_Inverse_Frog::favoritePonds)
}
class ExampleSyncRelationship_Inverse_Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // To-many relationship (can have many ponds)
    var favoritePonds: RealmList<ExampleSyncRelationship_Inverse_Pond> = realmListOf()
}
// :snippet-end:

// :snippet-start: sync-define-embedded-object
class ExampleSyncRelationship_Embedded_Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // Embed a single object (MUST be optional)
    var favoritePond: ExampleSyncRelationship_EmbeddedPond? = null
}

class ExampleSyncRelationship_Embedded_Forest : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Embed multiple objects (can have many ponds)
    var forestPonds: RealmList<ExampleSyncRelationship_EmbeddedPond> = realmListOf()
}

class ExampleSyncRelationship_EmbeddedPond : EmbeddedRealmObject {
    var name: String? = null
}
// :snippet-end:

/*
****** Used on Add Sync to App page ******
*/

// :snippet-start: sync-to-do-model
class ExampleSyncObject_List : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var ownerId: String = ""
    var items: RealmList<ExampleSyncObject_Item> = realmListOf()
}

class ExampleSyncObject_Item : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var complete: Boolean = false
}
// :snippet-end:

// :replace-end: