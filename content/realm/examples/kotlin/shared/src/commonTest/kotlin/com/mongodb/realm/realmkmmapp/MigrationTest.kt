package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.migration.AutomaticSchemaMigration
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.BsonObjectId
import org.mongodb.kbson.ObjectId
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import co.touchlab.kermit.Kermit
import com.mongodb.realm.realmkmmapp.Log.kermit
import io.realm.kotlin.dynamic.DynamicMutableRealmObject
import io.realm.kotlin.dynamic.DynamicRealmObject
import io.realm.kotlin.dynamic.getValue
import io.realm.kotlin.ext.backlinks
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.RealmList

// :replace-start: {
//   "terms": {
//     "AutoMigrationV1_": "",
//     "AutoMigrationV2Add_": "",
//     "AutoMigrationV3Delete_": "",
//     "ManualMigrationOldObject_": "",
//     "ManualMigrationNewObject_": "",
//     "MigrationExampleV1Update1_": "",
//     "MigrationExampleV1Update2_": ""
//   }
// }

// :snippet-start: model-v1
// Realm schema version 1
class AutoMigrationV1_Person : RealmObject {
    var firstName: String = ""
    var lastName: String = ""
    var age: Int = 0
}
// :snippet-end:
// :snippet-start: model-v2
// Realm schema version 2
class AutoMigrationV2Add_Person : RealmObject {
    var firstName: String = ""
    var lastName: String = ""
    var age: Int = 0
    var email: String? = null
}
// :snippet-end:
// :snippet-start: model-v3
// Realm schema version 3
class AutoMigrationV3Delete_Person : RealmObject {
    var firstName: String = ""
    var lastName: String = ""
    // var age: Int = 0
    var email: String? = null
}
// :snippet-end:
// :snippet-start: model-v4
// Realm schema version 1 (oldObject)
class ManualMigrationOldObject_Person : RealmObject {
    var _id: ObjectId = ObjectId()
    var firstName: String = ""
    var lastName: String = ""
    var age: Int = 0
}

// Realm schema version 2 (newObject)
class ManualMigrationNewObject_Person : RealmObject {
    var _id: String = "" // change property type
    var fullName: String = "" // merge firstName and lastName properties
    var yearsSinceBirth: Int = 0 // rename property
}
// :snippet-end:

class MigrationTest {

    @Test
    fun updateSchemaVersion1Test() {
        runBlocking {
            // :snippet-start: update-schema-version-2
            val config = RealmConfiguration.Builder(
                schema = setOf(AutoMigrationV2Add_Person::class)
            )
                .schemaVersion(2) // Sets the new schema version to 2
                .build()
            val realm = Realm.open(config)
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun updateSchemaVersion2Test() {
        runBlocking {
            // :snippet-start: update-schema-version-3
            val config = RealmConfiguration.Builder(
                schema = setOf(AutoMigrationV3Delete_Person::class)
            )
                .schemaVersion(3) // Sets the new schema version to 3
                .build()
            val realm = Realm.open(config)
            // :snippet-end:
            realm.close()
            Realm.deleteRealm(config)
        }
    }

    @Test
    fun localMigrationTest() {
        runBlocking {
            // :snippet-start: local-migration
            // Use the configuration builder to open the realm with the newer schema version
            // and define the migration logic between your old and new realm objects
            val config = RealmConfiguration.Builder(
                schema = setOf(ManualMigrationNewObject_Person::class)
            )
                .schemaVersion(2) // Set the new schema version to 2
                .migration(AutomaticSchemaMigration {
                    it.enumerate(className = "ManualMigrationNewObject_Person") { oldObject: DynamicRealmObject, newObject: DynamicMutableRealmObject? ->
                        newObject?.run {
                            // Change property type
                            set(
                                "_id",
                                oldObject.getValue<ObjectId>(fieldName = "_id").toString()
                            )

                            // Merge properties
                            set(
                                "fullName",
                                "${oldObject.getValue<String>(fieldName = "firstName")} ${oldObject.getValue<String>(fieldName = "lastName")}"
                            )

                            // Rename property
                            set(
                                "yearsSinceBirth",
                                oldObject.getValue<String>(fieldName = "age")
                            )
                        }
                    }
                })
                .build()
            val realm = Realm.open(config)
            // :snippet-end:
            realm.close()
            Realm.deleteRealm(config)
        }
    }

    @Test
    fun localMigrationOtherTest() {
        runBlocking {
            // :snippet-start: local-migration-other
            val config = RealmConfiguration.Builder(
                schema = setOf(ManualMigrationNewObject_Person::class)
            )
                .schemaVersion(2)
                .migration(AutomaticSchemaMigration { migrationContext ->
                    val oldRealm = migrationContext.oldRealm // old realm using the previous schema
                    val newRealm = migrationContext.newRealm // new realm using the new schema

                    // Dynamic query for all Persons in old realm
                    val oldPersons = oldRealm.query(className = "ManualMigrationNewObject_Person").find()
                    for (oldPerson in oldPersons) {
                        // Get properties from old realm
                        val firstName: String = oldPerson.getValue(
                            propertyName = "firstName", String::class
                        )
                        // Get objects from old realm as dynamic realm objects
                        val pet: DynamicRealmObject? = oldPerson.getObject(
                            propertyName = "pets"
                        )
                    }

                    // Get migrated objects from the new realm as mutable objects
                    val oldPerson: DynamicMutableRealmObject? =
                        newRealm.findLatest(oldPersons[0])
                    oldPerson?.let {
                        it.set("fullName", "Crow T. Robot")
                    }

                    // Create an object in the new realm and set property values
                    val newPerson = newRealm.copyToRealm(
                        DynamicMutableRealmObject.create(
                            type = "Person",
                            mapOf(
                                "_id" to "123456",
                                "fullName" to "Tom Servo",
                                "yearsSinceBirth" to 33,
                            )
                        )
                    )
                })
                .build()
            val realm = Realm.open(config)
            // :snippet-end:
            realm.close()
            Realm.deleteRealm(config)
        }
    }
}
// :replace-end: